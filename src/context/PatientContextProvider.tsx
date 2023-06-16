import { ReactNode, useContext, useEffect, useState } from "react";
import Patient from "../models/Patient";
import PatientContext from "./PatientContext";
import { getPatientByGuardian } from "../services/patientApiService";
import AuthContext from "../context/AuthContext";

function PatientContextProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const { user } = useContext(AuthContext);

  const updatePatients = (): void => {
    if (user) {
      //call api, set shoutouts
      getPatientByGuardian(user!.uid).then((res) => {
        //.then is for async could also do const res = await
        setPatients(res);
      });
    }
  };

  useEffect(() => {
    updatePatients();
  }, [user]);

  return (
    <PatientContext.Provider value={{ patients }}>
      {children}
    </PatientContext.Provider>
  );
}
export default PatientContextProvider;
