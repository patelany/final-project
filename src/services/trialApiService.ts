import axios from "axios";
import Trial from "../models/Trial";

const baseUrl: string = process.env.REACT_APP_API_URL || "";

export const getTrial = async (id: string): Promise<Trial[]> => {
  return (await axios.get(`${baseUrl}/trials/${encodeURIComponent(id)}`)).data;
};
export const getAllTrials = async (): Promise<Trial[]> => {
  return (await axios.get(`${baseUrl}/allTrials/`)).data;
};

export const addTrial = async (newTrial: Trial): Promise<Trial> => {
  return (await axios.post(`${baseUrl}/addTrial`, newTrial)).data;
};

export const getTrialByGuardian = async (id: string): Promise<Trial[]> => {
  return (
    await axios.get(`${baseUrl}/allTrials/trials/${encodeURIComponent(id)}`)
  ).data;
};
