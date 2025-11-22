'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Streamdown } from 'streamdown';
import { Loader2, Save, ArrowLeft } from 'lucide-react';

type Post = {
  id?: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
};

export default function PostEditor({ initialPost }: { initialPost?: Post }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<Post>(
    initialPost || {
      title: '',
      slug: '',
      content: '',
      published: false,
    }
  );

  // Auto-generate slug from title if not manually edited
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    if (!initialPost && !post.slug) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setPost((prev) => ({ ...prev, title, slug }));
    } else {
      setPost((prev) => ({ ...prev, title }));
    }
  };

  const handleSave = async (publishStatus: boolean) => {
    setLoading(true);
    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error('Not authenticated');

      const postData = {
        title: post.title,
        slug: post.slug,
        content: post.content,
        published_at: publishStatus ? new Date().toISOString() : null,
        author_id: user.id,
      };

      let error: unknown;
      if (initialPost?.id) {
        // Update
        const { error: updateError } = await supabase
          .from('posts')
          .update(postData)
          .eq('id', initialPost.id);
        error = updateError;
      } else {
        // Create
        const { error: insertError } = await supabase
          .from('posts')
          .insert([postData]);
        error = insertError;
      }

      if (error) throw error;

      router.push('/admin');
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error occurred';
      alert('Error saving post: ' + message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>
        <div className="flex gap-3">
          <button
            onClick={() => handleSave(false)}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={loading}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 disabled:opacity-50"
          >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {initialPost ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
        {/* Editor Column */}
        <div className="flex flex-col gap-4 h-full">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Post Title"
              value={post.title}
              onChange={handleTitleChange}
              className="w-full text-3xl font-bold placeholder-gray-300 border-none focus:ring-0 p-0"
            />
            <div className="flex items-center text-sm text-gray-500">
              <span className="mr-2">Slug:</span>
              <input
                type="text"
                value={post.slug}
                onChange={(e) =>
                  setPost((prev) => ({ ...prev, slug: e.target.value }))
                }
                className="font-mono bg-gray-50 border border-gray-200 rounded px-2 py-1 text-xs w-full focus:outline-none focus:border-primary"
              />
            </div>
          </div>
          <textarea
            value={post.content}
            onChange={(e) =>
              setPost((prev) => ({ ...prev, content: e.target.value }))
            }
            placeholder="Write your post in Markdown..."
            className="flex-1 w-full p-4 font-mono text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          />
        </div>

        {/* Preview Column */}
        <div className="h-full overflow-y-auto border border-gray-200 rounded-lg p-8 prose prose-lg max-w-none">
          {post.content ? (
            <Streamdown>{post.content}</Streamdown>
          ) : (
            <div className="text-gray-400 italic text-center mt-20">
              Preview will appear here...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
