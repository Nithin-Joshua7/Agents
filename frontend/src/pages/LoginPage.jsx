import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAuthStore from "../store/authStore";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-900 to-blue-900"
      data-theme="dark"
    >
      <div className="card bg-gray-800/80 backdrop-blur-sm shadow-2xl p-8 w-full max-w-md border border-teal-700/30">
        <h2 className="text-3xl font-bold mb-8 text-center text-cyan-300">Login to Ocean Dashboard</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <label className="input input-bordered flex items-center gap-2 bg-gray-700/50 border-teal-600">
            <span className="text-sm font-medium text-cyan-300">Email</span>
            <input
              id="email"
              type="email"
              required
              placeholder="Enter your email"
              className="grow bg-transparent text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 bg-gray-700/50 border-teal-600">
            <span className="text-sm font-medium text-cyan-300">Password</span>
            <input
              id="password"
              type="password"
              required
              placeholder="Enter your password"
              className="grow bg-transparent text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            type="submit"
            className="btn bg-teal-600 hover:bg-teal-700 text-white w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;