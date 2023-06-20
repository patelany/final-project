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
  return (
    <div className="PatientDetails">
      <li>
        {patient.patient_name}
        <button
          className="addTrialbutton"
          onClick={() => {
            // navigate(`/AddTrial/${patient._id}`);
            navigate(`/AddTrial/${encodeURIComponent(patient._id!)}`);
          }}
        >
          New Trial
        </button>
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
                {item.trial_name}

                <button
                  className="addReactionbutton"
                  onClick={() => {
                    navigate(`/AddReaction/${encodeURIComponent(item._id!)}`);
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
              </p>
            </div>
          ))}

        {/* // .sort((a, b) => { */}
        {/* //   if (a.start_date < b.start_date) { */}
        {/* //     return -1;
          //   }
          //   if (a.start_date > b.start_date) { */}
        {/* //     return 1;
          //   }
          //   return 0;
          // })} */}
      </li>
    </div>
  );
};

export default PatientDetails;
