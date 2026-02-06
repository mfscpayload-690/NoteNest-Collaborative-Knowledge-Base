import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-violet-50 text-gray-900">

      {/* Header */}
      <header className="bg-white/80 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-sky-600">NoteNest</h1>
          <p className="text-sm text-gray-600">
            Collaborative Knowledge Base for Teams
          </p>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-5xl font-bold mb-6 leading-tight">
          Capture, Organize &
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-violet-500">
            {" "}Share Knowledge
          </span>
        </h2>

        <p className="text-lg text-gray-700 max-w-2xl">
          NoteNest helps teams document ideas, decisions, and learnings
          in a shared, searchable space.
        </p>

        <button
          disabled
          className="mt-8 px-6 py-3 rounded-lg border border-sky-300 bg-sky-600/10 text-sky-700 cursor-not-allowed"
        >
          Create Your First Note (Coming Soon)
        </button>
      </section>

      {/* Features */}
      <section className="bg-white border-y">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h3 className="text-3xl font-semibold mb-10">
            What NoteNest Enables
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Feature
              title="📝 Collaborative Notes"
              text="Write and edit notes together in real time."
            />
            <Feature
              title="📂 Organized Spaces"
              text="Group notes by projects, teams, or topics."
            />
            <Feature
              title="🔍 Powerful Search"
              text="Quickly find information when you need it."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-gray-500">
          NoteNest • Open Source Quest Project
        </div>
      </footer>

    </main>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border bg-gradient-to-br from-white to-gray-50 p-6">
      <h4 className="font-semibold mb-2">{title}</h4>
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );
}

