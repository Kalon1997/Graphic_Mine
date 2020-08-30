const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
  title: {
    type: String
  },
  desp: [{type: String}],
  price: {
    type: String
  },
  imageUrl: {
    type: String
  }
});

module.exports = mongoose.model('Photo', productSchema);



// const path = require('path');
// const mongodb = require('mongodb');
// const getDb = require('../util/database.js').getDb;

// const ObjectId = mongodb.ObjectId;

// class Photo {

// constructor(useridnumber, photodetails, photocolor, photourl)
// {
//   this.useridnumber = useridnumber;
//   // this.photodetails = photodetails;
//   this.photodetails = Array.from(photodetails);
//   this.photocolor = photocolor;
//   this.photourl = photourl;
// }

// save() {
//   const db = getDb();
//   return db
//     .collection('photos')
//     .insertOne(this)
//     .then(result => {
//       console.log(result);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }



// static fetchAll() {
//   const db = getDb();
//   return db
//     .collection('photos')
//     .find()
//     .toArray()
//     .then(pic => {
//       console.log(pic);
//       return pic;
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

// }

// module.exports = Photo;






































// this.photodetails = Array.from(photodetails);

// constructor(useridnumber, photodetails, photocolor, photourl)
// {
//   this.useridnumber = useridnumber;
//   this.photodetails = Array.from(photodetails);
//   this.photocolor = photocolor;
//   this.photourl = photourl;
// }

// save() {
//   const db = getDb();
//   return db
//     .collection('photos')
//     .insertOne(this)
//     .then(result => {
//       console.log(result);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }