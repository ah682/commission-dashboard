import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './pages/Layout.tsx';
import { WidgetConfigProvider } from './contexts/WidgetConfigContext';


// Lazy load pages with .tsx extension
const Home = lazy(() => import('./pages/Home.tsx'));
const NotFound = lazy(() => import('./pages/NotFound.tsx'));

function App() {
  return (
    <WidgetConfigProvider>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    </WidgetConfigProvider>
  );
}

export default App;