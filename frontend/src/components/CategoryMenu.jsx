import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const menu = [
  {
    label: "Stylos & Écriture",
    items: [
      "Stylos bille",
      "Stylos gel",
      "Stylos plume",
      "Crayons & porte-mines",
      "Surligneurs",
      "Marqueurs",
    ],
  },
  {
    label: "Cahiers & Papier",
    items: [
      "Cahiers",
      "Carnets",
      "Blocs-notes",
      "Feuilles & ramettes",
      "Agendas",
    ],
  },
  {
    label: "Classement",
    items: [
      "Classeurs",
      "Pochettes",
      "Chemises",
      "Intercalaires",
      "Boîtes de rangement",
    ],
  },
  {
    label: "Accessoires",
    items: [
      "Gommes",
      "Taille-crayons",
      "Règles",
      "Ciseaux",
      "Correcteurs",
      "Trombones & punaises",
    ],
  },
];

export default function NavMenu() {
  const [active, setActive] = useState(null);

  return (
    <nav className="relative bg-white border-b">
      <ul className="flex gap-10 px-8 py-4">
        {menu.map((item) => (
          <li
            key={item.label}
            className="relative"
            onMouseEnter={() => setActive(item.label)}
            onMouseLeave={() => setActive(null)}
          >
            {/* Catégorie */}
            <button className="font-medium text-gray-800 hover:text-black transition">
              {item.label}
            </button>

            {/* Sous-catégories */}
            <AnimatePresence>
              {active === item.label && (
                <motion.ul
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.97 }}
                  transition={{
                    duration: 0.25,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute left-0 top-full mt-4 w-64 rounded-xl bg-white border shadow-[0_12px_40px_rgba(0,0,0,0.12)] p-3 z-50"
                >
                  {item.items.map((sub) => (
                    <li key={sub}>
                      <a
                        href="#"
                        className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black transition"
                      >
                        {sub}
                      </a>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </nav>
  );
}
