import { useState } from "react";
import productServices from "../../../services/productServices";
import { toast } from "react-toastify";
import CategorySelector from "../../../components/CategorySelector";
export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(category);
  };

  const changeCategoryHandler = (value) => {
    setFormData({ ...formData, category: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      // objects.keys(formData) = ['name','qyuanti ....]
      data.append(key, formData[key]);
    });

    data.append("image", image);

    try {
      productServices.handleAddProduct(data);
      setFormData({
        name: "",
        description: "",
        price: "",
        quantity: "",
        category: "",
      });
      setImage(null);
      setPreview(null);

      toast.success("✅ Product added successfully!");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
              placeholder="Nike Air Max"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Product Category
            </label>
            <CategorySelector delta={changeCategoryHandler} />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
              placeholder="High quality sneakers..."
            />
          </div>

          {/* Price & Quantity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Product Image
            </label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer flex items-center justify-center w-32 h-32 border-2 border-dashed rounded-xl hover:border-indigo-400 transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  required
                />
                {!preview ? (
                  <span className="text-sm text-gray-400 text-center">
                    Click to upload
                  </span>
                ) : (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-full object-cover rounded-xl"
                  />
                )}
              </label>

              <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
