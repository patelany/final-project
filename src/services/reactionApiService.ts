import axios from "axios";
import Reaction from "../models/Reaction";

const baseUrl: string = process.env.REACT_APP_API_URL || "";

export const addReaction = async (newReaction: Reaction): Promise<Reaction> => {
  console.log("got to frontend api");
  return (await axios.post(`${baseUrl}/addReaction`, newReaction)).data;
};

export const getReaction = async (TrialId: string): Promise<Reaction[]> => {
  return (
    await axios.get(`${baseUrl}/reactions/${encodeURIComponent(TrialId)}`)
  ).data;
};
