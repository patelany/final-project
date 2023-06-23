import { useNavigate } from "react-router-dom";
import Patient from "../models/Patient";
import "./PatientDetails.css";
import React from "react";
import Trial from "../models/Trial";

interface Props {
  patient: Patient;
  trials: Trial[];
}

const PatientDetails = ({ patient, trials }: Props) => {
  const navigate = useNavigate();
  console.log(trials);
  return (
    <tr>
      <td className="PatientDetails">
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
            <div key={item._id}>
              <p>
                {item.food_photo_url && (
                  <img
                    className="trialFoodPhoto"
                    src={item.food_photo_url}
                    alt="trial food photo"
                  />
                )}
                {item.trial_name}

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
              </p>
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
