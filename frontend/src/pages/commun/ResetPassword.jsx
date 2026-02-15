import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import authServices from "../../services/authServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
export default function ResetPassword() {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let navigate = useNavigate();
  // ---- API HANDLERS (replace with real services) ----
  const sendEmail = async () => {
    let result = await authServices.sendResetEmail(email);
    if (result.status == true) {
      toast.success(result.msg);
      setStep(2);
    } else {
      toast.error(result.msg);
    }
  };

  const verifyCode = async () => {
    let result = await authServices.verifyResetCode(email, code);
    if (result.status == true) {
      toast.success(result.msg);
      setStep(3);
    } else {
      toast.error(result.msg);
    }
  };

  const resetPassword = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    let result = await authServices.resetPassword(email, code, password);
    if (result.status == true) {
      toast.success(result.msg);
      navigate("/auth");
    } else {
      toast.error(result.msg);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <motion.div
        layout
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Reset Password
        </h2>

        <AnimatePresence mode="wait">
          {/* STEP 1 - EMAIL */}
          {step === 1 && (
            <motion.div
              key="email"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
            >
              <label className="mb-2 block text-sm font-medium text-gray-600">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:outline-none"
              />

              <button
                onClick={sendEmail}
                className="mt-6 w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700"
              >
                Send reset code
              </button>
            </motion.div>
          )}

          {/* STEP 2 - CODE */}
          {step === 2 && (
            <motion.div
              key="code"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
            >
              <label className="mb-2 block text-sm font-medium text-gray-600">
                Verification code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter the code"
                className="w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:outline-none"
              />

              <button
                onClick={verifyCode}
                className="mt-6 w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700"
              >
                Verify code
              </button>

              <button
                onClick={() => setStep(1)}
                className="mt-3 w-full text-sm text-gray-500 hover:underline"
              >
                Back
              </button>
            </motion.div>
          )}

          {/* STEP 3 - NEW PASSWORD */}
          {step === 3 && (
            <motion.div
              key="password"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
            >
              <label className="mb-2 block text-sm font-medium text-gray-600">
                New password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-4 w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:outline-none"
              />

              <label className="mb-2 block text-sm font-medium text-gray-600">
                Confirm password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:outline-none"
              />

              <button
                onClick={resetPassword}
                className="mt-6 w-full rounded-lg bg-green-600 py-2 text-white hover:bg-green-700"
              >
                Reset password
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
