// app/not-found.tsx
'use client';

 
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      <h1 className="text-9xl font-bold text-red-600">404</h1>
      <h2 className="text-3xl font-semibold mt-4 text-gray-800">Page Not Found</h2>
      <p className="mt-2 text-gray-600">
        Sorry, we couldn’t find the page you were looking for.
      </p>
      <Link href="/">
        <span className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
          Back to Home
        </span>
      </Link>
    </div>
  );
}
