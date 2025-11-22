'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import {
  Plus,
  FileText,
  Calendar,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
} from 'lucide-react';

type Post = {
  id: string;
  title: string;
  created_at: string;
  published_at: string | null;
  slug: string;
};

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Post | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setPosts(data);
    setLoading(false);
  }

  function openDeleteModal(post: Post) {
    setDeleteTarget(post);
  }

  function closeDeleteModal() {
    if (deletingId) return;
    setDeleteTarget(null);
  }

  async function confirmDelete() {
    if (!deleteTarget) return;

    const id = deleteTarget.id;
    setDeletingId(id);
    const { error } = await supabase.from('posts').delete().eq('id', id);

    if (error) {
      alert('Error deleting post: ' + error.message);
    } else {
      setPosts((prev) => prev.filter((post) => post.id !== id));
    }

    setDeletingId(null);
    setDeleteTarget(null);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Blog Posts
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Manage your articles and updates
          </p>
        </div>
        <Link
          href="/admin/create"
          className="hidden sm:flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-white rounded-lg border border-dashed border-gray-300 p-12 text-center">
          <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No posts yet</h3>
          <p className="text-gray-500 mt-1 mb-6">
            Get started by creating your first blog post.
          </p>
          <Link
            href="/admin/create"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary bg-primary/10 hover:bg-primary/20"
          >
            Create Post
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {posts.map((post) => (
              <li key={post.id} className="hover:bg-gray-50 transition-colors">
                <div className="px-6 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-medium text-primary truncate">
                      {post.title}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                      <span className="font-mono text-xs text-gray-400">
                        /blog/{post.slug}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:shrink-0">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        post.published_at
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {post.published_at ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Published</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3" />
                          <span>Draft</span>
                        </>
                      )}
                    </span>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/edit/${post.id}`}
                        className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100"
                      >
                        <Edit2 className="w-3 h-3 mr-1" />
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => openDeleteModal(post)}
                        className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-red-700 bg-red-50 rounded-md hover:bg-red-100"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Delete post
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete
              <span className="font-medium text-gray-900"> "{deleteTarget.title}"</span>
              ? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={!!deletingId}
                className="px-3 py-1.5 text-xs font-medium rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
            <button
                type="button"
                onClick={confirmDelete}
                disabled={!!deletingId}
                className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md border border-red-200 text-red-700 bg-red-50 hover:bg-red-100 disabled:opacity-50"
              >
                {deletingId ? 'Deleting…' : 'Delete post'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating New Post button for mobile */}
      <Link
        href="/admin/create"
        className="sm:hidden fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-all hover:scale-110"
        aria-label="New Post"
      >
        <Plus className="w-6 h-6" />
      </Link>
    </div>
  );
}
