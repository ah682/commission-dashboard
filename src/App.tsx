import { Routes, Route} from 'react-router-dom';
import { Layout } from './pages/Layout';
import {lazy, Suspense} from 'react';


const Home = lazy(() => import('./pages/Home.tsx').then(m => ({ default: m.Home })));
const NotFound = lazy(() => import('./pages/NotFound.tsx').then(m => ({default: m.NotFound})));

function App() {

  return (
  <Suspense fallback={
    <div className="flex items-center justify-center min-h-screen">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  }>
  <Routes>
    <Route element={<Layout />}>
    <Route index element={<Home />} />
    { /*404 */ }
    <Route path="*" element={<NotFound/>} />
    </Route>
  </Routes>
  </Suspense>
  )
}

export default App
