import { motion } from "framer-motion";
import { FaLock, FaArrowLeft, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router";

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-8"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10"
        >
          <FaLock className="text-red-500 text-2xl" />
        </motion.div>

        {/* Text */}
        <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
        <p className="text-gray-400 mb-8">
          You don’t have permission to view this page.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/10 py-3 hover:bg-white/10 transition"
          >
            <FaArrowLeft />
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 py-3 transition"
          >
            <FaHome />
            Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}
