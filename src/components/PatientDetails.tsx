import { useNavigate } from "react-router-dom";
import Patient from "../models/Patient";
import "./PatientDetails.css";
import React, { useContext, useEffect, useState } from "react";
import Trial from "../models/Trial";
import {
  deleteOneTrial,
  getTrialByGuardian,
} from "../services/trialApiService";
import AuthContext from "../context/AuthContext";
import { deleteOneChild } from "../services/patientApiService";

interface Props {
  patient: Patient;
  trials: Trial[];
  update: () => void;
  updatePatient: () => void;
}

const PatientDetails = ({ patient, trials, update, updatePatient }: Props) => {
  const { user } = useContext(AuthContext);
  const deleteHandler = (id: string): void => {
    deleteOneTrial(id).then((res) => {
      console.log(res);
      update();
    });
  };

  const deleteHandlerChild = (id: string): void => {
    deleteOneChild(id).then((res) => {
      console.log(res);
      updatePatient();
    });
  };
  const navigate = useNavigate();
  console.log(trials);
  // const [makeUpAChange, setChange] = useState(false);
  // useEffect(() => {
  //   getTrialByGuardian(user?.uid!).then((response) => {
  //     trials = response;
  //     console.log(trials);
  //   });
  // }, [makeUpAChange]);

  return (
    <tr>
      <td className="PatientDetails">
        <img className="patientPhoto" src={patient.photo_url} />
        <p></p>
        {patient.patient_name}
        <p>
          <button
            className="addTrialbutton"
            onClick={() => {
              // navigate(`/AddTrial/${patient._id}`);
              navigate(`/AddTrial/${encodeURIComponent(patient._id!)}`);
            }}
          >
            New Trial
          </button>
        </p>
        <button
          className="deleteChildButton"
          onClick={
            () => {
              alert("Are you sure?");
              deleteHandlerChild(patient._id!);
            }
            // setChange((prev) => !prev);
          }
        >
          Delete
        </button>
      </td>
      <td>
        {trials
          .filter((item) => {
            // return filterFavs ? item.isFavorite : item;
            if (item.patient_id === patient._id) {
              return item.trial_name;
            }
          })
          .map((item) => (
            <div className="trialRow" key={item._id}>
              {item.food_photo_url && (
                <img
                  className="trialFoodPhoto"
                  src={item.food_photo_url}
                  alt="trial food photo"
                />
              )}
              <div className="trialInfo">
                <div className="trialNameInfo">
                  {item.trial_name} Trial <p></p>
                </div>
                <div className="trialStatusInfo">
                  Status:<p></p>
                  {item.trial_pass}
                </div>
              </div>
              <button
                className="addReactionbutton"
                onClick={() => {
                  navigate(
                    `/AddReaction/${encodeURIComponent(item._id!)}/${
                      patient.gender
                    }`
                  );
                }}
              >
                Add Reaction
              </button>
              <button
                className="viewTrialbutton"
                onClick={() => {
                  navigate(`/ViewTrial/${encodeURIComponent(item._id!)}`);
                }}
              >
                View Trial
              </button>
              <button
                className="deleteTrialButton"
                onClick={
                  () => {
                    alert("Are you sure?");
                    deleteHandler(item._id!);
                  }
                  // setChange((prev) => !prev);
                }
              >
                Delete
              </button>
            </div>
          ))}
      </td>
      {/* // .sort((a, b) => { */}
      {/* //   if (a.start_date < b.start_date) { */}
      {/* //     return -1;
          //   }
          //   if (a.start_date > b.start_date) { */}
      {/* //     return 1;
          //   }
          //   return 0;
          // })} */}
    </tr>
  );
};

export default PatientDetails;
