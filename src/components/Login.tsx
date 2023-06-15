import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import Icon from "@mdi/react";
import { mdiNotebookEditOutline } from "@mdi/js";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import noteBook from "../images/noteBook.png";
import "./Login.css";

const Login = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/Home");
    }
  }, [user]);

  return (
    <header className="Login">
      <h1>
        <p>FACTT</p>
      </h1>
      <h2>Food Allergy Child Trial Tracker</h2>
      <h2>
        <img src={noteBook}></img>
      </h2>

      <div className="loggedOut">
        <p>Please Sign In</p>
        <button className="signIn" onClick={() => signInWithGoogle()}>
          Sign In
        </button>
      </div>
    </header>
  );
};

export default Login;
