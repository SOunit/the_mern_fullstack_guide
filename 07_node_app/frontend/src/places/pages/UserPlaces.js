import React from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "title1",
    description: "description1",
    imageUrl:
      "https://images.unsplash.com/photo-1642414200199-42728a33bf12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    address: "350 W Georgia St, Vancouver, BC",
    location: { lat: 49.2786062, lng: -123.0999113 },
    creator: "u1",
  },
  {
    id: "p2",
    title: "title2",
    description: "description2",
    imageUrl:
      "https://images.unsplash.com/photo-1642414200199-42728a33bf12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    address: "350 W Georgia St, Vancouver, BC",
    coodinates: { lat: 49.2786062, lng: -123.0999113 },
    creator: "u2",
  },
];

const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);

  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
