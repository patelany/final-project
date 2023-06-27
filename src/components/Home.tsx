import "./Home.css";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { signOut } from "../firebaseConfig";
import {
  getPatient,
  getPatientByGuardian,
} from "../services/patientApiService";
import Patient from "../models/Patient";
import PatientDetails from "../components/PatientDetails";
import Trial from "../models/Trial";
import {
  getAllTrials,
  getTrial,
  getTrialByGuardian,
} from "../services/trialApiService";

const Home = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const navigate = useNavigate();
  const [patients, setAllPatients] = useState<Patient[]>([]);
  const [trials, setAllTrials] = useState<Trial[]>([]);
  const nameFromPathParam: string | undefined = useParams().name;
  // console.log(nameFromPathParam);

  useEffect(() => {
    if (!user) {
      navigate("/Login");
    } else {
      getPatientByGuardian(user.uid!).then((response) => {
        console.log("allPatients", response, user.uid);
        setAllPatients(response);
      });
      console.log(patients);
      getTrialByGuardian(user.uid!).then((response) => {
        setAllTrials(response);
      });
    }
  }, [user]);

  const update = () => {
    getTrialByGuardian(user?.uid!).then((response) => {
      setAllTrials(response);
    });
  };

  const updatePatient = () => {
    getPatientByGuardian(user?.uid!).then((response) => {
      setAllPatients(response);
    });
  };

  return (
    <main className="Home">
      <div className="loggedIn">
        <p>Welcome To Factt: {user?.displayName}</p>

        <button
          className="signOut"
          onClick={() => {
            signOut();
          }}
        >
          Sign Out
        </button>
      </div>

      {patients.length > 0 && (
        <div className="tableDiv">
          <table className="fullPatientList">
            <thead>
              <tr>
                <th>Name (Nickname)</th>

                <th>Existing Trials</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((item) => (
                <PatientDetails
                  patient={item}
                  key={item._id}
                  trials={trials}
                  update={update}
                  updatePatient={updatePatient}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button
        className="addChildbutton"
        onClick={() => {
          navigate("/AddChild");
        }}
      >
        Add A Child
      </button>
    </main>
  );
};

export default Home;
