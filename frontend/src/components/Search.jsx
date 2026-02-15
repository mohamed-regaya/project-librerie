import { useEffect, useState } from "react";
import productServices from "../services/productServices";
import { useNavigate } from "react-router";
// props=  {products:[dsdsdsd]}
export default function Search() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()),
  );
  useEffect(() => {
    productServices.handleGetAllProducts().then((result) => {
      setProducts(result);
    });
  }, []);
  const navigate = useNavigate();
  return (
    <div className="relative w-72">
      {/* Search Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
      />

      {/* Suggestions */}
      {query && filteredProducts.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
          {filteredProducts.map((product) => (
            <li
              key={product.id}
              onClick={() => {
                setQuery("");
                navigate(`/product_info/${product._id}`);
              }}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            >
              {product.name}
            </li>
          ))}
        </ul>
      )}

      {/* No results */}
      {query && filteredProducts.length === 0 && (
        <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
          No products found
        </div>
      )}
    </div>
  );
}
