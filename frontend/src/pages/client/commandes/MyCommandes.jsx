import React from "react";
import { FaClock, FaCheckCircle, FaTruck, FaBox } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getClientOrders } from "../../../services/ordersServices";

const statusConfig = {
  pending: {
    label: "Pending",
    icon: FaClock,
    color: "bg-yellow-100 text-yellow-600",
  },
  confirmed: {
    label: "Confirmed",
    icon: FaCheckCircle,
    color: "bg-blue-100 text-blue-600",
  },
  "en route": {
    label: "En Route",
    icon: FaTruck,
    color: "bg-purple-100 text-purple-600",
  },
  shipped: {
    label: "Shipped",
    icon: FaBox,
    color: "bg-green-100 text-green-600",
  },
};

const OrderStatusCard = ({ orderId, status, products }) => {
  const config = statusConfig[status];
  const Icon = config?.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white shadow-lg rounded-2xl p-6 flex items-center justify-between hover:shadow-xl transition"
    >
      <div>
        <h3 className="text-lg font-semibold">Order #{orderId}</h3>
      </div>
      <ol>
        {products.map((el) => {
          return <li>{el.name}</li>;
        })}
      </ol>
      <div
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${config?.color}`}
      >
        {Icon && <Icon className="text-base" />}
        {config?.label}
      </div>
    </motion.div>
  );
};

function MyCommandes() {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    getClientOrders(user._id).then((result) => {
      setOrders(result);
    });
  }, [user]);
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto grid gap-6">
        <h1 className="text-2xl font-bold mb-4">suivis des ordres </h1>
        {orders.map((order) => (
          <OrderStatusCard
            key={order._id}
            orderId={order._id}
            status={order.status}
            products={order.products}
          />
        ))}
      </div>
    </div>
  );
}

export default MyCommandes;
