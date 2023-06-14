import axios from "axios";
import Trial from "../models/Trial";

const baseUrl: string = process.env.REACT_APP_API_URL || "";

export const addTrial = async (newTrial: Trial): Promise<Trial> => {
  return (await axios.post(`${baseUrl}/trial`, newTrial)).data;
};
