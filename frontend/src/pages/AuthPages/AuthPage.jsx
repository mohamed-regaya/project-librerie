import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import authServices from "../../services/authServices";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  registerUser,
  resetAuthMessages,
} from "../../../redux/slices/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router";
export default function AuthPage() {
  const [mode, setMode] = useState("login");
  //--------------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const { msg, error, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  function handleAuth() {
    if (mode == "login") {
      dispatch(loginUser({ email: email, password: password }));
    } else {
      let formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", "client");
      formData.append("full_name", username);
      formData.append("address", address);
      formData.append("image", image);
      dispatch(registerUser(formData));
    }
  }

  useEffect(() => {
    if (user != null) {
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    }
    if (msg) {
      toast.success(msg);
    }
    if (error) {
      toast.error(error);
    }
    dispatch(resetAuthMessages());
  }, [msg, error, user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {mode === "login" ? "Welcome Back" : "Create an Account"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {mode === "login" ? "Login to continue" : "Register to get started"}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setMode("login")}
            className={`w-1/2 py-2 rounded-md text-sm font-medium transition ${
              mode === "login"
                ? "bg-white shadow text-indigo-600"
                : "text-gray-500"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode("register")}
            className={`w-1/2 py-2 rounded-md text-sm font-medium transition ${
              mode === "register"
                ? "bg-white shadow text-indigo-600"
                : "text-gray-500"
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {mode === "register" && (
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Username
              </label>
              <input
                type="text"
                placeholder="Your username"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}
          {mode === "register" && (
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Addresse
              </label>
              <input
                type="text"
                placeholder="Your username"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          )}

          {mode === "register" && (
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Image
              </label>
              <input
                type="file"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  console.log(e.target.files);
                }}
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          {mode === "register" && (
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          )}

          {mode === "login" && (
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="rounded" />
                Remember me
              </label>
              <button type="button" className="text-indigo-600 hover:underline">
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
            onClick={handleAuth}
          >
            {mode === "login" ? "Login" : "Register"}
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => setMode("register")}
                className="text-indigo-600 font-medium hover:underline"
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-indigo-600 font-medium hover:underline"
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
