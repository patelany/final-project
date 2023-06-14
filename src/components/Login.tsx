import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Icon from "@mdi/react";
import { mdiNotebookEditOutline } from "@mdi/js";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import noteBook from "../images/noteBook.png";

const Login = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <header className="Login">
      <h1>
        <p>FACTT</p>
      </h1>
      <h2>Food Allergy Child Trial Tracker</h2>
      <h2>
        <img src={noteBook}></img>
      </h2>
      {user ? (
        <div className="loggedIn">
          <p>Welcome: {user?.displayName}</p>
          <p>
            <img
              className="profileImage"
              src={user.photoURL || ""}
              alt="profile"
            />
          </p>

          <button className="signOut" onClick={() => signOut()}>
            Sign Out
          </button>
        </div>
      ) : (
        <div className="loggedOut">
          <p>Please Sign In</p>
          <button className="signIn" onClick={() => signInWithGoogle()}>
            Sign In
          </button>
        </div>
      )}
    </header>
  );
};

export default Login;
