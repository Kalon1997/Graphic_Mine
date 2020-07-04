const User = require('../models/users');
const Session = require('../app.js');

const mongodb = require('mongodb');
const getDb = require('../util/database.js').getDb;
const bcrypt = require('bcryptjs');

const ObjectId = mongodb.ObjectId;




exports.getHome = (req, res, next) => {
  const db = getDb();
  res.render('home.ejs', {
    pageTitle: 'Home - Project_Platform',
    currUserId: req.session.currUserId,
    isAuthed: req.session.isLoggedin,
    csrfToken: req.csrfToken()
  });
};

exports.getLogin = (req, res, next) => {
  console.log(req.session.isLoggedin);
  res.render('login.ejs', {
    pageTitle: 'Login - Project_Platform',
    isAuthed: false
  });
};



exports.getSignup = (req, res, next) => {
  res.render('signup.ejs', {
    pageTitle: 'Signup - Project_Platform',
    isAuthed: req.session.isLoggedin
  });
};



exports.postLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  //const newPwd = bcrypt.hash(password);
  const db = getDb();
    return db
      .collection('users')
      .findOne({username: username})
      .then((existingUser) => {
        if(existingUser)
        {
          bcrypt.compare(password, existingUser.password)
            .then((doMatch) => {
              if(doMatch)
              {
                req.session.isLoggedin = true;
                req.session.currUserId = existingUser._id;
                res.redirect('/');
              }
              else
              {
                res.redirect('/login');
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
        else
        {
          res.redirect('/signup');
        }
      })
      .catch(err => {
        console.log(err);
      });
  // req.session.isLoggedin = true;
  // res.redirect('/');
};

exports.postSignup = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const fname = req.body.fname;
  const lname = req.body.lname;
  var aboutme = 'crap';
  var skills = 'crap';
  var imgurl = 'images/dp.png';
  const db = getDb();
    return db
    .collection('users')
    .findOne({ username: username })
    .then(userDoc => {
      if (userDoc) {
         res.redirect('/signup');
      }
      else
      {
        bcrypt
          .hash(password, 12)
          .then(hashedPassword => {
            const user = new User(username, hashedPassword, fname, lname, aboutme, skills, imgurl);
             user.save();
          })
          .then(result => {
            res.redirect('/login');
          });
      }

    })
    .catch(err => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
};

exports.getMe = (req, res, next) => {
  const userId1 = req.params.userId;
  const userId2 = req.session.currUserId;
  const db = getDb();
    return db
      .collection('users')
      .findOne({_id: userId2})
      .then(currentUser => {
          res.render('me.ejs', {
          pageTitle: 'Me - Project_Platform',
          currentUserName: currentUser.username,
          isAuthed: req.session.isLoggedin
        });
      })
      .catch( err => {
        console.log(err);
      });
};









exports.getEditProfile = (req, res, next) => {
  const currentUserId = req.session.currUserId;
  const db = getDb();
  return db
    .collection('users')
    .findOne({_id: currentUserId})
    .then(currentUser => {
      res.render('editProfile.ejs', {
        pageTitle: 'Edit Profile - Project_Platform',
        currentUserName: currentUser.username,
        isAuthed: req.session.isLoggedin
      });
    })

};


exports.postEditProfile = (req, res, next) => {
  const currUserId = req.session.currUserId;
  const aboutme = req.body.aboutme;
  const skills = req.body.skills;
  const dp = req.file;
  const imgurl = dp.path;
  const db = getDb();
   return db
     .collection('users')
     .updateOne(
   { _id: currUserId },   // Query parameter
    {$set: {imgurl: imgurl}},
   { upsert: true }    // Options
)
     .then(result => {
       req.session.isLoggedin = true;
       console.log(result);
       res.redirect('/');
     })
     .catch(err => {
       console.log(err);
     });
}


// .updateOne(
// { _id: currUserId },   // Query parameter
// {$set: {aboutme: aboutme}},
// { upsert: true }    // Options
// )

// exports.showDetails = (req, res, next) => {
//   const prodId = req.params.productId;
//   Product.findById(prodId)
//     .then(product => {
//       res.render('user/productDetails', {
//         product: product,
//         pageTitle: product.title,
//       });
//     })
//     .catch(err => console.log(err));
// };
// =================================================================================44


// exports.postLogin = (req, res, next) => {  //copy pasted from course but not working
//   const username = req.body.username;
//   const password = req.body.password;
//   const db = getDb();
//     return db
//     .collection('users')
//     .findOne({ username: username })
//     .then(user => {
//       if (!user) {
//         res.redirect('/login');
//       }
//       bcrypt
//         .compare(password, user.password)
//         .then(doMatch => {
//           if (doMatch) {
//             req.session.isLoggedIn = true;
//             req.session.user = user;
//               req.session.save(err => {
//               console.log(err);
//               res.redirect('/');
//             });
//           }
//           res.redirect('/login');
//         })
//         .catch(err => {
//           console.log(err);
//           res.redirect('/login');
//         });
//     })
//     .catch(err => console.log(err));
// };



//
//
// exports.postLogin = (req, res, next) => {   //compare problem and error new
//   const username = req.body.username;
//   const password = req.body.password;
//   const db = getDb();
//   return db
//     .collection('users')
//     .findOne({ username: username })
//     .then(user => {
//       if (!user) {
//         res.redirect('/login');
//       }
//       bcrypt
//         .compare(password, user.password)
//         .then(doMatch => {
//           if (doMatch) {
//             req.session.isLoggedIn = true;
//             req.session.user = user;
//             // req.session.isLoggedin = true;
//             // res.redirect('/');
//             req.session.save(err => {
//               console.log(err);
//               res.redirect('/');
//             });
//           }
//           res.redirect('/login');
//         })
//         // .catch(err => {
//         //   console.log(err);
//         //   res.redirect('/login');
//         // });
//     })  //then
//     .catch(err => {
//       console.log(err)
//     });
// };
//




// exports.postSignup = (req, res, next) => {     // very very wrong ...brackets
//   const username = req.body.username;
//   const password = req.body.password;
//   // const confirmPassword = req.body.confirmPassword;
//   const db = getDb();
//   return db
//     .collection('users')
//     .findOne({ username: username })
//     .then(userDoc => {
//       if (userDoc) {
//        res.redirect('/signup');
//       }
//       else{
//          bcrypt
//         .hash(password, 12)
//         .then(hashedPassword => {
//           const user = new User(username, hashedPassword);
//           user.save();
//             res.redirect('/login');
//           });
//       }
//     })  //then
//     .catch(err => {
//       console.log(err);
//     });
// };





// =================================================================================





//
// exports.postsig = (req, res, next) => {
//   const username = req.body.username;
//   const password = req.body.password;
//
//   const newPwd = bcrypt.hash(password, 12);
//   const user = new User(username, newPwd);
//   // const confirmPassword = req.body.confirmPassword;
//   const db = getDb();
//   return db
//     .collection('users')
//     .findOne({username: username})
//       .then((userDoc) => {
//           console.log(userDoc);
//           if (userDoc) {
//              res.redirect("/signup");
//           }
//           else{
//             user.save();
//             res.redirect("/login");
//           }
//       })
//      .catch((err) => console.log(err));
//   };


//
// exports.postLogin = (req, res, next) => {
//   const username = req.body.username;
//   const password = req.body.password;
//   //const newPwd = bcrypt.hash(password);
//   const db = getDb();
//     return db
//       .collection('users')
//       .findOne({username: username})
//       .then((existingUser) => {
//         if(existingUser)
//         {
//           bcrypt.compare(newPwd, existingUser.password)
//             .then((doMatch) => {
//               if(doMatch)
//               {
//                 req.session.isLoggedin = true;
//                 res.redirect('/');
//               }
//               else
//               {
//                 res.redirect('/login');
//               }
//             })
//             .catch(err => {
//               console.log(err);
//             });
//         }
//         else
//         {
//           res.redirect('/signup');
//         }
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   // req.session.isLoggedin = true;
//   // res.redirect('/');
// };


// exports.postLogin = (req, res, next) => {
//   req.session.isLoggedin = true;
//   res.redirect('/');
// };





  // MongoStore.session.destroy();

  // const ses = new Session(username, passcode);
  // usr
  //   .endIt()
  //   .then(result => {
  //     // console.log(result);
  //     console.log('deleted user');
  //     res.redirect('/');
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });

  // req.session.destroy( err => {
  //  req.session = null;
  //  console.log(err);
  //  res.redirect('/');
  // });
  // MongoStore.destroy(sid, callback)




// exports.getMe = (req, res, next) => {
//   const userId = req.params.userId;
//   User.findById(userId)
//     .then(user => {
//       res.render('me.ejs', {
//         // user: user,
//         pageTitle: user.username
//       });
//     })
//     .catch(err => console.log(err));
// };


// exports.postsig = (req, res, next) => {
//   const username = req.body.username;
//   // const password = req.body.password;
//   User.findOne({username: username})
//   .then(u => {
//     if(u)
//       res.redirect('/');
//       next();
//       return res.redirect('/login');
//       // const usr = new User(username, password);
//       //   usr.save();
//
//   }).catch(err => {
//     console.log(err);
//   });
// };
