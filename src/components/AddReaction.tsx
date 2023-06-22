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
import SymptomList from "../models/SymptomList";

const AddReaction = () => {
  const navigate = useNavigate();

  //first drop down list
  const [bodyLocations, setBodyLocations] = useState<BodyLocationResponse[]>(
    []
  );
  const [pickedBodyLocations, setPickedBodyLocations] = useState("");

  //second drop down list
  const [specificBodyLocations, setSpecificBodyLocations] = useState<
    SpecificBodyLocationResponse[]
  >([]);
  const [pickedSpecificBodyLocations, setPickedSpecificBodyLocations] =
    useState("");

  //third drop down - symptoms
  const [symptomList, setsymptomList] = useState<SymptomList[]>([]);
  const [symptom, setSymptom] = useState("Rash");

  const [oneTrial, setOneTrial] = useState<Trial | null>(null);
  const [observedTime, setObservedTime] = useState("");
  const [makeUpAChange, setChange] = useState(false);
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const [allReactions, setReactions] = useState<Reaction[]>([]);
  const trialId: string = useParams().id!;
  const gender: string = useParams().gender!;

  //get the trial infomation from mongo
  useEffect(() => {
    if (trialId) {
      getTrial(trialId).then((response) => {
        setOneTrial(response);
      });

      //pull from the database all reactions for a given trial
      getReaction(trialId).then((resReactions) => {
        setReactions(resReactions);
      });

      //get short list of body locations
      getBodyLocations().then((resBodyLocation) => {
        setBodyLocations(resBodyLocation);
        setPickedBodyLocations(resBodyLocation[0].ID);
      });
    }
  }, [trialId, makeUpAChange]);

  //second drop down list
  useEffect(() => {
    //based on body location selected, pull more specific locations
    if (pickedBodyLocations) {
      getSpecificBodyLocations(pickedBodyLocations).then(
        (resSpecificBodyLocation) => {
          //console.log(resSpecificBodyLocation);
          setSpecificBodyLocations(resSpecificBodyLocation);
        }
      );
    }
  }, [pickedBodyLocations]);

  //third drop down list
  useEffect(() => {
    if (pickedSpecificBodyLocations) {
      getSymptomsForBodyArea(pickedSpecificBodyLocations, gender).then(
        (resSymptoms) => {
          setsymptomList(resSymptoms);
          console.log(resSymptoms);
        }
      );
    }
  }, [pickedSpecificBodyLocations]);

  //console.log(pickedBodyLocations);

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
      //console.log(someFiles[0]); //
      const newFile = someFiles[0];
      const storageRef = ref(
        storage,
        newFile.name + newReaction.date_time_observed
      );
      //uploadBytes is async
      uploadBytes(storageRef, newFile).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          newReaction.symptom_photo_url = url;

          addReaction(newReaction).then((res) => {
            if (res && oneTrial) {
              patchTrialReaction(oneTrial._id!, res._id!).then(() => {
                getReaction(trialId).then((resReactions) => {
                  setReactions(resReactions);
                });
              });
            }
          });
        });
      });
    } else {
      addReaction(newReaction).then((res) => {
        //navigate("/Home");
        if (res && oneTrial) {
          patchTrialReaction(oneTrial._id!, res._id!).then(() => {
            getReaction(trialId).then((resReactions) => {
              setReactions(resReactions);
            });
          });
          //console.log(updatedTrial);
        }
      });

      //   addReaction(newReaction).then(() => {
      //     //navigate("/Home");
      //   });
    }

    // console.log("add reaction", observedTime);
    //console.log(new Date());

    //const databaseReaction = await addReaction(newReaction); //create reaction in mongo
    //get reaction's object ID from mongo

    //associate reaction with trial

    setChange((prev) => !prev); //set opposite of previous
  };

  return (
    <div>
      <form className="AddReactionForm" onSubmit={submitHandler}>
        <h1>Add Reactions For Trial: {oneTrial && oneTrial.trial_name} </h1>
        <p>
          <b>New Reaction Details:</b>
        </p>
        <p>
          <label htmlFor="bodyLocations">Body Location:</label>
          <select
            name="bodyLocations"
            id="bodyLocations"
            onChange={(e) => setPickedBodyLocations(e.target.value)}
            value={pickedBodyLocations}
            //defaultValue={bodyLocations[1].ID}
          >
            {bodyLocations.map((item) => (
              <option
                value={item.ID}
                key={item.ID}
                // selected={pickedBodyLocations === item.ID}
              >
                {item.Name}
              </option>
            ))}
          </select>
        </p>
        <label htmlFor="selectSpecificLocations">Specific Body Location:</label>
        {/*do map of specific body locations*/}
        <select
          name="selectSpecificLocations"
          id="selectSpecificLocations"
          onChange={(e) => setPickedSpecificBodyLocations(e.target.value)}
        >
          {specificBodyLocations.map((item) => (
            <option value={item.ID} key={item.ID}>
              {item.Name}
            </option>
          ))}
        </select>
        <p>
          <label htmlFor="symptom">Symptom:</label>
          <select
            name="symptom"
            id="symptom"
            onChange={(e) => setSymptom(e.target.value)}
            value={symptom}
          >
            {symptomList.map((item) => (
              <option value={item.ID} key={item.ID}>
                {item.Name}
              </option>
            ))}
          </select>
        </p>
        <p>
          <div className="reactionDate">
            <label htmlFor="observedTime">Date/Time Observed:</label>
            <input
              required
              type="datetime-local"
              name="observedTime"
              id="observedTime"
              onChange={(e) => setObservedTime(e.target.value)}
              value={observedTime}
            />
          </div>
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

      <p>
        <b>Reactions:</b>
      </p>
      <hr></hr>
      {allReactions.map((item, index) => (
        <div key={item._id}>
          <p>Reaction Number: {index + 1}</p>
          {item.symptom_photo_url && (
            <img
              height="25px"
              src={item.symptom_photo_url}
              alt="reaction photo"
            />
          )}
          <p>Area of the body: {item.body_area}</p>
          <p>Symptom: {item.symptom}</p>
          <p>
            Date/Time Observed: {dateFormat(item.date_time_observed.toString())}
          </p>
          {/*<p>Time Observed: {item.date_time_observed.toLocaleTimeString()}</p>*/}
          <hr></hr>
        </div>
      ))}
    </div>
  );
};

export default AddReaction;
