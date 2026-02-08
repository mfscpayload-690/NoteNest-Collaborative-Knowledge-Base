"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import { SkeletonList } from "@/components/Skeleton";

export default function DashboardPage() {
  const [recentNotes, setRecentNotes] = useState<Array<{ id: number; title: string; updatedAt: string }>>([]);
  const [recentActivity, setRecentActivity] = useState<Array<{ id: number; action: string; timestamp: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading dashboard data (no backend)
    const timer = setTimeout(() => {
      setRecentNotes([]);
      setRecentActivity([]);
      setLoadError(null);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const retryLoad = () => {
    setLoadError(null);
    setIsLoading(true);
    setTimeout(() => {
      setRecentNotes([]);
      setRecentActivity([]);
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Header title="Dashboard" showSearch />
        <main className="p-6" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <h2 
            className="text-2xl font-bold mb-6"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Welcome 👋
          </h2>
          <p 
            className="mb-8"
            style={{ 
              color: 'var(--color-text-secondary)',
              fontSize: 'var(--font-size-base)'
            }}
          >
            This is your NoteNest dashboard. Get started by creating your first note.
          </p>

          {loadError && (
            <ErrorState
              title="Couldn't load dashboard"
              message={loadError}
              variant="error"
              onDismiss={() => setLoadError(null)}
              action={
                <button type="button" onClick={retryLoad} className="btn-primary" style={{ fontSize: "var(--font-size-sm)", padding: "var(--space-sm) var(--space-md)" }}>
                  Try again
                </button>
              }
              className="mb-6"
            />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Notes Section */}
            <div>
              <h3 
                className="text-lg font-semibold mb-4"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Recent Notes
              </h3>
              {isLoading ? (
                <div
                  className="animate-fade-in bg-white rounded-lg border p-6"
                  style={{
                    borderColor: "var(--color-border-light)",
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)",
                  }}
                >
                  <SkeletonList count={3} variant="list-item" />
                </div>
              ) : recentNotes.length === 0 ? (
                <div
                  className="state-content-enter bg-white rounded-lg border p-6 card-elevate"
                  style={{
                    borderColor: "var(--color-border-light)",
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)",
                  }}
                >
                  <EmptyState
                    size="compact"
                    icon={
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    }
                    title="No recent notes"
                    description="Notes you create or edit will appear here."
                    secondaryAction={
                      <Link href="/notes" className="link-nav" style={{ fontSize: "var(--font-size-sm)" }}>
                        View all notes →
                      </Link>
                    }
                  />
                </div>
              ) : (
                <ul className="state-content-enter space-y-2">
                  {recentNotes.map((note) => (
                    <li
                      key={note.id}
                      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="font-medium" style={{ color: 'var(--color-text-primary)' }}>
                        {note.title}
                      </div>
                      <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                        Updated {note.updatedAt}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Recent Activity Section */}
            <div>
              <h3 
                className="text-lg font-semibold mb-4"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Recent Activity
              </h3>
              {isLoading ? (
                <div
                  className="animate-fade-in bg-white rounded-lg border p-6"
                  style={{
                    borderColor: "var(--color-border-light)",
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)",
                  }}
                >
                  <SkeletonList count={3} variant="list-item" />
                </div>
              ) : recentActivity.length === 0 ? (
                <div
                  className="state-content-enter bg-white rounded-lg border p-6 card-elevate"
                  style={{
                    borderColor: "var(--color-border-light)",
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)",
                  }}
                >
                  <EmptyState
                    size="compact"
                    icon={
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    }
                    title="No recent activity"
                    description="Your activity will be displayed here as you use NoteNest."
                  />
                </div>
              ) : (
                <ul className="state-content-enter space-y-2">
                  {recentActivity.map((activity) => (
                    <li
                      key={activity.id}
                      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        {activity.action}
                      </div>
                      <div className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
                        {activity.timestamp}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h3 
              className="text-lg font-semibold mb-4"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Quick Actions
            </h3>
            <div className="flex flex-wrap gap-4">
              <a
                href="/notes"
                className="btn-primary"
                data-shortcut="create-note"
                style={{
                  fontSize: 'var(--font-size-base)',
                  padding: 'var(--space-sm) var(--space-lg)'
                }}
              >
                Create Note
              </a>
              <a
                href="/notes"
                className="btn-secondary"
                style={{
                  fontSize: 'var(--font-size-base)',
                  padding: 'var(--space-sm) var(--space-lg)'
                }}
              >
                View All Notes
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
