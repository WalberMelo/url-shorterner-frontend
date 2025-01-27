import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Layout } from "@/pages/Layout";

import HistoryPage from "@/pages/History/History.view";
import HomePage from "@/pages/Home/HomePage.view";

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
