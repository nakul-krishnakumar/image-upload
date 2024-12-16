const express = require('express');
const path = require('path');
const multer = require('multer'); // MULTER IS USED FOR UPLOADING FILE
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.set('view engine', "ejs");
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({ extended: false })); // USED TO ACCEPT FORM-DATA AS INPUT
app.use(express.static('public')); // USED TO RENDER STATIC FILES ( HERE, TAILWIND)

app.get('/', (req, res) => {
   return res.render('home');
})

// ------------------ MULTER ------------------------
// --------------------------------------------------
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      return cb(null, './uploads');
   },
   filename: (req, file, cb) => {
      return cb(null, `${Date.now()}-${file.originalname}`);
   }
});

const upload = multer({ storage });
// ------------------------------------------------------

// ----- UPLOAD API -----------
app.post('/upload', upload.single("profileImage"), (req, res) => {
   console.log(req.body);
   console.log(req.file);

   return res.status(201).redirect('/');
})
// ----------------------------

app.listen(PORT, () => {
   console.log(`Server listening at ${process.env.HOST_URL}:${PORT}`);
});