import { createContext } from "react";
import Patient from "../models/Patient";

export interface PatientContextModel {
  patients: Patient[]; // null when not logged in
}

const defaultValue: PatientContextModel = {
  patients: [],
};

const PatientContext = createContext(defaultValue);
export default PatientContext;
