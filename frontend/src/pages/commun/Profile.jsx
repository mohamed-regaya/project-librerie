// src/pages/Profile.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCamera,
  FaLock,
} from "react-icons/fa";
import { updateProfile } from "../../../redux/slices/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState(user);
  const [preview, setPreview] = useState("http://localhost:8000/" + user.image);
  const [password, setPassword] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("full_name", formData.full_name);
    data.append("email", formData.email);
    data.append("address", formData.address);
    data.append("_id", user._id);
    if (password.length > 0) {
      data.append("password", password);
    }
    // only append image if it's a File
    if (formData.image instanceof File) {
      data.append("image", formData.image);
    }

    dispatch(updateProfile(data));
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center bg-gray-100"
    >
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">User Profile</h2>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <img
              src={preview}
              alt="profile"
              className="w-28 h-28 rounded-full object-cover border"
            />
            <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer">
              <FaCamera className="text-white text-sm" />
              <input type="file" hidden onChange={handleImageChange} />
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border rounded px-3">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full py-2 outline-none"
              placeholder="Full Name"
            />
          </div>

          <div className="flex items-center border rounded px-3">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full py-2 outline-none"
              placeholder="Email"
            />
          </div>

          <div className="flex items-center border rounded px-3">
            <FaMapMarkerAlt className="text-gray-400 mr-2" />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full py-2 outline-none"
              placeholder="Address"
            />
          </div>
          <div className="flex items-center border rounded px-3">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="text"
              name="address"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-2 outline-none"
              placeholder="mot de passe"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold"
          >
            Update Profile
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default Profile;
