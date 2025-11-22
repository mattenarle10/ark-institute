export default function AdminPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
        <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
          New Post
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-8 text-center text-gray-500">
          No posts found. Create your first one!
        </div>
      </div>
    </div>
  );
}
