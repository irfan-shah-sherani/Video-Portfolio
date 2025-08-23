import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signup, resendVerification } from '../redux/authSlice';

export default function Signup() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [resendState, setResendState] = useState({ loading: false, message: '' });

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await dispatch(signup({ name: form.name, email: form.email, password: form.password }));
      if (res?.payload?.ok) {
        setSent(true);
      } else {
        setError(res?.payload?.error || 'Signup failed');
      }
    } catch (err) {
      setError(err?.payload?.error || 'Signup failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    setResendState({ loading: true, message: '' });
    try {
      await dispatch(resendVerification(form.email));
      setResendState({ loading: false, message: 'Verification email sent' });
    } catch (err) {
      setResendState({ loading: false, message: err?.payload?.error || 'Failed to send email' });
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 md:px-8 py-10">
      <div className="mx-auto max-w-md">
        <h1 className="text-3xl font-extrabold text-black">Create account</h1>

        {error && (
          <p className="mt-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">
            {error}
          </p>
        )}

        {sent ? (
          <div className="mt-6 space-y-4">
            <p className="text-sm text-gray-700">
              We've sent a verification link to <span className="font-semibold">{form.email}</span>. Please check your inbox and verify your email to continue.
            </p>
            <button
              type="button"
              onClick={handleResend}
              disabled={resendState.loading}
              className="inline-flex items-center justify-center bg-black text-white font-semibold px-6 py-3 rounded-sm hover:bg-gray-900 disabled:opacity-60"
            >
              {resendState.loading ? 'Sending...' : 'Resend verification email'}
            </button>
            {resendState.message && (
              <p className="text-sm text-gray-600">{resendState.message}</p>
            )}
            <p className="text-sm text-gray-600">
              Already verified?{' '}
              <Link className="text-black font-semibold underline" to="/login">
                Login
              </Link>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                className="w-full h-11 px-4 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/60"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange('name')}
              />
            </div>
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
                placeholder="Create a strong password"
                value={form.password}
                onChange={handleChange('password')}
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center bg-black text-white font-semibold px-6 py-3 rounded-sm hover:bg-gray-900 disabled:opacity-60"
            >
              {submitting ? 'Creating account...' : 'Sign up'}
            </button>
          </form>
        )}

        <p className="mt-6 text-sm text-gray-600">
          Already have an account?{' '}
          <Link className="text-black font-semibold underline" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}