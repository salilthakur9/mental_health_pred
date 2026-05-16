import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    setLoading(true);

    try {
      await login(formData);

      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#0b1220]/70 border border-blue-500/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold text-center mb-2">Welcome Back</h1>

        <p className="text-gray-400 text-center mb-8">
          Login to continue your wellness journey
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-blue-500/20 focus:outline-none focus:border-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-blue-500/20 focus:outline-none focus:border-blue-500"
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-blue-500 hover:bg-blue-600 transition-all font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Don't have an account?
          <Link to="/register" className="text-blue-400 ml-2">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
