import { useState } from 'react';
import axios from 'axios';
import ScrollToTop from '../components/ScrollToTop';
export default function Contact() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    whatsapp: '',
    budget: '',
    details: '',
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const maxChars = 1000;
  const charCount = form.details.length;

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    if (field === 'details' && e.target.value.length > maxChars) return;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSent(false);

    if (!form.firstName || !form.lastName || !form.email || !form.whatsapp || !form.budget) {
      setError('Please fill in all required fields.');
      return;
    }

    const payload = {
      name: `${form.firstName} ${form.lastName}`.trim(),
      email: form.email,
      whatsapp: form.whatsapp,
      budget: form.budget,
      message: form.details,
    };

    try {
      setLoading(true);
      const response = await axios.post('https://video-portfolio-backend.onrender.com/api/contact', payload);
      if (
        response.status === 200 &&
        (response.data?.ok || response.data === 'Message received' || response.data?.message === 'Email sent')
      ) {
        setForm({
          firstName: '',
          lastName: '',
          email: '',
          whatsapp: '',
          budget: '',
          details: '',
        });
        setSent(true);
      } else {
        setError('Submission failed. Please try again later.');
      }
    } catch (err) {
      setError(err?.response?.data?.error || 'Submission failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    'w-full h-11 px-4 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/60 focus:border-black transition';

  return (
    <div className="min-h-screen bg-white px-4 md:px-8 py-8 md:py-10">
      <ScrollToTop/>
      <div className="mx-auto max-w-6xl flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
        <div className="md:flex-1">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight text-black">
            Let's work together.
          </h1>
        </div>

        <div className="lg:flex-1">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={inputBase}
                  value={form.firstName}
                  onChange={handleChange('firstName')}
                  required
                  placeholder="First name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={inputBase}
                  value={form.lastName}
                  onChange={handleChange('lastName')}
                  required
                  placeholder="Last name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Working email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className={inputBase}
                value={form.email}
                onChange={handleChange('email')}
                required
                placeholder="you@gmail.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Whatsapp Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={inputBase}
                value={form.whatsapp}
                onChange={handleChange('whatsapp')}
                required
                placeholder="whatsapp"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget <span className="text-red-500">*</span>
              </label>
              <select
                className={`${inputBase} bg-white`}
                value={form.budget}
                onChange={handleChange('budget')}
                required
              >
                <option value="">Please Select</option>
                <option>Under PKR 1,000</option>
                <option>PKR 1,000 — PKR 5,000</option>
                <option>PKR 5,000 — PKR 10,000</option>
                <option>PKR 10,000 — PKR 25,000</option>
                <option>PKR 25,000+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tell us what you're hoping to achieve:
              </label>
              <textarea
                className="w-full h-[140px] resize-none px-4 py-3 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/60 focus:border-black transition"
                placeholder="Up to 1000 characters"
                value={form.details}
                onChange={handleChange('details')}
                maxLength={maxChars}
              />
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-500">Up to 1000 characters</span>
                <span className="text-xs text-gray-500">{charCount}/{maxChars}</span>
              </div>
            </div>


            {error && <p className="text-sm text-red-600">{error}</p>}
            {sent && <p className="text-sm text-green-600">Thanks! Your message has been sent.</p>}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center bg-black text-white font-semibold px-6 py-3 rounded-sm hover:bg-gray-900 disabled:opacity-60"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
      <div className='w-full h-1 bg-black mt-8'></div>
    </div>
  );
}