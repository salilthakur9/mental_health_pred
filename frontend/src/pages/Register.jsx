import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [formData, setFormData] = useState({
    username: "",

    password: "",

    age: "",

    acceptedTerms: false,
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,

      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    setLoading(true);

    try {
      await register({
        ...formData,

        age: Number(formData.age),
      });

      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#0b1220]/70 border border-blue-500/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold text-center mb-2">Create Account</h1>

        <p className="text-gray-400 text-center mb-8">
          Start tracking your mental wellness
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

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
            min="13"
            className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-blue-500/20 focus:outline-none focus:border-blue-500"
          />

          <label className="flex items-center gap-3 text-gray-300 text-sm">
            <input
              type="checkbox"
              name="acceptedTerms"
              checked={formData.acceptedTerms}
              onChange={handleChange}
            />
            I accept the terms and conditions
          </label>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-blue-500 hover:bg-blue-600 transition-all font-semibold"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?
          <Link to="/login" className="text-blue-400 ml-2">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
