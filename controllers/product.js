const path = require('path');
const Product = require('../models/products');
const User = require('../models/users');
const Photo = require('../models/photos');
const Session = require('../app.js');

const mongodb = require('mongodb');
const getDb = require('../util/database.js').getDb;
const bcrypt = require('bcryptjs');

const ObjectId = mongodb.ObjectId;


exports.getAddProduct = (req, res, next) => {
  const db = getDb();
  res.render('addproduct.ejs', {
    pageTitle: 'Add Project - Project_Platform',
    currUserId: req.session.currUserId,
    isAuthed: req.session.isLoggedin
  });
};


exports.postAddProduct = (req, res, next) => {
  const corspnguserid = req.session.currUserId;
  const projecttitle = req.body.protitle;
  const projectdetails = req.body.prodetails;
  // const projectimgurl = req.body.proimgurl;
  // const projectimgurl = "/IMG_20170518_152838.jpg";
  const img = req.file;
  // const projectimgurl = img.path;
  const projectimgurl = img.originalname;
  console.log(projectimgurl);


    const project = new Product(corspnguserid, projecttitle, projectdetails, projectimgurl);
      project
        .save()
        .then(result => {
        console.log("New Project added");
        res.redirect('/');
      })
      .catch(err => {
        console.log(err);
      });
};

//  haveto open both the collection later onto me.ejs
// exports.getMe = (req, res, next) => {
//   // const userId1 = req.params.userId;
//   const userId2 = req.session.currUserId;
//   const db = getDb();
//     return db
//       .collection('products','users')
//       .fetchAll()
//       .then(products => {
//           res.render('me.ejs', {
//           pageTitle: 'Me - Project_Platform',
//           prods: products,
//           currentUserName: userId2.username,
//           isAuthed: req.session.isLoggedin
//         });
//       })
//       .catch( err => {
//         console.log(err);
//       });
// };


// exports.getAllProjects = (req, res, next) => {
//   const userId1 = req.params.userId;
//   const userId2 = req.session.currUserId;
//   const db = getDb();
//     return db
//       .collection('products')
//       .find({useridnumber: userId2})
//       .fetchAll()
//       .then(products => {
//         res.render('projectdisplay.ejs', {
//           prods: products,
//           pageTitle: 'All Products'
//         });
//       })
//       .catch(err => {
//         console.log(err);
//       });
// };

// exports.getMe = (req, res, next) => {
//   const userId1 = req.params.userId;
//   const userId2 = req.session.currUserId;
//   const db = getDb();
//     return db
//       .collection('users')
//       .findOne({_id: userId2})
//       .then(currentUser => {
//           res.render('me.ejs', {
//           pageTitle: 'Me - Project_Platform',
//           currentUserName: currentUser.username,
//           isAuthed: req.session.isLoggedin
//         });
//       })
//       .catch( err => {
//         console.log(err);
//       });
// };

exports.getAllProjects = (req, res, next) => {
  // const userId1 = req.params.userId;
  const userId2 = req.session.currUserId;
  const db = getDb();
  return db
    .collection('products')
    .find({useridnumber: userId2})
    .toArray()
    .then(products => {
      res.render('projectdisplay.ejs', {
        prods: products,
        pageTitle: 'All Products'
      });
    })
    .catch(err => {
      console.log(err);
    });
};


// _______________________________those 4 cards buttons now _______________________________



exports.getPhotos = (req, res, next) => {
  const db = getDb();
  res.render('photos.ejs', {
    pageTitle: 'Add Photo - Graphic_Mine',
    currUserId: req.session.currUserId,
    isAuthed: req.session.isLoggedin
  });
};














//   const db = getDb();       delete  it
//      return db
//        .collection('users')
//        .findOne()
//        .then(result => {
//          if(result)
//           {
//               Product.fetchAll()
//                 .then(products => {
//                     res.render('projectdisplay.ejs', {
//                       prods: products,
//                       pageTitle: 'All Products'
//                     });
//                 });
//           }
//         })
//         .catch(err => {
//           console.log(err);
//         });
//
//
// };


// exports.getAllProjects = (req, res, next) => {
//   const userId1 = req.params.userId;
//   const userId2 = req.session.currUserId;
//   Product.fetchAll()
//     .then(products => {
//       res.render('projectdisplay.ejs', {
//         prods: products,
//         pageTitle: 'All Products'
//       });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };
