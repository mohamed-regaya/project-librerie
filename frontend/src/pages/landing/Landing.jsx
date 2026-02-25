import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import NavMenu from "../../components/CategoryMenu";
import productServices from "../../services/productServices";
import { useNavigate } from "react-router";

function LibraryLanding() {
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
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
  const next = () => {
    setIndex((prev) => (prev + 1) % products.length);
  };

  const prev = () => {
    setIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const navigate = useNavigate();

  if (!products.length) return null;
  return (
    <>
      <NavMenu />
      <div className="bg-slate-950 text-white overflow-hidden">
        {/* Hero Section */}

        <div className="relative h-[420px] w-full overflow-hidden">
          {/* background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-pink-500/20 blur-2xl" />

          <AnimatePresence mode="wait">
            <motion.img
              key={products[index]._id}
              src={`http://localhost:8000/uploads/${products[index].image}`}
              alt={products[index].name}
              initial={{ opacity: 0, x: 120 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -120 }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative z-10 h-full w-full object-contain p-14 drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
            />
          </AnimatePresence>

          {/* Arrows */}
          <button
            onClick={prev}
            className="absolute left-6 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-4 text-white backdrop-blur-md hover:bg-white/20 transition"
          >
            <FiChevronLeft size={26} />
          </button>

          <button
            onClick={next}
            className="absolute right-6 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-4 text-white backdrop-blur-md hover:bg-white/20 transition"
          >
            <FiChevronRight size={26} />
          </button>
        </div>

        {/* ===== Grid ===== */}
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {products.slice(0, 8).map((product) => (
              <motion.div
                key={product._id}
                whileHover={{ y: -6, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
                onClick={() => {
                  navigate("/product_info/" + product._id);
                }}
              >
                {/* glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/0 to-pink-500/0 group-hover:from-indigo-500/20 group-hover:to-pink-500/20 transition" />

                <img
                  src={`http://localhost:8000/uploads/${product.image}`}
                  alt={product.name}
                  className="relative z-10 mx-auto h-36 object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default LibraryLanding;
