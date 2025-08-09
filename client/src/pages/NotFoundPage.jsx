import { Link } from "react-router-dom";

export default function NotFoundPage(){
  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white p-8 font-sans">
        <h1 className="text-8xl md:text-9xl font-extrabold text-white opacity-10 mb-8">404</h1>
        <h2 className="text-4xl md:text-5xl font-bold text-red-500 mb-4">Page Not Found</h2>
        <p className="text-xl text-zinc-400 mb-6 max-w-xl text-center">
          Oops! We couldn't find the page you're looking for. It might have been removed or the URL may be incorrect.
        </p>
        <div className="text-zinc-500 mb-8">
          <p className="mt-2 text-sm italic">
          </p>
        </div>
        <Link 
          to="/" 
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg"
        >
          Go to Home page
        </Link>
      </div>
    );
  }