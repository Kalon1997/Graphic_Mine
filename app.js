const path = require('path');
const express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const multer = require('multer');
// const csrf = require('csurf');
const flash = require('connect-flash');

const MONGODB_URI = 'mongodb+srv://kalon123:kalon123@cluster0-t0gzi.mongodb.net/GraphicMine?retryWrites=true&w=majority';


const fileStorage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'imgs');
  },
  filename: (req, file, cb) => {
    // cb(null, new Date().toISOString() + '-' + file.filename + '-' + file.originalname)
    cb(null, file.originalname );
  }
});

const fileFilter2 = (req, file, cb) => {
  if(
      file.mimetype === 'photoImage/png' ||
      file.mimetype === 'photoImage/jpg' ||
      file.mimetype === 'photoImage/jpeg'
    )
    cb(null, true);
  else
    cb(null, false);
}


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
app.use(bodyParser());
// const csrfProtection = csrf();

// const helloRoutes = require('./routes/guest/hello.js');
const userRoutes = require('./routes/user.js');
const mongoConnect = require('./util/database.js').mongoConnect;
const User = require('./models/users.js');
// const Product = require('./models/products.js');

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.end(JSON.stringify(req.body));


// app.use(multer({storage: fileStorage, fileFilter: fileFilter }).single('dp')) ///////////////////////////////////////

app.use(
  multer({ storage: fileStorage2, fileFilter: fileFilter2 }).single('photoImage')
);

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'imgs')));

// app.use('/public', express.static(path.join(__dirname, 'imgs')));
app.use(
  session({secret: 'my secret', resave: false, saveUninitialized: false, store: store })
);
// app.use(csrfProtection);
app.use(flash());

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

// app.use((req, res, next) => {
//   res.locals.isAuthed = req.session.isLoggedin;
//   res.locals.csrfToken = req.csrfToken();
//   next();
// })


app.use(userRoutes);
// app.use(helloRoutes);

// mongoConnect(() => {
//   // console.log(client);
//   app.listen(3000);
// });
// mongoose.connect('mongodb://localhost:3000/GraphicMine-Copy');
// mongoose
//   .connect(
//     'mongodb+srv://kalon123:kalon123@cluster0-t0gzi.mongodb.net/GraphicMine?retryWrites=true&w=majority'
//   )
//   .then(result => {
//     app.listen(3000);
//   })
//   .catch(err => {
//     console.log(err);
//   });

  mongoose.connect('mongodb+srv://kalon123:kalon123@cluster0-t0gzi.mongodb.net/GraphicMine?retryWrites=true&w=majority', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(result => {
        app.listen(3000);
      })
    .catch(err => {
        console.log(err);
      });