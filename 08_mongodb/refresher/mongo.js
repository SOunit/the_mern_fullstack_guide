const MongoClient = require('mongodb').MongoClient;

// come from mongodb atlas
const url =
  'mongodb+srv://test_user_33333:89gns4KlC9cDnWOX@cluster0.r27pb.mongodb.net/products_test?retryWrites=true&w=majority';

const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };

  // set url
  const client = new MongoClient(url);

  try {
    // create connection to db
    await client.connect();
    const db = client.db();
    const result = db.collection('products').insertOne(newProduct);
  } catch (err) {
    // return to stop code running here!
    return res.json({ message: 'Could not store data.' });
  }
};

const getProducts = async (req, res, next) => {};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
