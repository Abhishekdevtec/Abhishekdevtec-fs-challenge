import React, { useEffect, useState } from 'react';

function TopUrls() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/short_urls`)
      .then((res) => res.json())
      .then(setUrls)
      .catch(console.error);
  }, []);

  return (
  <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
      🔝 Top 100 URLs
    </h2>
    <ul className="divide-y divide-gray-200">
      {urls.map((url) => (
        <li
          key={url.id}
          className="flex justify-between items-center py-4 hover:bg-gray-50 transition"
        >
          <a
            href={`${process.env.REACT_APP_API_BASE_URL}/${url.shortcode}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline truncate max-w-[70%]"
            title={url.full_url}
          >
            {url.title || url.full_url}
          </a>
          <span className="text-sm font-medium text-gray-600">
            {url.click_count.toLocaleString()} clicks
          </span>
        </li>
      ))}
    </ul>
  </div>
);

}

export default TopUrls;
