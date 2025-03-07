import axios from "axios";

export const CreateTourFavourite = async (data) => {
  const response = await axios.post(
    "https://bookingtravel-44jm.onrender.com/TourFavourites/CreateTourFavourite",
    data,
    { withCredentials: true }
  );
  return response.data;
};
export const CancleTourFavourite = async (id) => {
  const response = await axios.post(
    `https://bookingtravel-44jm.onrender.com/TourFavourites/CancleTourFavourite/${id}`,
    {},
    { withCredentials: true }
  );
  return response.data;
};
export const GetToursFavourite = async () => {
  const response = await axios.get(
    `https://bookingtravel-44jm.onrender.com/TourFavourites/GetTourFavourite`,
    { withCredentials: true }
  );
  return response.data;
};
