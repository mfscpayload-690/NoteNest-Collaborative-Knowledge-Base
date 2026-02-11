import express, { Request, Response } from 'express';
import Note from '../models/Note';
import NoteVersion from '../models/NoteVersion';
import { AuditService } from '../services/auditService';
import { authenticateToken, validateAccessLink, requirePermission, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Get all notes for a workspace
router.get('/workspace/:workspaceId', authenticateToken, validateAccessLink, requirePermission('read'), async (req: AuthRequest, res: Response) => {
  try {
    const { workspaceId } = req.params;
    const notes = await Note.find({ workspaceId });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// Create a new note
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, content, workspaceId, authorId } = req.body;
    const note = new Note({
      title,
      content,
      workspaceId,
      author: authorId,
    });
    await note.save();

    // Create initial version
    const version = new NoteVersion({
      noteId: note._id.toString(),
      versionNumber: 1,
      contentSnapshot: { title, content },
      author: authorId,
      workspaceId,
      metadata: { reason: 'Initial creation' },
    });
    await version.save();

    // Log the event
    await AuditService.logEvent(
      'note_created',
      authorId,
      workspaceId,
      note._id.toString(),
      'note',
      { title, version: 1 }
    );

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create note' });
  }
});

// Update a note
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, authorId } = req.body;
    const note = await Note.findByIdAndUpdate(
      id,
      { title, content, updatedAt: new Date() },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Log the event
    await AuditService.logEvent(
      'note_updated',
      authorId,
      note.workspaceId.toString(),
      id,
      'note',
      { title }
    );

    res.json(note);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update note' });
  }
});

// Delete a note
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { authorId } = req.body;
    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Log the event
    await AuditService.logEvent(
      'note_deleted',
      authorId,
      note.workspaceId.toString(),
      id,
      'note',
      { title: note.title }
    );

    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

// Get version history for a note
router.get('/:id/versions', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const versions = await NoteVersion.find({ noteId: id }).sort({ versionNumber: -1 });
    res.json(versions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch versions' });
  }
});

// Restore a note to a specific version
router.post('/:id/restore', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { versionNumber, authorId } = req.body;

    const version = await NoteVersion.findOne({ noteId: id, versionNumber });
    if (!version) {
      return res.status(404).json({ error: 'Version not found' });
    }

    // Update the note with the version's content
    const note = await Note.findByIdAndUpdate(
      id,
      {
        title: version.contentSnapshot.title,
        content: version.contentSnapshot.content,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Get the latest version number and create a new version for the restore
    const latestVersion = await NoteVersion.findOne({ noteId: id }).sort({ versionNumber: -1 });
    const nextVersionNumber = latestVersion ? latestVersion.versionNumber + 1 : 1;

    const restoreVersion = new NoteVersion({
      noteId: id,
      versionNumber: nextVersionNumber,
      contentSnapshot: { title: note.title, content: note.content },
      author: authorId,
      workspaceId: note.workspaceId.toString(),
      metadata: { reason: `Restored from version ${versionNumber}` },
    });
    await restoreVersion.save();

    // Log the event
    await AuditService.logEvent(
      'note_restored',
      authorId,
      note.workspaceId.toString(),
      id,
      'note',
      { restoredFromVersion: versionNumber, newVersion: nextVersionNumber }
    );

    res.json({ note, newVersion: restoreVersion });
  } catch (error) {
    res.status(500).json({ error: 'Failed to restore note' });
  }
});

export default router;
