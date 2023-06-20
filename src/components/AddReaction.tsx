import { FormEvent, useEffect, useState } from "react";
import "./AddReaction.css";
import { useParams } from "react-router-dom";
import { getTrial, patchTrialReaction } from "../services/trialApiService";
import Trial from "../models/Trial";
import Reaction from "../models/Reaction";
import { addReaction, getReaction } from "../services/reactionApiService";
import { useNavigate } from "react-router-dom";
import dateFormat from "../utils/helperFunctions";

const AddReaction = () => {
  const navigate = useNavigate();

  const [areaOfBody, setAreaOfBody] = useState("Torso");
  const [oneTrial, setOneTrial] = useState<Trial | null>(null);
  const [symptom, setSymptom] = useState("Rash");
  const [observedTime, setObservedTime] = useState("");
  const [makeUpAChange, setChange] = useState(false);

  const [allReactions, setReactions] = useState<Reaction[]>([]);
  const trialId: string = useParams().id!;

  useEffect(() => {
    if (trialId) {
      getTrial(trialId).then((response) => {
        setOneTrial(response);
      });

      //pull from the database all reactions for a given trial
      getReaction(trialId).then((resReactions) => {
        setReactions(resReactions);
      });
    }
  }, [trialId, makeUpAChange]);

  console.log(allReactions);

  const submitHandler = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    console.log("add reaction", observedTime);
    //console.log(new Date());

    const newReaction: Reaction = {
      trial_id: trialId,
      body_area: areaOfBody,
      symptom: symptom,
      date_time_observed: new Date(observedTime),
      //display_date: dateFormat(observedTime),
    };
    const databaseReaction = await addReaction(newReaction); //create reaction in mongo
    //get reaction's object ID from mongo

    //associate reaction with trial
    if (databaseReaction && oneTrial) {
      const updatedTrial = await patchTrialReaction(
        oneTrial._id!,
        databaseReaction._id!
      );
      console.log(updatedTrial);
    }
    setChange((prev) => !prev); //set opposite of previous
  };

  return (
    <div>
      <form className="AddReactionForm" onSubmit={submitHandler}>
        <p>Trial: {oneTrial && oneTrial.trial_name} </p>
        <p>New Reaction:</p>
        <label htmlFor="areaOfBody">Area of the body:</label>
        <select
          name="areaOfBody"
          id="areaOfBody"
          onChange={(e) => setAreaOfBody(e.target.value)}
          value={areaOfBody}
        >
          <option value="Torso">Torso</option>
          <option value="Mouth">Mouth</option>
          <option value="Neck">Neck</option>
        </select>
        <label htmlFor="symptom">Symptom:</label>
        <select
          name="symptom"
          id="symptom"
          onChange={(e) => setSymptom(e.target.value)}
          value={symptom}
        >
          <option value="Rash">Rash</option>
          <option value="Swelling">Swelling</option>
          <option value="Pain">Pain</option>
        </select>
        <p>
          <label htmlFor="observedTime">Date/Time Observed:</label>
          <input
            required
            type="datetime-local"
            name="observedTime"
            id="observedTime"
            onChange={(e) => setObservedTime(e.target.value)}
            value={observedTime}
          />
        </p>
        <p>
          <button>Upload Photo</button>
        </p>
        <p>
          <button>Save</button>
        </p>
      </form>
      <button
        className="finishedReactions"
        onClick={() => {
          navigate("/");
        }}
      >
        Finished
      </button>
      <hr></hr>
      <p>Reactions:</p>

      {allReactions.map((item, index) => (
        <div key={item._id}>
          <p>Reaction Number: {index + 1}</p>
          <p>Area of the body: {item.body_area}</p>
          <p>Symptom: {item.symptom}</p>
          <p>Date Observed: {dateFormat(item.date_time_observed.toString())}</p>
          {/*<p>Time Observed: {item.date_time_observed.toLocaleTimeString()}</p>*/}
          <hr></hr>
        </div>
      ))}
    </div>
  );
};

export default AddReaction;
