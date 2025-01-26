import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HistoryPage from '@/pages/History/HistoryPage';
import HomePage from '@/pages/Home/HomePage';
import { Layout } from '@/pages/Layout';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="history" element={<HistoryPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
