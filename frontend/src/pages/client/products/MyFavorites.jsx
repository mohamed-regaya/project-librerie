import { motion } from "framer-motion";
import { FaTrash, FaShoppingBag } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFavorite } from "../../../../redux/slices/favoriteSlice";

export default function FavoritePage() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.favorite.items);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Produits en favoris</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">liste favoris vide .</p>
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

            <span className="text-center">Action</span>
          </div>

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

              {/* Remove */}
              <button
                onClick={() => dispatch(removeFromFavorite(item._id))}
                className="flex justify-center text-red-500 hover:text-red-700 transition"
              >
                <FaTrash size={18} />
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
