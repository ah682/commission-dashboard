import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

// Lazy load pages with .tsx extension
const Home = lazy(() => import('./pages/Home.tsx'));
const NotFound = lazy(() => import('./pages/NotFound.tsx'));

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
                <p className="mt-4 text-gray-600 font-medium">Loading...</p>
              </div>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 mt-12 border-t border-gray-200">
        <div className="text-center text-sm text-gray-500">
          <p className="font-medium">OneUp Commission Calculator &copy; 2025</p>
          <p className="mt-1">
            Built with React, TypeScript, Tailwind CSS, and DaisyUI
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;