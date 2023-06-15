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

const Home = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const navigate = useNavigate();
  const [patients, setAllPatients] = useState<Patient[]>([]);
  const nameFromPathParam: string | undefined = useParams().name;
  // console.log(nameFromPathParam);

  // const update = async (): Promise<void> => {
  //   if (nameFromPathParam) {
  //     // we're at /user/:name
  //     const res = await getAllTrials(nameFromPathParam);
  //     console.log(res);
  //     setTrialsToPatient(res);
  //   } else {

  //       setTimeout(() => {
  //         if (!user) {
  //           navigate("/");
  //         }
  //       }, 1000);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   // call a fn that get all so's to a particular person
  //   update();
  // }, [nameFromPathParam, user]);
  useEffect(() => {
    if (!user) {
      navigate("/Login");
    } else {
      getPatientByGuardian(user.uid!).then((response) => {
        console.log("allPatients", response, user.uid);
        setAllPatients(response);
      });
    }
  }, [user]);

  return (
    <main className="Home">
      <div className="loggedIn">
        <p>Welcome To Factt: {user?.displayName}</p>

        {/* <img
          className="profileImage"
          src={user?.photoURL || ""}
          alt="profile"
        /> */}

        <button
          className="signOut"
          onClick={() => {
            signOut();
          }}
        >
          Sign Out
        </button>
      </div>

      <button
        className="addChildbutton"
        onClick={() => {
          navigate("/AddChild");
        }}
      >
        Add A Child
      </button>
      <button
        className="addTrialbutton"
        onClick={() => {
          navigate("/AddTrial");
        }}
      >
        New Trial
      </button>
      <button
        className="addReactionbutton"
        onClick={() => {
          navigate("/AddReaction");
        }}
      >
        Add Reaction
      </button>

      <button
        className="viewTrialbutton"
        onClick={() => {
          navigate("/");
        }}
      >
        View Trial
      </button>
    </main>
  );
};

export default Home;
