import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiShoppingCart,
  FiSearch,
  FiHeart,
  FiLogIn,
  FiLogOut,
} from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useState, useRef, useEffect } from "react";
import { logout } from "../../redux/slices/authSlice";
import Search from "./Search";

export default function Header() {
  const { items } = useSelector((state) => state.basket);
  const favorites = useSelector((state) => state.favorite.items);
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="text-xl font-bold tracking-tight">
          <button onClick={() => navigate("/")}>
            Librerie<span className="text-indigo-600">Mohamed Regaya</span>
          </button>
        </div>

        {/* Search */}
        <Search />
        {/* Right Icons */}
        <div className="flex items-center gap-6">
          {/* USER MENU */}
          <div className="relative" ref={menuRef}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => setOpen((p) => !p)}
              className="text-gray-700 hover:text-black transition"
            >
              <FiUser size={22} />
            </motion.button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-40 rounded-xl border bg-white shadow-lg z-50"
                >
                  {user ? (
                    <button
                      onClick={() => {
                        dispatch(logout());
                        setOpen(false);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-gray-100"
                    >
                      <FiLogOut />
                      Logout
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        navigate("/auth");
                        setOpen(false);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-gray-100"
                    >
                      <FiLogIn />
                      Login
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Favorites */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="relative text-gray-700 hover:text-black transition"
            onClick={() => navigate("/my-favorites")}
          >
            <FiHeart size={22} />
            <span className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-indigo-600 text-xs text-white flex items-center justify-center">
              {favorites.length}
            </span>
          </motion.button>

          {/* Basket */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="relative text-gray-700 hover:text-black transition"
            onClick={() => navigate("/my-basket")}
          >
            <FiShoppingCart size={22} />
            <span className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-indigo-600 text-xs text-white flex items-center justify-center">
              {items.length}
            </span>
          </motion.button>
        </div>
      </div>
    </header>
  );
}
