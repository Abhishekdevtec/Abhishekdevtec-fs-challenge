import React, { useState } from 'react';

function UrlForm({ onUrlCreated }) {
  const [fullUrl, setFullUrl] = useState('');
  const [error, setError] = useState(null);
  const [shortcode, setShortcode] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setShortcode(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/short_urls`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ short_url: { full_url: fullUrl } })
      });

      const data = await response.json();

      if (response.ok) {
        setShortcode(data.shortcode);
        onUrlCreated();
      } else {
        setError(data.errors?.[0] || 'Something went wrong');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
  <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">🔗 Shorten a URL</h2>
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
      <input
        type="url"
        value={fullUrl}
        onChange={(e) => setFullUrl(e.target.value)}
        placeholder="Enter a valid URL"
        required
        className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Shorten
      </button>
    </form>

    {shortcode && (
      <p className="mt-4 text-green-700 font-medium">
        Shortened URL:{' '}
        <a
          href={`${process.env.REACT_APP_API_BASE_URL}/${shortcode}`}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:underline"
        >
          /{shortcode}
        </a>
      </p>
    )}

    {error && (
      <p className="mt-4 text-red-600 font-medium" role="alert">
        {error}
      </p>
    )}
  </div>
);
}

export default UrlForm;
