import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useParams } from "react-router";
import productServices from "../../../services/productServices";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorite,
  removeFromFavorite,
} from "../../../../redux/slices/favoriteSlice";
import {
  addToBasket,
  removeFromBasket,
} from "../../../../redux/slices/basketSlice";

export default function ProductInfos() {
  const { product_id } = useParams();
  const [product, setProduct] = useState(null);
  const basket = useSelector((state) => state.basket.items);
  const favorites = useSelector((state) => state.favorite.items);
  const dispatch = useDispatch();

  useEffect(() => {
    productServices.handleGetProductById(product_id).then((result) => {
      setProduct(result);
    });
  }, [product_id]);

  if (!product) return null;
  const isInBasket = basket.some((item) => item._id === product_id);
  const isInFavorite = favorites.some((item) => item._id === product_id);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-6xl rounded-3xl bg-white p-6 shadow-xl"
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Image Section */}
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={`http://localhost:8000/uploads/${product.image}`}
            alt={product.name}
            className="h-[420px] w-full object-cover"
          />

          {/* Favorite button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="absolute right-4 top-4 rounded-full bg-white/90 p-3 shadow hover:bg-red-50"
            onClick={() => dispatch(addToFavorite(product))}
          >
            <FaHeart className="text-xl text-red-500" />
          </motion.button>
        </div>

        {/* Info Section */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            <p className="mt-4 text-gray-600 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-6 text-3xl font-semibold text-blue-600">
              {product.price} €
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className={`flex flex-1 items-center justify-center gap-3 rounded-xl px-6 py-3 text-lg font-medium text-white 
    ${
      isInBasket
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700"
    }`}
              onClick={() =>
                isInBasket
                  ? dispatch(removeFromBasket(product._id))
                  : dispatch(addToBasket(product))
              }
            >
              <FaShoppingCart />
              {isInBasket ? "retirer de panier" : "ajouter au panier"}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-6 py-3 text-gray-700 hover:bg-gray-100"
              onClick={() =>
                isInFavorite
                  ? dispatch(removeFromFavorite(product._id))
                  : dispatch(addToFavorite(product))
              }
            >
              <FaHeart
                className={isInFavorite ? "text-red-600" : "text-red-500"}
              />
              {isInFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
