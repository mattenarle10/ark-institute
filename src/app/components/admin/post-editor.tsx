'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Streamdown } from 'streamdown';
import { Loader2, ArrowLeft, Image as ImageIcon } from 'lucide-react';

type Post = {
  id?: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  coverImageUrl?: string;
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

  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto-generate slug from title if not manually edited
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    if (!initialPost) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setPost((prev) => ({ ...prev, title, slug }));
    } else {
      setPost((prev) => ({ ...prev, title }));
    }
  };

  const handleCoverButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCoverImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!post.slug) {
      alert('Please add a title first so we can generate a link.');
      return;
    }

    setUploadingImage(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${post.slug}-${Date.now()}.${fileExt}`;
      const filePath = `covers/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('post-attachment')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from('post-attachment').getPublicUrl(filePath);

      setPost((prev) => ({ ...prev, coverImageUrl: publicUrl }));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error occurred';
      alert('Error uploading image: ' + message);
    } finally {
      setUploadingImage(false);
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
        cover_image_url: post.coverImageUrl || null,
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

  const applyFormatting = (type: 'bold' | 'italic' | 'bullet' | 'emoji') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const { selectionStart, selectionEnd, value } = textarea;
    const selected = value.slice(selectionStart, selectionEnd);
    let updated = value;

    if (type === 'emoji') {
      const emoji = '😊 ';
      updated =
        value.slice(0, selectionEnd) + emoji + value.slice(selectionEnd);
    } else if (type === 'bold') {
      const wrap = '**';
      const text = selected || 'bold text';
      updated =
        value.slice(0, selectionStart) +
        wrap +
        text +
        wrap +
        value.slice(selectionEnd);
    } else if (type === 'italic') {
      const wrap = '_';
      const text = selected || 'italic text';
      updated =
        value.slice(0, selectionStart) +
        wrap +
        text +
        wrap +
        value.slice(selectionEnd);
    } else if (type === 'bullet') {
      const text = selected || 'list item';
      const prefix = value && !value.endsWith('\n') ? '\n- ' : '- ';
      updated =
        value.slice(0, selectionStart) +
        prefix +
        text +
        value.slice(selectionEnd);
    }

    setPost((prev) => ({ ...prev, content: updated }));
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
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
              className="w-full text-2xl sm:text-3xl font-bold placeholder-gray-300 border-none focus:ring-0 p-0"
            />
            <div className="text-sm text-gray-500">
              {post.slug ? (
                <span>
                  Link: <span className="font-mono text-xs text-gray-600">/blog/{post.slug}</span>
                </span>
              ) : (
                <span className="italic text-gray-400">
                  Link will be generated from the title
                </span>
              )}
            </div>
            <div className="space-y-2">
              <label
                htmlFor="cover-image-input"
                className="block text-sm font-medium text-gray-700"
              >
                Cover image (optional)
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleCoverButtonClick}
                  disabled={uploadingImage}
                  className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                >
                  {uploadingImage ? (
                    <>
                      <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-3 h-3 mr-2" />
                      Upload image
                    </>
                  )}
                </button>
                <input
                  id="cover-image-input"
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleCoverImageChange}
                  className="hidden"
                />
              </div>
              {post.coverImageUrl && (
                <div className="mt-2">
                  <img
                    src={post.coverImageUrl}
                    alt="Cover preview"
                    className="h-24 w-40 object-cover rounded border border-gray-200"
                  />
                </div>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
              <span className="mr-1 text-[11px] uppercase tracking-wide text-gray-400">
                Formatting
              </span>
              <button
                type="button"
                onClick={() => applyFormatting('bold')}
                className="px-2 py-1 border border-gray-300 rounded bg-white hover:bg-gray-50 font-semibold"
              >
                B
              </button>
              <button
                type="button"
                onClick={() => applyFormatting('italic')}
                className="px-2 py-1 border border-gray-300 rounded bg-white hover:bg-gray-50 italic"
              >
                I
              </button>
              <button
                type="button"
                onClick={() => applyFormatting('bullet')}
                className="px-2 py-1 border border-gray-300 rounded bg-white hover:bg-gray-50"
              >
                • List
              </button>
              <button
                type="button"
                onClick={() => applyFormatting('emoji')}
                className="px-2 py-1 border border-gray-300 rounded bg-white hover:bg-gray-50"
              >
                😊
              </button>
            </div>
          </div>
          <textarea
            ref={textareaRef}
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
