const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
let _db;

const mongoConnect = callback => {
  mongoClient.connect('mongodb+srv://kalon123:kalon123@cluster0-t0gzi.mongodb.net/GraphicMine?retryWrites=true&w=majority')
  .then(client => {
     console.log('Connected!');
     _db = client.db();
     callback();
   })
   .catch(err => {
     console.log(err);
     throw err;
   });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};
// module.exports = mongoConnect;

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
