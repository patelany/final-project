import { Link, useNavigate, useParams } from "react-router-dom";
import "./ViewTrial.css";
import { FormEvent, useContext, useEffect, useState } from "react";
import { getTrial, patchTrialStatus } from "../services/trialApiService";
import Trial from "../models/Trial";
import AuthContext from "../context/AuthContext";
import { getReaction } from "../services/reactionApiService";
import Reaction from "../models/Reaction";
import dateFormat from "../utils/helperFunctions";
import Email from "./Email";

const ViewTrial = () => {
  const navigate = useNavigate();
  const [oneTrial, setOneTrial] = useState<Trial | null>(null);
  const trialIdFromPathParam: string | undefined = useParams().id;
  const { user } = useContext(AuthContext);
  const [allReactions, setReactions] = useState<Reaction[]>([]);
  const [passFail, setPassFail] = useState("in process");
  const [emailForm, setEmailForm] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/Login");
    } else {
      getTrial(trialIdFromPathParam!).then((response) => {
        setOneTrial(response);
      });
      //pull from the database all reactions for a given trial
      getReaction(trialIdFromPathParam!).then((resReactions) => {
        setReactions(resReactions);
      });
    }
  }, []);
  useEffect(() => {
    patchTrialStatus(trialIdFromPathParam!, passFail).then((response) => {});
  }, [passFail]);

  const submitHandler = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
  };

  return (
    <div>
      <form className="ViewTrialForm" onSubmit={submitHandler}>
        <table className="TrialDetails">
          <thead>
            <tr>
              <th>
                <h1>Trial Details: {oneTrial && oneTrial.trial_name} </h1>
                <label htmlFor="passFail">Trial Status:</label>
                <select
                  name="passFail"
                  id="passFail"
                  value={passFail}
                  onChange={(e) => setPassFail(e.target.value)}
                >
                  <option value="in process">In Process</option>
                  <option value="pass">Pass</option>
                  <option value="fail">Fail</option>
                </select>

                {/* <button
                  onClick={() => {
                    setEmailForm(true);
                  }}
                >
                  Save Status
                </button> */}
                <h2>Trial Type : {oneTrial && oneTrial.trial_type} </h2>
                <h2>Food Type: {oneTrial && oneTrial.food_type} </h2>
                <h2>Specific Food Given: {oneTrial && oneTrial.trial_food} </h2>
                <h2>
                  Trial Start Date:
                  {oneTrial && dateFormat(oneTrial.start_date.toString())}
                </h2>

                {oneTrial && oneTrial.food_photo_url && (
                  <img
                    height="50px"
                    src={oneTrial.food_photo_url}
                    alt="reaction photo"
                  />
                )}
              </th>
            </tr>
          </thead>

          {allReactions.map((item, index) => (
            <tr className="trReactions" key={item._id}>
              <td>
                <p>Reaction Number: {index + 1}</p>
                {item.symptom_photo_url && (
                  <img
                    className="symptomPhoto"
                    //height="25px"
                    src={item.symptom_photo_url}
                    alt="reaction photo"
                  />
                )}
                <p>Area of the body: {item.specific_body_location_desc}</p>
                <p>Symptom: {item.symptom_desc}</p>
                <p>
                  Date/Time Observed:{" "}
                  {dateFormat(item.date_time_observed.toString())}
                </p>
              </td>
            </tr>
          ))}
        </table>

        {/* <h1>Trial Details: {oneTrial && oneTrial.food_photo_url} </h1> */}
      </form>
      <button
        onClick={() => {
          setEmailForm(true);
        }}
      >
        Email To Doctor
      </button>
      <button
        className="finished"
        onClick={() => {
          navigate("/");
        }}
      >
        Back to Home
      </button>
      {emailForm && <Email trial={oneTrial} reactions={allReactions} />}
    </div>
  );
};

export default ViewTrial;
