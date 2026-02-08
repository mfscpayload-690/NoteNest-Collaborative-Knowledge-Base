# NoteNest Documentation Style Guide

**Purpose:** Help contributors write clear, consistent, and beginner-friendly docs for NoteNest.  
**Audience:** Open-source contributors, maintainers, and anyone documenting features or processes.

🎯 Core Principles
NoteNest docs should be:

1. **Educational first** — teach concepts, don't just list features
2. **Beginner-friendly** — assume readers are learning
3. **Security-conscious** — always highlight risks & protections
4. **Contribution-oriented** — show exactly how people can help
5. **Practical & real-world** — use concrete examples
6. **Conversational** — write like you're explaining to a friend


## 📐 Recommended Structure

Most documentation files should follow this flow:

```md
# Title

2–3 sentences explaining:
- What this doc covers
- Why it exists
- Who it’s for

---

## What is [Core Concept]?

Explain in plain English
- Define terms
- Use analogies
- Connect to real life

## Main Sections

### 🎯 [Section Title]
Key points in bullets
- Actionable
- Specific examples
- Code snippets if needed

### ⚠️ Common Pitfalls
What to avoid (and why)

### ✅ Best Practices
What to do instead + example

## Why It Matters for OSQ

What you'll learn:
- Skill 1
- Skill 2
- Real-world use

## How to Contribute Here

Beginner tasks:
- [ ] Add examples
- [ ] Fix typos

Intermediate:
- [ ] Implement feature X
- [ ] Write tests

Advanced:
- [ ] Design Y

Getting started:
1. Comment to claim an issue
2. Ask questions anytime

## Additional Resources

- [Related doc]
- [External tutorial]

## 🎨 Formatting Rules

### Headings

Use this hierarchy:

- `#` for the document title (only once)
- `##` for major sections
- `###` for subsections

Keep headings short and descriptive.

---

### Emojis

Use emojis only when they improve readability (not decoration).

Good use cases:
- section headings
- warnings (⚠️)
- best practices (✅ / ❌)

---

### Lists

- Use bullet points for non-step items  
- Use numbered lists for step-by-step instructions  
- Keep bullet points consistent (same style)

---

### Code Formatting

Use backticks for:
- file names: `README.md`
- commands: `pnpm install`
- paths: `src/components/Note.jsx`

Use code blocks for longer examples:

```js
// Always include language type when possible
function example() {
  return "Clear and readable";
}


# ✍️ Writing Style Guide

This section explains how to write documentation that is clear, friendly, and easy for beginners to understand.

---

## Tone

### ✅ Do
- Write like you’re helping a friend
- Explain the **“why”**, not just the “what”
- Be supportive and encouraging

### ❌ Don’t
- Write overly formal
- Assume advanced knowledge
- Dump walls of text

---

## Examples: Bad vs Good

### ❌ Too technical
Users must authenticate via JWT tokens implemented in the middleware layer.

### ✅ Beginner-friendly
When users log in, NoteNest uses JWT tokens to confirm who they are.  
This happens in middleware, which checks requests before allowing access.

---

## Acronyms & Jargon

Always define acronyms the first time you mention them:

- Role-Based Access Control (RBAC)
- JavaScript Object Notation (JSON)

After that, you can use the acronym freely.

---

## 🔒 Security Notes (When Relevant)

If a doc touches security, always include:

- What it protects against
- How it works (high-level)
- Common mistakes

Use this reminder when needed:

⚠️ **Security Note:**  
Even if the UI hides an action, the backend MUST validate permissions.  
Never rely on frontend-only security.

---

## 🎓 “Why It Matters” (Recommended)

For major docs, add a short section like this:

## Why This Matters

**What you’ll learn:**
- Skill 1
- Skill 2

**Real-world use:**
- Where this shows up in real apps
- Why it matters in industry

---

## 🤝 Contribution Section

Docs should make it easy for contributors to help.

Example format:

## How Contributors Can Help

### 🟢 Beginner
- [ ] Fix typos / unclear wording
- [ ] Add examples

### 🟡 Intermediate
- [ ] Expand this section
- [ ] Add screenshots or diagrams

### 🔴 Advanced
- [ ] Add automated doc checks
- [ ] Improve structure across docs

---

## 🚫 Avoid These Common Problems

- Huge paragraphs (break them up)
- Vague instructions  
  - ❌ “Configure the database”  
  - ✅ “Update `DATABASE_URL` inside `.env`”
- Outdated examples
- Missing context (“why does this exist?”)

---

## ✅ Quick Checklist Before Submitting

- [ ] Clear title + short intro
- [ ] Terms explained on first use
- [ ] Examples included when helpful
- [ ] Security note added where relevant
- [ ] Contribution section included
- [ ] Spell-checked & proofread
- [ ] Encouraging closing note added 🚀

---

## Final Note

Great docs make NoteNest easier to learn from and contribute to — and every improvement helps someone out there.

Thank you for caring about documentation! You're making a real difference 🚀📝

Maintained by: NoteNest Community (with love from contributors like you!)