import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import productServices from "../../../services/productServices";
import { toast } from "react-toastify";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

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

  const handleDelete = async () => {
    if (!selectedProduct) return;

    try {
      productServices
        .handleDeleteProduct(selectedProduct._id)
        .then(() => {
          toast.warning("produit supprimé !");
        })
        .then(() => {
          fetchProducts();
          setSelectedProduct(null);
        });
    } catch (error) {
      console.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Products</h1>

          <button
            onClick={() => navigate("/add-product")}
            className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            + Add Product
          </button>
        </div>

        {products.length === 0 ? (
          <p className="text-gray-500 text-center">No products found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
              >
                <h1>{product.category}</h1>
                <img
                  src={`http://localhost:8000/uploads/${product.image}`}
                  alt={product.name}
                  className="h-48 w-full object-cover"
                />

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-indigo-600 font-bold">
                      ${product.price}
                    </span>

                    <span className="text-sm text-gray-400">
                      Qty: {product.quantity}
                    </span>
                  </div>

                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={() => navigate(`/edit-product/${product._id}`)}
                      className="flex-1 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="flex-1 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              Delete Product
            </h2>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{selectedProduct.name}</span>?
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
