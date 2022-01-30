const HttpError = require("../models/http-error");
const { v4: uuid } = require("uuid");

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky",
    location: {
      lat: 40,
      lng: -73,
    },
    address: "dummy address",
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous sky",
    location: {
      lat: 40,
      lng: -73,
    },
    address: "dummy address",
    creator: "u1",
  },
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => p.id === placeId);

  if (!place) {
    // this throw error approach works only if sync process
    throw new HttpError("Could not find a place for the provided id.", 404);
  }

  res.json({ place });
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter((p) => p.creator === userId);

  if (!places || places.length === 0) {
    // this next approach works fine with async code
    return next(
      new HttpError("Could not find a place for the provided user id.", 404)
    );
  }

  res.json({ places });
};

const createPlace = (req, res, next) => {
  const { title, description, coodinates, address, creator } = req.body;
  const createdPlace = {
    id: uuid(),
    title,
    description,
    location: coodinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  res.status(200).json({ message: "Deleted place." });
};

// multiple item export syntax
exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;