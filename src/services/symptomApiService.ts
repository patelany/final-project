import axios from "axios";
import BodyLocationResponse from "../models/BodyLocationResponse";
import CryptoJS from "crypto-js";

//const token: string = process.env.REACT_APP_TOKEN || "";
let newToken: string = "";
export const getToken = () => {
  let authuri = "https://authservice.priaid.ch/",
    serviceuri = "https://authservice.priaid.ch/",
    api_key = "Hb4o7_GMAIL_COM_AUT",
    secret_key = "w2ZQy67XcNb3n5S4P",
    computedHash = CryptoJS.HmacMD5(authuri + "login", secret_key),
    computedHashString = computedHash.toString(CryptoJS.enc.Base64),
    authorization = `Bearer ${api_key}:${computedHashString}`,
    loginRequest = axios.create({
      baseURL: authuri,
      timeout: 5000,
      headers: { Authorization: authorization },
    });
  console.log("Authenticating with ApiMedic...");
  return loginRequest
    .post("login")
    .then((response) => response.data.Token)
    .then((token) => {
      console.log(token);
      newToken = token;
      console.log("Token retrieved.");
      // create the apiRequest endpoint with the token
      return axios.create({
        baseURL: serviceuri,
        timeout: 5000,
        params: { token, format: "json", language: "en-gb" },
      });
    });
};

export const getBodyLocations = (): Promise<BodyLocationResponse[]> => {
  return getToken().then(() => {
    return axios
      .get("https://healthservice.priaid.ch/body/locations", {
        params: {
          token: newToken,
          format: "json",
          language: "en-gb",
        },
      })
      .then((res) => {
        return res.data; // .data is specific to axios (returns JSON response)
      });
  });
};

export const getSpecificBodyLocations = (location: string): Promise<any> => {
  return getToken().then(() => {
    return axios
      .get(`https://healthservice.priaid.ch/body/locations/${location}`, {
        params: {
          token: newToken,
          format: "json",
          language: "en-gb",
        },
      })
      .then((res) => {
        return res.data; // .data is specific to axios (returns JSON response)
      });
  });
};

export const getSymptomsForBodyArea = (
  location: string,
  gender: string
): Promise<any> => {
  return getToken().then(() => {
    return axios
      .get(`https://healthservice.priaid.ch/symptoms/${location}/${gender}`, {
        params: {
          token: newToken,
          format: "json",
          language: "en-gb",
        },
      })
      .then((res) => {
        return res.data;
      });
  });
};
