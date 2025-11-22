export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold mb-12">Latest Updates</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Post cards will go here */}
        <div className="border rounded-lg p-6">
          <p className="text-gray-500">Coming soon...</p>
        </div>
      </div>
    </div>
  );
}
