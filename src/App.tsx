import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './pages/Layout.tsx';

// Lazy load pages with .tsx extension
const Home = lazy(() => import('./pages/Home.tsx'));
const NotFound = lazy(() => import('./pages/NotFound.tsx'));

function App() {
  return (
    <Routes>
      {/* Wrap all routes in Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;