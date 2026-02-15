import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaArrowRight, FaCross } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addToBasket } from "../../redux/slices/basketSlice";

export default function ProductModal({ isOpen, onClose, product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (!product) return null;

  const handleCommander = () => {
    dispatch(addToBasket(product));
    onClose();
    navigate("/commande", { state: { product } });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed z-50 inset-0 flex items-center justify-center p-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <div
              className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <img
                src={`http://localhost:8000/uploads/${product.image}`}
                alt={product.name}
                className="w-full h-56 object-cover"
              />

              {/* Content */}
              <div className="p-5">
                <h2 className="text-xl font-bold mb-2">{product.name}</h2>

                <p className="text-gray-600 text-sm mb-6">
                  {product.description}
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleCommander}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition"
                  >
                    <FaShoppingCart />
                    Commander
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      dispatch(addToBasket(product));
                    }}
                    className="flex-1 border border-gray-300 bg-blue-900 py-2 rounded-lg flex items-center justify-center gap-2 transition"
                  >
                    Continuer
                    <FaArrowRight />
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                    }}
                    className="flex-1 border border-gray-300 bg-orange-600 py-2 rounded-lg flex items-center justify-center gap-2 transition"
                  >
                    Fermer
                    <FaCross />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
