import multer from "multer";
//uuid ==> sfdsdfsdf-sdfsdfs-545454-545s4f5s-45s4df5sf
//on va creer un moteur de stockage

const storage = multer.diskStorage({
  //destination: "/uploads", ici il ya le risque d'avoir olusieur fichiers avec le meme noms
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // on va creer un unique nom pour le fichier   ====> coucous.jpg ====> 1765356482837-couscous.jpg
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

let upload = multer({ storage: storage });

export default upload;
// donc upload ici c'est notre middleware !!
//uploads/sffsdfsdfsf.image.jpg
