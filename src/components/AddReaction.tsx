import { FormEvent, useEffect, useRef, useState } from "react";
import "./AddReaction.css";
import { useParams } from "react-router-dom";
import { getTrial, patchTrialReaction } from "../services/trialApiService";
import Trial from "../models/Trial";
import Reaction from "../models/Reaction";
import { addReaction, getReaction } from "../services/reactionApiService";
import { useNavigate } from "react-router-dom";
import dateFormat from "../utils/helperFunctions";
import { storage } from "../firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  getBodyLocations,
  getSpecificBodyLocations,
  getSymptomsForBodyArea,
} from "../services/symptomApiService";
import BodyLocationResponse from "../models/BodyLocationResponse";
import SpecificBodyLocationResponse from "../models/SpecificBodyLocationResponse";

const AddReaction = () => {
  const navigate = useNavigate();

  const [bodyLocations, setBodyLocations] = useState<BodyLocationResponse[]>(
    []
  );
  const [specificBodyLocations, setSpecificBodyLocations] = useState<
    SpecificBodyLocationResponse[]
  >([]);
  const [pickedSpecificBodyLocations, setPickedSpecificBodyLocations] =
    useState("");
  const [pickedBodyLocations, setPickedBodyLocations] = useState("");
  const [oneTrial, setOneTrial] = useState<Trial | null>(null);
  const [symptom, setSymptom] = useState("Rash");
  const [observedTime, setObservedTime] = useState("");
  const [makeUpAChange, setChange] = useState(false);
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const [allReactions, setReactions] = useState<Reaction[]>([]);
  const trialId: string = useParams().id!;
  const gender: string = useParams().gender!;

  useEffect(() => {
    if (trialId) {
      getTrial(trialId).then((response) => {
        setOneTrial(response);
      });

      //pull from the database all reactions for a given trial
      getReaction(trialId).then((resReactions) => {
        setReactions(resReactions);
      });

      getBodyLocations().then((resBodyLocation) => {
        console.log(resBodyLocation);
        setBodyLocations(resBodyLocation);
        setPickedBodyLocations(resBodyLocation[0].ID);
      });
      getSpecificBodyLocations(pickedBodyLocations).then(
        (resSpecificBodyLocation) => {
          console.log(resSpecificBodyLocation);
          setSpecificBodyLocations(resSpecificBodyLocation);
        }
      );
      getSymptomsForBodyArea("22", gender).then((resSymptoms) => {
        console.log(resSymptoms);
      });
    }
  }, [trialId, makeUpAChange]);

  console.log(pickedBodyLocations);

  const submitHandler = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const someFiles = fileUploadRef.current?.files;
    const newReaction: Reaction = {
      trial_id: trialId,
      body_area: pickedBodyLocations,
      symptom: symptom,
      date_time_observed: new Date(observedTime),
      //display_date: dateFormat(observedTime),
    };
    if (someFiles && someFiles[0]) {
      console.log(someFiles[0]); //
      const newFile = someFiles[0];
      const storageRef = ref(storage, "newFile.name");
      //uploadBytes is async
      uploadBytes(storageRef, newFile).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          console.log(url);
          newReaction.symptom_photo_url = url;
          console.log(newReaction.symptom_photo_url);
          //when the promise is returned, get download URL
          //getDownloadURL(snapshot.ref).then((url) => console.log(url));
          addReaction(newReaction).then(() => {
            navigate("/Home");
          });
        });
      });
    } else {
      addReaction(newReaction).then(() => {
        navigate("/Home");
      });
    }

    console.log("add reaction", observedTime);
    //console.log(new Date());

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
        <label htmlFor="bodyLocations">Select Body Location:</label>
        <select
          name="bodyLocations"
          id="bodyLocations"
          onChange={(e) => setPickedBodyLocations(e.target.value)}
          value={pickedBodyLocations}
        >
          {bodyLocations.map((item) => (
            <option
              value={item.ID}
              key={item.ID}
              selected={pickedBodyLocations === item.ID}
            >
              {item.Name}
            </option>
          ))}
        </select>
        <label htmlFor="selectSpecificLocations">
          Select Specific Location:
        </label>
        <select
          name="selectSpecificLocations"
          id="selectSpecificLocations"
          onChange={(e) => setPickedSpecificBodyLocations(e.target.value)}
        >
          {bodyLocations.map((item) => (
            <option value={item.ID} key={item.ID}>
              {item.Name}
            </option>
          ))}
        </select>
        <br></br>
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
          <label htmlFor="photo">Uplaod a photo:</label>
          <input type="file" name="photo" id="photo" ref={fileUploadRef} />
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
        Back to Home
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
