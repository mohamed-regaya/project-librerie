import { motion } from "framer-motion";
import { FaTrash, FaShoppingBag } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromBasket,
  updateQuantity,
} from "../../../../redux/slices/basketSlice";

export default function BasketPage() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.basket.items);

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.buyedQuantity,
    0,
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">🛒 Votre Panier</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">Votre panier est vide.</p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-5 gap-4 p-4 border-b font-semibold text-gray-600">
            <span className="col-span-2">Produit</span>
            <span>Prix</span>
            <span>Quantité</span>
            <span className="text-center">Action</span>
          </div>

          {/* Items */}
          {items.map((item) => (
            <motion.div
              key={item._id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-5 gap-4 p-4 items-center border-b last:border-b-0"
            >
              {/* Product */}
              <div className="col-span-2 flex items-center gap-4">
                <img
                  src={`http://localhost:8000/uploads/${item.image}`}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <span className="font-medium">{item.name}</span>
              </div>

              {/* Price */}
              <span className="font-semibold">{item.price} €</span>

              {/* Quantity */}
              <input
                type="number"
                min="1"
                value={item.buyedQuantity}
                onChange={(e) =>
                  dispatch(
                    updateQuantity({
                      id: item._id,
                      quantity: Number(e.target.value),
                    }),
                  )
                }
                className="w-16 border rounded px-2 py-1"
              />

              {/* Remove */}
              <button
                onClick={() => dispatch(removeFromBasket(item._id))}
                className="flex justify-center text-red-500 hover:text-red-700 transition"
              >
                <FaTrash size={18} />
              </button>
            </motion.div>
          ))}

          {/* Footer */}
          <div className="p-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-lg font-bold">
              Total : {totalPrice.toFixed(2)} €
            </span>

            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition">
              <FaShoppingBag />
              Commander
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
