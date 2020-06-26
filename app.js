const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const multer = require('multer');
//const MONGODB_URI = 'mongodb+srv://kalon:kalon123@cluster0-t0gzi.mongodb.net/test?retryWrites=true&w=majority';

// const MONGODB_URI = 'mongodb+srv://kalon123:kalon123@cluster0-t0gzi.mongodb.net/ProjectPlatform?retryWrites=true&w=majority';
const MONGODB_URI = 'mongodb+srv://kalon123:kalon123@cluster0-t0gzi.mongodb.net/GraphicMine?retryWrites=true&w=majority';


// const fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'images');
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().toISOString() + '-' + file.filename + '-' + file.originalname)
//   }
// });
//
// const fileFilter = (req, file, cb) => {
//   if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg')
//     cb(null, true);
//   else
//     cb(null, false);
// }


const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'imgs');
  },
  filename: (req, file, cb) => {
    // cb(null, new Date().toISOString() + '-' + file.filename + '-' + file.originalname);
      cb(null, file.originalname );
  }
});

const fileFilter = (req, file, cb) => {
  if (
     file.mimetype === 'image/png' ||
     file.mimetype === 'image/jpg' ||
     file.mimetype === 'image/jpeg'
   ) {
     cb(null, true);
   } else {
     cb(null, false);
   }
}



const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});
const app = express();
const bodyParser = require('body-parser');
// const helloRoutes = require('./routes/guest/hello.js');
const userRoutes = require('./routes/user.js');
const mongoConnect = require('./util/database.js').mongoConnect;
const User = require('./models/users.js');
// const Product = require('./models/products.js');

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(multer({storage: fileStorage, fileFilter: fileFilter }).single('dp')) ///////////////////////////////////////

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'imgs')));
// app.use('/public', express.static(path.join(__dirname, 'imgs')));
app.use(
  session({secret: 'my secret', resave: false, saveUninitialized: false, store: store })
);


app.set('view engine', 'ejs');
app.set('views', 'views');

// app.use((req, res, next) => {
//   User.findById('5e8c7c1eda9abb06acf5eadd')
//   .then(user => {
//     req.user = user;
//     next();
//   })
//   .catch(err => console.log(err));
//   // next();
// })
app.use(userRoutes);
// app.use(helloRoutes);

mongoConnect(() => {
  // console.log(client);
  app.listen(3000);
});
