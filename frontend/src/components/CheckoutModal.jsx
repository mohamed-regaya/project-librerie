import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { loginUser } from "../../redux/slices/authSlice";
import { createOrder } from "../services/ordersServices";
import { toast } from "react-toastify";
import { clearBasket } from "../../redux/slices/basketSlice";
export default function CheckoutModal(props) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const handleConfirm = async () => {
    const orderData = {
      client_id: user?._id,
      shippingAddress: address,
      paymentMethod: paymentMethod,
      totalPrice: props.totalPrice,
      products: props.products,
    };
    await createOrder(orderData).then(() => {
      toast.success("commande envoyé");
      dispatch(clearBasket());
    });
    props.onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl"
      >
        <h2 className="text-xl font-bold mb-4">Finaliser la commande</h2>

        {/* USER CONNECTED */}
        {user ? (
          <div className="mb-4 p-3 bg-gray-100 rounded">
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        ) : (
          /* LOGIN FORM */
          <form onSubmit={handleLogin} className="mb-4 space-y-3">
            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Mot de passe"
              className="w-full border rounded px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded"
            >
              Se connecter
            </button>
          </form>
        )}

        {/* DELIVERY ADDRESS */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Adresse de livraison
          </label>
          <textarea
            disabled={!user}
            className="w-full border rounded px-3 py-2"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        {/* PAYMENT METHOD */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Méthode de paiement
          </label>
          <select
            disabled={!user}
            className="w-full border rounded px-3 py-2"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="card">Carte Bancaire</option>
            <option value="cash">Paiement à la livraison</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3">
          <button onClick={props.onClose} className="px-4 py-2 border rounded">
            Annuler
          </button>

          <button
            onClick={handleConfirm}
            disabled={!user}
            className="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-400"
          >
            Confirmer
          </button>
        </div>
      </motion.div>
    </div>
  );
}
