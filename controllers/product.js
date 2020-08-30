const Photo = require('../models/photos');
const path = require('path');
            // const Product = require('../models/products');
const User = require('../models/users');

const Session = require('../app.js');

// const mongodb = require('mongodb');
// const getDb = require('../util/database.js').getDb;
const bcrypt = require('bcryptjs');
const { Script } = require('vm');

// const ObjectId = mongodb.ObjectId;


// exports.getAddProduct = (req, res, next) => {
//   const db = getDb();
//   res.render('addproduct.ejs', {
//     pageTitle: 'Add Project - Project_Platform',
//     currUserId: req.session.currUserId,
//     isAuthed: req.session.isLoggedin
//   });
// };


// exports.postAddProduct = (req, res, next) => {
//   const corspnguserid = req.session.currUserId;
//   const projecttitle = req.body.protitle;
//   const projectdetails = req.body.prodetails;
//   // const projectimgurl = req.body.proimgurl;
//   // const projectimgurl = "/IMG_20170518_152838.jpg";
//   const img = req.file;
//   // const projectimgurl = img.path;
//   const projectimgurl = img.originalname;
//   console.log(projectimgurl);


//     const project = new Product(corspnguserid, projecttitle, projectdetails, projectimgurl);
//       project
//         .save()
//         .then(result => {
//         console.log("New Project added");
//         res.redirect('/');
//       })
//       .catch(err => {
//         console.log(err);
//       });
// };

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

// exports.getAllProjects = (req, res, next) => {
//   // const userId1 = req.params.userId;
//   const userId2 = req.session.currUserId;
//   const db = getDb();
//   return db
//     .collection('products')
//     .find({useridnumber: userId2})
//     .toArray()
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


// _______________________________those 4 cards buttons now _______________________________

exports.getPhotos = (req, res, next) => {
  // const db = getDb();
  res.render('photos.ejs', {
    pageTitle: 'Add Photo - Graphic_Mine',
    currUserId: req.session.currUserId,
    isAuthed: req.session.isLoggedin
  });
};


exports.postAddPhotos = (req, res, next) => {
  const corspnguserid = req.session.currUserId;
  const detailstring = req.body.photodetails;
  var pd = [];
  pd.push(detailstring);
  pd.push(detailstring);
  var photoprice = "crap";
  const photourl = "crap";
  // const uploadedphotofile = req.file;
  // const photourl = uploadedphotofile.originalname;
  const photo = new Photo({
    title: corspnguserid,
    desp: pd,
    price: photoprice,
    imageUrl: photourl
  });
      photo
        .save()
        .then(result => {
        console.log("New Photo added");
        res.redirect('/');
      })
      .catch(err => {
        console.log(err);
      });
};




exports.showPhotos = (req, res, next) => {
  // const userId1 = req.params.userId;
  const userId2 = req.session.currUserId;
  // const db = getDb();
  // return db
    // .collection('photos')
    Photo.findOne({title: userId2})
    .toArray()
    .then(pic => {
      res.render('photodisplay.ejs', {
        prods: pic,
        pageTitle: 'Photos - Graphic_Mine',
        currUserId: req.session.currUserId,
        isAuthed: req.session.isLoggedin
      });
      // res.render('photos.ejs', {
      //   pageTitle: 'Add Photo - Graphic_Mine',
      //   currUserId: req.session.currUserId,
      //   isAuthed: req.session.isLoggedin
      // });
    })
    .catch(err => {
      console.log(err);
      res.render('photos.ejs', {
        pageTitle: 'Add Photo - Graphic_Mine',
        currUserId: req.session.currUserId,
        isAuthed: req.session.isLoggedin
      });
    });
};

// exports.showSearchedPhotos = (req, res, next) => {
//   // const userId1 = req.params.userId;
//   const userId2 = req.session.currUserId;
//   var whole_url = req.url;                       // http...search?=wood+a7
//   var beforeAfterEqual = whole_url.split("=");   // ['http...search?', 'wood+a7']
//   var afterEqual = beforeAfterEqual[1];           // wood+a7
//   var beforeAfterPlus = afterEqual.split("+");  // ['wood', 'a7']
//   var afterPlus1 = beforeAfterPlus[0];  // wood
//   var afterPlus2 = beforeAfterPlus[1];  // a7

//   var arr = [];

//   arr.push(beforeAfterPlus[0]);
//   arr.push(beforeAfterPlus[1]);


//   console.log(arr);
 

//   const db = getDb();
//   return db
//     .collection('photos')
//     .find({photodetails : arr })
//     .toArray()
//     .then(pic => {
//       res.render('photodisplay.ejs', {
//         prods: pic,
//         pageTitle: 'Photos - Graphic_Mine'
//       });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };


exports.showSearchedPhotos = (req, res, next) => {
                            // const userId1 = req.params.userId;
  const userId2 = req.session.currUserId;
  var wholeUrl = req.url;                         //  http....search?=wood+a7
  var beforeAfterEqual = wholeUrl.split("=");     //  ['http....search?', 'wood+a7']
  var beforeAfterPlus =  beforeAfterEqual[1].split("+");  // ['wood', 'a7']
  console.log(beforeAfterPlus);
  

                        // const srch = req.body._parsedOriginalUrl;
  // const db = getDb();
  // return db
  //   .collection('photos')
    Photo.find({photodetails: {$in: beforeAfterPlus }})
    .toArray()
    .then(pic => {
      res.render('photodisplay.ejs', {
        prods: pic,
        pageTitle: 'Photos - Graphic_Mine',
        currUserId: req.session.currUserId,
        isAuthed: req.session.isLoggedin
      });
    })
    .catch(err => {
      console.log(err);
    });
};


































// exports.postAddPhotos = (req, res, next) => {
//   const corspnguserid = req.session.currUserId;
//   // var detailstring = req.body.photodetails;
//   // var detailstring = "a,b,c";
//   // var picdetails =  detailstring.toString();
//   // var detailstring = "red,blue";
//   // for(int i=0; i<detailstring.length(); i++)
//   // {
//   //   if(detailstring.charAt(i) == ',')
//   // }
//     var str =  "a,b,c";
//   //  var str = req.body.photodetails;
//   // console.log(str);
//   // String(str);
//   let picdetails = str.split(",").map(item => item.trim());
//   // var one = detailstring.substr(0,3);
//   // var two = detailstring.substr(4,4);
//   // var picdetails = ['a','b','c'];
//   // var picdetails = [];
//   // picdetails.push(one);
//   // picdetails.push(two);  
//   var photocolor = "photocolor";
//   const photourl = "crap";
//   // const uploadedphotofile = req.file;
//   // const photourl = uploadedphotofile.originalname;
//     const photo = new Photo(corspnguserid, picdetails, photocolor, photourl);
//       photo
//         .save()
//         .then(result => {
//         console.log("New Photo added");
//         res.redirect('/');
//       })
//       .catch(err => {
//         console.log(err);
//       });
// };





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




// .find({ _id: new mongodb.ObjectId(userId) })