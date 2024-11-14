const express = require('express');
const router = express.Router();
const { getAllVillas, addVilla, updateVilla, deleteVilla, getVillaById } = require('../Controller/villaController');
const path = require('path'); 
const fs = require('fs');  
const multer = require('multer');
const Villa = require('../Module/Villa'); // Update the path if necessary



const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});


const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, 
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});


function checkFileType(file, cb) {
 
  const filetypes = /jpeg|jpg|png|gif/;
 
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
 
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Error: Images Only!'));
  }
}

// GET all villas
router.get('/', getAllVillas);

// POST a new villa (admin only) - Only one POST route
router.post('/', upload.single('Imageview'), addVilla);

// PUT to update a villa's information (admin only)
router.put('/:id', upload.single('Imageview'), updateVilla);


// DELETE a villa (admin only)
router.delete('/:id', deleteVilla);

// GET a single villa by ID
router.get('/:id', getVillaById);

module.exports = router;
