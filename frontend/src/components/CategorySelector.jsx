import { useState } from "react";

export default function CategorySelector({ delta }) {
  const categories = [
    "Stylos & crayons",
    "Gommes & correcteurs",
    "Cahiers & blocs-notes",
    "Feuilles & papier",
    "Surligneurs & marqueurs",
    "Règles, équerres & rapporteurs",
    "Trousses",
    "Classement & archivage",
    "Colles & adhésifs",
    "Ciseaux & cutters",
    "Agrafage & perforation",
    "Calculatrices",
    "Tableaux & accessoires",
    "Fournitures scolaires",
    "Fournitures de bureau",
    "Dessin & beaux-arts",
    "Impression & reliure",
    "Accessoires informatiques",
  ];

  return (
    <div className="w-full max-w-sm">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Catégorie d’accessoire
      </label>

      <select
        onChange={(e) => delta(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm
                   focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">-- Sélectionner une catégorie --</option>

        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
