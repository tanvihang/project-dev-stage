export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-4">
          Welcome to DevStage
        </h1>
        <p className="text-center text-foreground-secondary">
          Interactive Component Testing Environment
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <a
            href="/playground"
            className="px-6 py-3 bg-accent-primary text-white rounded-lg hover:bg-accent-hover transition-colors"
          >
            Open Playground
          </a>
        </div>
      </div>
    </main>
  );
}
