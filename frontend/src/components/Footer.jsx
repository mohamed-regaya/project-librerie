import { motion } from "framer-motion";
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiMail,
  FiPhone,
  FiMapPin,
  FiTruck,
  FiClock,
} from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="relative  border-t border-white/10 bg-slate-950 text-gray-300">
      {/* glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/10 via-purple-500/5 to-transparent blur-2xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 flex justify-center gap-6"
        >
          {[FiFacebook, FiInstagram, FiTwitter, FiMail].map((Icon, i) => (
            <motion.a
              key={i}
              href="#"
              whileHover={{ scale: 1.15, y: -4 }}
              className="rounded-full bg-white/5 p-4 backdrop-blur-md hover:bg-white/10 transition"
            >
              <Icon size={22} />
            </motion.a>
          ))}
        </motion.div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 gap-10 text-sm sm:grid-cols-2 md:grid-cols-4">
          {/* Shipping */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="mb-3 flex items-center gap-2 text-white">
              <FiTruck />
              <h4 className="font-semibold">Shipping</h4>
            </div>
            <p>Fast delivery within 24–48h.</p>
            <p>Free shipping on orders over $50.</p>
          </motion.div>

          {/* Opening Times */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="mb-3 flex items-center gap-2 text-white">
              <FiClock />
              <h4 className="font-semibold">Opening Hours</h4>
            </div>
            <p>Mon – Fri: 9:00 – 18:00</p>
            <p>Saturday: 10:00 – 16:00</p>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="mb-3 flex items-center gap-2 text-white">
              <FiPhone />
              <h4 className="font-semibold">Contact</h4>
            </div>
            <p>+1 234 567 890</p>
            <p>support@mylibrary.com</p>
          </motion.div>

          {/* Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="mb-3 flex items-center gap-2 text-white">
              <FiMapPin />
              <h4 className="font-semibold">Address</h4>
            </div>
            <p>123 Paper Street</p>
            <p>Stationery City, ST 45678</p>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="mt-16 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} My Library — All rights reserved.
        </div>
      </div>
    </footer>
  );
}
