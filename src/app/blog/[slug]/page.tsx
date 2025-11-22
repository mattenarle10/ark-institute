export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <article className="container mx-auto px-4 py-24 max-w-3xl">
      <h1 className="text-5xl font-bold mb-6">Post: {slug}</h1>
      <div className="prose prose-lg">
        <p>Content coming soon...</p>
      </div>
    </article>
  );
}
