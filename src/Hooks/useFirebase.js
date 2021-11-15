import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  getIdToken,
} from "firebase/auth";
import { useEffect, useState } from "react";
import initializeFirebase from "../Pages/Login/Firebase/firebase.init";
initializeFirebase();
const useFirebase = () => {
  //login state mange
  const [user, setUser] = useState({});
  const [isloading, setLoading] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [token, setToken] = useState("");
  //Error state manage
  const [authError, setAuthError] = useState("");
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const registerUser = (email, password, name, history) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const newUser = { email, displayName: name };
        setUser(newUser); ///// for state update
        saveUser(email, name, "POST");
        const auth = getAuth();
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            // Profile updated!
            // ...
          })
          .catch((error) => {
            // An error occurred
            // ...
          });
        console.log(user);
        history.push("/");
        // ...
      })
      .catch((error) => {
        setAuthError(error.message);
        alert(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //Google Sign In
  const googleSignIn = (location, history) => {
    setLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        saveUser(user.email, user.displayName, "PUT");
        const destination = location?.state?.from || "/";
        history.replace(destination);
        alert("successfully login");
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => setLoading(false));
  };
  const logInUser = (email, password, location, history) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const destination = location?.state?.from || "/";
        history.replace(destination);
        alert("successfully login");
        // ...
      })
      .catch((error) => {
        setAuthError(error.message);
        alert(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // User log in state
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setUser(user);
        getIdToken(user).then((idToken) => {
          setToken(idToken);
        });
      } else {
        setUser({});
      }
      setLoading(false);
    });
    return () => unsubscribed;
  }, []);

  const saveUser = (email, displayName, method) => {
    const info = {
      email,
      displayName,
    };
    fetch("http://localhost:5000/users", {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(info),
    }).then();
  };
  useEffect(() => {
    fetch(`http://localhost:5000/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => setAdmin(data.admin));
  }, [user.email]);

  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        alert("logout");
      })
      .catch((error) => {
        // An error happened.
        setAuthError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    authError,
    googleSignIn,
    isloading,
    user,
    registerUser,
    logInUser,
    logOut,
    admin,
    token,
  };
};

export default useFirebase;
