const path = require('path');
const mongodb = require('mongodb');
const getDb = require('../util/database.js').getDb;

const ObjectId = mongodb.ObjectId;

class Product {

constructor(useridnumber, productname, productdetails, producturlimage)
{
  this.useridnumber = useridnumber;
  this.productname = productname;
  this.productdetails = productdetails;
  this.producturlimage = producturlimage;
}

save() {
  const db = getDb();
  return db
    .collection('products')
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
    .collection('products')
    .find()
    .toArray()
    .then(products => {
      console.log(products);
      return products;
    })
    .catch(err => {
      console.log(err);
    });
}

}

module.exports = Product;
