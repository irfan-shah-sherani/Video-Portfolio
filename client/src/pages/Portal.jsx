import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../context/auth-context';

function classNames(...xs) {
  return xs.filter(Boolean).join(' ');
}

export default function Portal() {
  const { user } = useAuth();

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshTick, setRefreshTick] = useState(0);

  // Upload form state
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState('');

  const canSeeAll = useMemo(() => user?.role === 'admin', [user]);

  const loadVideos = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.listVideos({ all: false });
      setVideos(res.videos || []);
    } catch (err) {
      setError(err?.payload?.error || 'Failed to load videos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVideos();
  }, [loadVideos, refreshTick]);

  const resetUploadForm = () => {
    setFile(null);
    setTitle('');
    setDescription('');
    setIsPublic(false);
    setUploadMsg('');
  };

  const handleFileChange = (e) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    if (f && !title) setTitle(f.name.replace(/\.[^/.]+$/, '').slice(0, 80));
  };

  async function uploadToPresignedUrl(uploadUrl, file) {
    // Upload the file directly to R2 via presigned URL
    const res = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type || 'application/octet-stream',
      },
      body: file,
    });
    if (!res.ok) {
      throw new Error(`Upload to storage failed with status ${res.status}`);
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setUploadMsg('Please choose a file to upload.');
      return;
    }
    setUploading(true);
    setUploadMsg('');
    try {
      // Step 1: presign
      const presign = await api.presignUpload({ filename: file.name, contentType: file.type });
      // Step 2: upload to R2
      await uploadToPresignedUrl(presign.uploadUrl, file);
      // Step 3: finalize metadata
      const meta = await api.finalizeUpload({
        key: presign.key,
        title: title || file.name,
        description,
        size: file.size,
        contentType: file.type || 'video/mp4',
        isPublic,
      });
      setUploadMsg('Upload completed successfully.');
      resetUploadForm();
      setRefreshTick((x) => x + 1);
    } catch (err) {
      setUploadMsg(err?.message || err?.payload?.error || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async (id, changes) => {
    try {
      const res = await api.updateVideo(id, changes);
      setVideos((vs) => vs.map((v) => (v.id === id ? res.video : v)));
    } catch (err) {
      alert(err?.payload?.error || 'Failed to update video');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this video permanently?')) return;
    try {
      await api.deleteVideo(id);
      setVideos((vs) => vs.filter((v) => v.id !== id));
    } catch (err) {
      alert(err?.payload?.error || 'Failed to delete video');
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 md:px-8 py-8 md:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-black">Portal</h1>
            <p className="text-sm text-gray-600 mt-2">
              Manage your videos stored on Cloudflare R2.
            </p>
          </div>
          <div>
            <button
              onClick={() => setRefreshTick((x) => x + 1)}
              className="inline-flex items-center justify-center bg-black text-white font-semibold px-4 py-2 rounded-sm hover:bg-gray-900"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Upload Card */}
        <div className="mt-8 border border-gray-200 rounded-md p-4 md:p-6">
          <h2 className="text-xl font-bold text-black">Upload new video</h2>
          <p className="text-sm text-gray-500">Upload is performed directly to Cloudflare R2 using a secure presigned URL.</p>

          <form onSubmit={handleUpload} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Choose file</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-900"
                />
                {file && (
                  <p className="text-xs text-gray-500 mt-1">
                    {file.name} • {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a title"
                  className="w-full h-10 px-3 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/60"
                />
              </div>

              <div>
                <label className="inline-flex items-center gap-2 text-sm font-medium text-gray-700">
                  <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    className="h-4 w-4"
                  />
                  Public
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Optional description"
                  className="w-full h-[130px] resize-none px-3 py-2 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/60"
                />
              </div>
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={uploading || !file}
                  className="inline-flex items-center justify-center bg-black text-white font-semibold px-6 py-3 rounded-sm hover:bg-gray-900 disabled:opacity-60"
                >
                  {uploading ? 'Uploading...' : 'Upload'}
                </button>
                {uploadMsg && (
                  <p className={classNames('mt-2 text-sm', uploadMsg.toLowerCase().includes('fail') ? 'text-red-600' : 'text-green-700')}>
                    {uploadMsg}
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* List */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold text-black">Your videos</h2>
            <div className="text-xs text-gray-500">
              {canSeeAll ? 'Admin mode' : 'Owner view'}
            </div>
          </div>

          {loading ? (
            <div className="grid place-items-center py-16">
              <div className="text-sm text-gray-600">Loading...</div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded p-3">{error}</div>
          ) : videos.length === 0 ? (
            <div className="text-sm text-gray-600">No videos yet.</div>
          ) : (
            <ul className="space-y-4">
              {videos.map((v) => (
                <VideoItem key={v.id} video={v} onUpdate={handleUpdate} onDelete={handleDelete} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function VideoItem({ video, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [t, setT] = useState(video.title);
  const [d, setD] = useState(video.description || '');
  const [pub, setPub] = useState(!!video.isPublic);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await onUpdate(video.id, { title: t, description: d, isPublic: pub });
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(video.publicUrl);
      alert('Public URL copied to clipboard');
    } catch {
      // ignore
    }
  };

  return (
    <li className="border border-gray-200 rounded-md p-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
        <div className="md:col-span-2">
          {/* Lightweight preview */}
          <div className="aspect-video bg-black/5 border border-gray-200 rounded overflow-hidden">
            <video
              src={video.publicUrl}
              className="w-full h-full object-cover"
              controls
              preload="metadata"
            />
          </div>
        </div>

        <div className="md:col-span-3 flex flex-col gap-2">
          {editing ? (
            <>
              <input
                type="text"
                value={t}
                onChange={(e) => setT(e.target.value)}
                className="w-full h-10 px-3 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/60"
              />
              <textarea
                value={d}
                onChange={(e) => setD(e.target.value)}
                className="w-full h-[90px] resize-none px-3 py-2 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/60"
              />
              <label className="inline-flex items-center gap-2 text-sm font-medium text-gray-700">
                <input type="checkbox" checked={pub} onChange={(e) => setPub(e.target.checked)} className="h-4 w-4" />
                Public
              </label>
            </>
          ) : (
            <>
              <div className="text-lg font-semibold text-black">{video.title}</div>
              {video.description && <div className="text-sm text-gray-600">{video.description}</div>}
              <div className="text-xs text-gray-500">
                {new Date(video.createdAt).toLocaleString()} • {video.isPublic ? 'Public' : 'Private'}
              </div>
              <div className="text-xs text-gray-500 truncate">
                R2 Key: {video.r2Key}
              </div>
              <div className="text-xs text-gray-500 truncate">
                URL: <span className="underline">{video.publicUrl}</span>
              </div>
            </>
          )}

          <div className="mt-2 flex flex-wrap gap-2">
            {editing ? (
              <>
                <button
                  onClick={save}
                  disabled={saving}
                  className="inline-flex items-center justify-center bg-black text-white text-sm font-semibold px-4 py-2 rounded-sm hover:bg-gray-900 disabled:opacity-60"
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="inline-flex items-center justify-center border border-gray-300 text-sm font-medium px-4 py-2 rounded-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setEditing(true)}
                  className="inline-flex items-center justify-center border border-gray-300 text-sm font-medium px-4 py-2 rounded-sm hover:bg-gray-50"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(video.id)}
                  className="inline-flex items-center justify-center border border-red-300 text-sm font-medium px-4 py-2 rounded-sm hover:bg-red-50 text-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={copyUrl}
                  className="inline-flex items-center justify-center border border-gray-300 text-sm font-medium px-4 py-2 rounded-sm hover:bg-gray-50"
                >
                  Copy URL
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}