import { BrowserRouter as Router, Routes, Route } from "react-router";
import "./App.css";
import Login from "./pages/Login/LoginPage";
import { Provider } from "react-redux";
import AuthLayout from "./layouts/AuthLayout";
import { store } from "./store/store";
import ProtectedDashboardLayout from "./layouts/ProtectedDashboardLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import PageNotFound from "./pages/PageNotFound";
// import Dashboard from './pages/Dashboard';
// import ProductDetails from './pages/ProductDetails';
// import PageNotFound from './pages/PageNotFound';
function App() {
  return (
    <>
      <Provider store={store}>
        <Router basename="/">
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route path="/" element={<ProtectedDashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
