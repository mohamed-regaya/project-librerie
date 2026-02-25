import React, { useState } from "react";
import {
  FaClock,
  FaCheckCircle,
  FaTruck,
  FaBox,
  FaCarCrash,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { getAllOrders, updateOrder } from "../../../services/ordersServices";
import { useEffect } from "react";

const statusConfig = {
  pending: {
    label: "Pending",
    icon: FaClock,
    color: "bg-yellow-100 text-yellow-600",
  },
  processing: {
    label: "processing",
    icon: FaCheckCircle,
    color: "bg-blue-100 text-blue-600",
  },
  shipped: {
    label: "shipped",
    icon: FaTruck,
    color: "bg-purple-100 text-purple-600",
  },
  delivered: {
    label: "delivered",
    icon: FaBox,
    color: "bg-green-100 text-green-600",
  },
  cancelled: {
    label: "cancelled",
    icon: FaCarCrash,
    color: "bg-red-100 text-white-600",
  },
};

const allStatuses = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const AdminOrderCard = ({ order, onStatusChange }) => {
  const config = statusConfig[order.status];
  const Icon = config?.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:shadow-xl transition"
    >
      <div>
        <h3 className="text-lg font-semibold">Order #{order._id}</h3>
        <p className="text-sm text-gray-500">
          Customer: {order.client_id.name}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${config?.color}`}
        >
          {Icon && <Icon className="text-base" />}
          {config?.label}
        </div>

        <select
          value={order.status}
          onChange={(e) => onStatusChange(order._id, e.target.value)}
          className="border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          {allStatuses.map((status) => (
            <option key={status} value={status}>
              {statusConfig[status].label}
            </option>
          ))}
        </select>
      </div>
    </motion.div>
  );
};

function CommandesManagement() {
  const [orders, setOrders] = useState([]);

  function handleGetAllOrders() {
    getAllOrders().then((result) => {
      setOrders(result);
      console.log(result);
    });
  }
  useEffect(() => {
    handleGetAllOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    await updateOrder(orderId, { status: newStatus }).then(() => {
      handleGetAllOrders();
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto grid gap-6">
        <h1 className="text-2xl font-bold mb-4">Admin Orders Management</h1>
        {orders.length > 0 &&
          orders.map((order) => (
            <AdminOrderCard
              key={order.id}
              order={order}
              onStatusChange={handleStatusChange}
            />
          ))}
      </div>
    </div>
  );
}

export default CommandesManagement;
