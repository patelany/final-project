import axios from "axios";
import Trial from "../models/Trial";

const baseUrl: string = process.env.REACT_APP_API_URL || "";

//return one trial based on Trial object ID
export const getTrial = async (id: string): Promise<Trial> => {
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

export const patchTrialReaction = async (
  trialToUpdate: string,
  reactionID: string
): Promise<Trial> => {
  return (
    await axios.patch(
      `${baseUrl}/trial/${encodeURIComponent(
        trialToUpdate
      )}/reactionID/${encodeURIComponent(reactionID)}`
    )
  ).data;
};
export const patchTrialStatus = async (
  trialToUpdate: string,
  trial_pass: string
): Promise<Trial> => {
  return (
    await axios.patch(
      `${baseUrl}/trial/${encodeURIComponent(
        trialToUpdate
      )}/${encodeURIComponent(trial_pass)}`
    )
  ).data;
};

export const deleteOneTrial = (id: string): Promise<void | string> => {
  return axios.delete(`${baseUrl}/trials/${id}`).then((res) => res.data);
};
