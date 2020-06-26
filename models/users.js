const mongodb = require('mongodb');
const getDb = require('../util/database.js').getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, password, fname, lname, aboutme, skills, imgurl) {
    this.username = username;
    this.password = password;
    this.fname = fname;
    this.lname = lname;
    this.aboutme = aboutme;
    this.skills = skills;
    this.imgurl = imgurl;
  }

  save() {
    const db = getDb();
    return db
      .collection('users')
      .insertOne(this)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }



 // static findUsername(username)
 // {
 //   const db = getDb();
 //   return db
 //    .collection('users')
 //    .findOne(this)
 //    .then(result => {
 //      if(result)
 //      {
 //        console.log("exists already");
 //      }
 //    })
 //    .catch(err => {
 //      console.log(err);
 //    });
 // }


  static findById(userId) {
    const db = getDb();
    return db
      .collection('users')
      .find({ _id: new mongodb.ObjectId(userId) })
      .next()
      .then(product => {
        console.log(product);
        return product;
      })
      .catch(err => {
        console.log(err);
      });
  }

static endIt()
{
  const db = getDb();
  return db
    .collection('sessions')
    .next()
    .then(sess => {
      console.log(sess);
      Session.endSession();
      //return sess;
    })
    .catch(err => {
      console.log(err);
    });
}


}
module.exports = User;
