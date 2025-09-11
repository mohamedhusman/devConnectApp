import { Navigate, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useUserStore } from "./store/user-store.js";
import Profile from "./pages/profile.jsx";
import UpdateProfile from "./pages/UpdateProfile.jsx";

function App() {
  const { isAuthenticated } = useUserStore();
  return (
    <div className="bg-gray-900 h-screen overflow-x-hidden">
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={!isAuthenticated ? <Register /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/" />}
        />
        <Route
          path="/profile/update"
          element={isAuthenticated ? <UpdateProfile /> : <Navigate to="/" />}
        />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
