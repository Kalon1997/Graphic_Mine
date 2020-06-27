const path = require('path');
const mongodb = require('mongodb');
const getDb = require('../util/database.js').getDb;

const ObjectId = mongodb.ObjectId;

class Photo {

constructor(useridnumber, phototitle, photocolor, photourl)
{
  this.useridnumber = useridnumber;
  this.phototitle = phototitle;
  this.photocolor = "photocolor";
  this.photourl = "photourl";
}

save() {
  const db = getDb();
  return db
    .collection('photos')
    .insertOne(this)
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
}



static fetchAll() {
  const db = getDb();
  return db
    .collection('photos')
    .find()
    .toArray()
    .then(pic => {
      console.log(pic);
      return pic;
    })
    .catch(err => {
      console.log(err);
    });
}

}

module.exports = Photo;
