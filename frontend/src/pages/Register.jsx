import { Link, useNavigate } from "react-router";
import useAuthStore from "../store/auth-store.js";
import { useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const { register } = useAuthStore();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    register(credentials);
    setCredentials({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    navigate("/login");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        className="bg-gray-700 p-8 rounded shadow-md shadow-gray-700 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Your Account
        </h2>
        {/* Input fields */}
        <div>
          <label className="block text-gray-200 mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-gray-400 focus:outline-none"
            type="text"
            required
            value={credentials.name}
            onChange={(e) =>
              setCredentials({ ...credentials, name: e.target.value })
            }
            id="name"
            name="name"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-200 mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-gray-400 focus:outline-none"
            type="text"
            required
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            id="email"
            name="email"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-200 mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-gray-400 focus:outline-none"
            type="password"
            required
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            id="password"
            name="password"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-200 mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-gray-400 focus:outline-none"
            type="password"
            required
            value={credentials.confirmPassword}
            onChange={(e) =>
              setCredentials({
                ...credentials,
                confirmPassword: e.target.value,
              })
            }
          />
        </div>

        <Link to={"/login"} className="text-sm text-blue-500 mt-1">
          Already have an accout?
        </Link>
        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded mt-6 hover:bg-blue-700 transition-colors duration-300"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
