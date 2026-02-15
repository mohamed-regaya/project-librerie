import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

import {
  addToFavorite,
  removeFromFavorite,
} from "../../../../redux/slices/favoriteSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductModal from "../../../components/CardModal";
import productServices from "../../../services/productServices";
export default function ProductCategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState(1000);
  const [isOpen, setIsOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const fetchProducts = async () => {
    try {
      const res = await productServices.handleGetAllProducts();
      setProducts(res);
    } catch (error) {
      console.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) => product.category === category && product.price <= price,
  );

  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.favorite);
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {isOpen && currentProduct && (
        <ProductModal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
          product={currentProduct}
        />
      )}
      <div className="mx-auto max-w-7xl px-6 py-12 flex gap-10">
        {/* ===== Sidebar ===== */}
        <aside className="w-64 shrink-0 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
          <h3 className="mb-6 text-lg font-semibold">Filter by price</h3>

          <input
            type="range"
            min="0"
            max="500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full accent-indigo-500"
          />

          <p className="mt-2 text-sm text-gray-300">
            Up to <span className="font-semibold text-white">${price}</span>
          </p>
        </aside>

        {/* ===== Products ===== */}
        <main className="flex-1">
          <h1 className="mb-8 text-2xl font-bold capitalize">
            {category.replace("-", " ")}
          </h1>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <motion.div
                key={product._id}
                whileHover={{ y: -6 }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
              >
                <img
                  src={`http://localhost:8000/uploads/${product.image}`}
                  alt={product.name}
                  className="mx-auto h-40 object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                />

                <div className="mt-4 space-y-2">
                  <p className="line-clamp-2 text-sm text-gray-300">
                    {product.name}
                  </p>
                  <p className="text-lg font-semibold">${product.price}</p>
                </div>

                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => {
                      const exists = items.find(
                        (item) => item._id === product._id,
                      );

                      if (exists) {
                        console.log(product._id);
                        dispatch(removeFromFavorite(product._id));
                      } else {
                        dispatch(addToFavorite(product));
                      }
                    }}
                    className={`mt-auto text-white py-2 rounded-lg flex items-center justify-center gap-2  transition`}
                  >
                    {items.find((item) => item._id === product._id) ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FiHeart className="text-gray-400 hover:text-red-400 transition" />
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setIsOpen(true);
                      setCurrentProduct(product);
                    }}
                    className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm hover:bg-indigo-500"
                  >
                    <FiShoppingCart />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {!filteredProducts.length && (
            <p className="mt-12 text-gray-400">
              No products found for this category.
            </p>
          )}
        </main>
      </div>
    </div>
  );
}
