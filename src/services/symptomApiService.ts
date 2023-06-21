import axios from "axios";
import BodyLocationResponse from "../models/BodyLocationResponse";

const token: string = process.env.REACT_APP_TOKEN || "";

export const getBodyLocations = (): Promise<BodyLocationResponse[]> => {
  return axios
    .get("https://healthservice.priaid.ch/body/locations", {
      params: {
        token: token,
        format: "json",
        language: "en-gb",
      },
    })
    .then((res) => {
      return res.data; // .data is specific to axios (returns JSON response)
    });
};

export const getSpecificBodyLocations = (location: string): Promise<any> => {
  return axios
    .get(`https://healthservice.priaid.ch/body/locations/${location}`, {
      params: {
        token: token,
        format: "json",
        language: "en-gb",
      },
    })
    .then((res) => {
      return res.data; // .data is specific to axios (returns JSON response)
    });
};

export const getSymptomsForBodyArea = (
  location: string,
  gender: string
): Promise<any> => {
  return axios
    .get(`https://healthservice.priaid.ch/symptoms/${location}/${gender}`, {
      params: {
        token: token,
        format: "json",
        language: "en-gb",
      },
    })
    .then((res) => {
      return res.data;
    });
};
