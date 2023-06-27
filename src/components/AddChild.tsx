import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import "./AddChild.css";
import Patient from "../models/Patient";
import { addPatient } from "../services/patientApiService";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// interface Props {
//   setSearchTerm: (s: string) => void;
// }

const AddChildForm = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  // const [years, setYears] = useState("");
  // const [months, setMonths] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [shareData, setShareData] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const fileUploadRef = useRef<HTMLInputElement>(null);

  const submitHandler = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const someFiles = fileUploadRef.current?.files;

    const newPatient: Patient = {
      gender: gender,
      guardianID: user!.uid.toString(), //google UID
      patient_name: name,
      // age_years: +years,
      // age_months: +months,

      birthdate: new Date(birthdate),
      shareData: shareData,
    };

    if (someFiles && someFiles[0]) {
      console.log(someFiles[0]); //
      const newFile = someFiles[0];
      const storageRef = ref(storage, newPatient.birthdate + newFile.name);
      //uploadBytes is async
      uploadBytes(storageRef, newFile).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          console.log(url);
          newPatient.photo_url = url;
          console.log(newPatient.photo_url);
          //when the promise is returned, get download URL
          //getDownloadURL(snapshot.ref).then((url) => console.log(url));
          addPatient(newPatient).then(() => {
            navigate("/Home");
          });
        });
      });
    } else {
      await addPatient(newPatient).then(() => {
        navigate("/Home");
      });
    }

    // ...
    // console.log(search);
    //setSearchTerm(search);
  };
  // useEffect(() => {
  //   if (user) {
  //     navigate("/Home");
  //   }
  // }, [user]);

  return (
    <form className="AddChildForm" onSubmit={submitHandler}>
      <label htmlFor="name">Name (nickname)</label>

      <input
        required
        type="text"
        name="name"
        id="name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      {/* <label htmlFor="years">Years:</label>
      <input
        type="number"
        name="years"
        id="years"
        onChange={(e) => setYears(e.target.value)}
        value={years} */}
      {/* //>
      <label htmlFor="months">Months:</label>
      <input
        type="number"
        name="months"
        id="months"
        onChange={(e) => setMonths(e.target.value)}
        value={months}
      /> */}
      <p>
        <label htmlFor="birthdate">Birthdate:</label>
        <input
          required
          type="date"
          name="birthdate"
          id="birthdate"
          onChange={(e) => setBirthdate(e.target.value)}
          value={birthdate}
        />
      </p>
      <input
        required
        type="radio"
        id="boy"
        name="gender"
        value="2"
        onChange={(e) => setGender(e.target.value)}
        checked={gender === "2"}
      />
      <label htmlFor="boy">boy</label>
      <input
        required
        type="radio"
        id="girl"
        name="gender"
        value="3"
        onChange={(e) => setGender(e.target.value)}
        checked={gender === "3"}
      />
      <label htmlFor="girl">girl</label>
      <input
        disabled
        type="radio"
        id="neutral"
        name="neutral"
        value="4"
        onChange={(e) => setGender(e.target.value)}
        checked={gender === ""}
      />
      <label htmlFor="neutral">prefer not to say</label>

      <br></br>
      <input
        type="checkbox"
        name="shareData"
        id="shareData"
        checked={shareData}
        onChange={(e) => setShareData(e.target.checked)}
      />
      <label htmlFor="shareData">Share your trials with others?</label>
      <p></p>
      <label htmlFor="photo">Add your adorable kid! </label>
      <input
        className="childPhotoButton"
        type="file"
        name="photo"
        id="photo"
        ref={fileUploadRef}
      />
      <p>
        <button className="saveChildButton">Save</button>
      </p>
      <button
        className="finishedReactions"
        onClick={() => {
          navigate("/");
        }}
      >
        Back to Home
      </button>
    </form>
  );
};

export default AddChildForm;
