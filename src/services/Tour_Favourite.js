import axios from "axios";

export const CreateTourFavourite = async (data) => {
  const response = await axios.post(
    "http://localhost:3001/TourFavourites/CreateTourFavourite",
    data,
    { withCredentials: true }
  );
  return response.data;
};
export const CancleTourFavourite = async (id) => {
  const response = await axios.post(
    `http://localhost:3001/TourFavourites/CancleTourFavourite/${id}`,
    {},
    { withCredentials: true }
  );
  return response.data;
};
export const GetToursFavourite = async () => {
  const response = await axios.get(
    `http://localhost:3001/TourFavourites/GetTourFavourite`,
    { withCredentials: true }
  );
  return response.data;
};
