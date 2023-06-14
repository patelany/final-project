import axios from "axios";
import Patient from "../models/Patient";

const baseUrl: string = process.env.REACT_APP_API_URL || "";

export const addPatient = async (newPatient: Patient): Promise<Patient> => {
  return (await axios.post(`${baseUrl}/patient`, newPatient)).data;
};
