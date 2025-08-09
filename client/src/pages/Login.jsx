import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import { getOAuthUrl } from '../lib/api';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state && location.state.from) || '/portal';

  const [form, setForm] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const verified = new URLSearchParams(location.search).get('verified') === '1';

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login({ email: form.email, password: form.password });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err?.payload?.error || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  const googleUrl = getOAuthUrl('google');
  const githubUrl = getOAuthUrl('github');

  return (
    <div className="min-h-screen bg-white px-4 md:px-8 py-10">
      <div className="mx-auto max-w-md">
        <h1 className="text-3xl font-extrabold text-black">Login</h1>
        {verified && (
          <p className="mt-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2">
            Email verified successfully. You can login now.
          </p>
        )}
        {error && (
          <p className="mt-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full h-11 px-4 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/60"
              placeholder="you@gmail.com"
              value={form.email}
              onChange={handleChange('email')}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full h-11 px-4 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/60"
              placeholder="Your password"
              value={form.password}
              onChange={handleChange('password')}
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center bg-black text-white font-semibold px-6 py-3 rounded-sm hover:bg-gray-900 disabled:opacity-60"
          >
            {submitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6">
          <div className="text-center text-sm text-gray-500 mb-3">Or continue with</div>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={googleUrl}
              className="inline-flex items-center justify-center border border-gray-300 rounded-sm py-2 text-sm font-medium hover:bg-gray-50"
            >
              Google
            </a>
            <a
              href={githubUrl}
              className="inline-flex items-center justify-center border border-gray-300 rounded-sm py-2 text-sm font-medium hover:bg-gray-50"
            >
              GitHub
            </a>
          </div>
        </div>

        <p className="mt-6 text-sm text-gray-600">
          Don't have an account?{' '}
          <Link className="text-black font-semibold underline" to="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}