import express from "express";

let voituresRouter = express.Router();

let voitures = [
  { id: 22, marque: "Toyota", modele: "Corolla", annee: 2020, prix: 25000 },
  { id: 78, marque: "BMW", modele: "X5", annee: 2019, prix: 55000 },
  { id: 44545, marque: "Renault", modele: "Clio", annee: 2022, prix: 18000 },
  { id: 99887, marque: "Mercedes", modele: "C200", annee: 2018, prix: 30000 },
];

voituresRouter.get("/voitures", (req, res) => {
  res.json({ resultat: voitures });
});

// ==================================
// GET : voiture par ID
// ==================================
voituresRouter.get("/voiture/:id", (req, res) => {
  let voiture = voitures.find((v) => v.id == req.params.id);
  if (!voiture) {
    return res.json({ message: "Voiture non trouvée" });
  }
  res.json({ resultat: voiture });
});

// ==================================
// POST : ajouter une voiture
// ==================================
voituresRouter.post("/voiture", (req, res) => {
  let nouvelleVoiture = req.body;

  if (!nouvelleVoiture.id || !nouvelleVoiture.marque) {
    return res.json({ message: "Champs manquants" });
  }

  voitures.push(nouvelleVoiture);

  res.json({ message: "Voiture ajoutée", resultat: nouvelleVoiture });
});

// ==================================
// PUT : modifier une voiture
// ==================================
voituresRouter.put("/voiture/:id", (req, res) => {
  let index = voitures.findIndex((v) => v.id == req.params.id);

  if (index === -1) {
    return res.json({ message: "Voiture non trouvée" });
  }

  voitures[index] = { ...voitures[index], ...req.body };

  res.json({ message: "Voiture mise à jour", resultat: voitures[index] });
});

// ==================================
// DELETE : supprimer une voiture
// ==================================
voituresRouter.delete("/voiture/:id", (req, res) => {
  let index = voitures.findIndex((v) => v.id == req.params.id);

  if (index === -1) {
    return res.json({ message: "Voiture non trouvée" });
  }

  res.json({ message: "Voiture supprimée" });
});

export default voituresRouter;
