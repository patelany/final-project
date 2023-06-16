import { FormEvent, useContext, useState } from "react";
import "./AddTrial.css";
import Trial from "../models/Trial";
import { useNavigate, useParams } from "react-router-dom";
import { addTrial } from "../services/trialApiService";
import PatientContext from "../context/PatientContext";
import AuthContext from "../context/AuthContext";

const AddTrial = () => {
  const navigate = useNavigate();
  const [trial, setTrial] = useState("");
  const [typeOfTrial, setTrialType] = useState("giveFood");
  const [foodType, setFoodType] = useState("purchased");
  const [trialFood, setTrialFood] = useState("");
  // const [foodPhoto, setFoodPhoto] = useState("");
  const [startDate, setStartDate] = useState("");
  // const [trialStatus, setTrialStatus] = useState("In Process");
  const [reaction, setReaction] = useState([]);
  const { patients } = useContext(PatientContext);
  const patientId: string = useParams().patientId!;
  const { user } = useContext(AuthContext);
  const submitHandler = async (e: FormEvent): Promise<void> => {
    console.log("test");
    e.preventDefault();
    const newTrial: Trial = {
      guardianID: user!.uid.toString(),
      patient_id: patientId,
      trial_name: trial,
      trial_type: typeOfTrial,
      food_type: foodType,
      trial_food: trialFood,
      food_photo_url: "",
      start_date: new Date(startDate),
      trial_pass: "In Process",
      // reaction: reaction,
    };
    await addTrial(newTrial);
    navigate("/Home");
  };

  return (
    <form className="AddTrialForm" onSubmit={submitHandler}>
      <label htmlFor="trial">Trial:</label>
      <input
        type="text"
        name="trial"
        id="trial"
        onChange={(e) => setTrial(e.target.value)}
        value={trial}
      />
      <label htmlFor="startDate">Start Date:</label>
      <input
        type="date"
        name="startDate"
        id="startDate"
        onChange={(e) => setStartDate(e.target.value)}
        value={startDate}
      />
      <label htmlFor="typeOfTrial">Type Of Trial:</label>
      <select
        name="typeOfTrial"
        id="typeOfTrial"
        value={typeOfTrial}
        onChange={(e) => setTrialType(e.target.value)}
      >
        <option value="giveFood">Give A Food</option>
        <option value="takeAwayFood">Take Away A Food</option>
      </select>

      <label htmlFor="foodType">Food Type:</label>
      <select
        name="foodType"
        id="foodType"
        value={foodType}
        onChange={(e) => setFoodType(e.target.value)}
      >
        <option value="purchased">Purchased</option>
        <option value="homeMade">Home Made</option>
      </select>
      <label htmlFor="trialFood">Trial Food:</label>
      <select
        name="trialFood"
        id="trialFood"
        value={trialFood}
        onChange={(e) => setTrialFood(e.target.value)}
      >
        <option value="trialFood">Oreos use API?</option>
      </select>
      <p>
        <button>Upload Photo</button>
        Manufacturers can change ingredients at any time! Take a picture of the
        package, so you can be sure of the ingredients at time of trial!
      </p>
      <p>
        <button>Save</button>
      </p>
    </form>
  );
};

export default AddTrial;
