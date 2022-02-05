const getCoordsForAddress = (address) => {
  // you can setup google location api if you want
  // https://www.udemy.com/course/react-nodejs-express-mongodb-the-mern-fullstack-guide/learn/lecture/16833284#questions

  // dummy http request returns coordinate object
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        lat: 40,
        lng: -73,
      });
    }, 1000);
  });
};

module.exports = getCoordsForAddress;
