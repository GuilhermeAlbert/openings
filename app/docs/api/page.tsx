export default function ApiDocsPage() {
  return (
    <div className="container mx-auto max-w-4xl py-24 px-4 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">API Reference</h1>
        <p className="text-lg text-muted-foreground">
          Welcome to the openings.dev API documentation. Here you will find all the endpoints available to interact with the jobs index.
        </p>
        <div className="mt-12 rounded-xl border border-border/40 bg-card p-8">
          <p className="text-sm text-muted-foreground">Documentation is currently being built. Please check back later.</p>
        </div>
      </div>
    </div>
  );
}
