import React from "react";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { auth, firebase } from "./Firebase";
import { login, logout } from "../store/auth/action";

const Login = (): JSX.Element => {
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
  const dispatch = useDispatch();

  const googleLogin = async (): Promise<void> => {
    // 1 - init Google Auth Provider
    const provider = new firebase.auth.GoogleAuthProvider();
    // 2 - create the popup signIn
    await auth.signInWithPopup(provider).then(async () => {
      const user = auth.currentUser;
      // token generated
      const token = user && (await user.getIdToken());
      dispatch(login(user.displayName, user.email, token));
      Router.push(`/dashboard`);
    });
  };

  const googleLogout = (): void => {
    firebase.auth().signOut();
    dispatch(logout());
  };

  return (
    <div>
      {!isLoggedIn ? (
        <Button
          variant="outline-primary"
          className="login-button"
          onClick={googleLogin}
        >
          Log in with Google
        </Button>
      ) : (
          <Button
            variant="outline-primary"
            className="login-button"
            onClick={googleLogout}
          >
            Logout
          </Button>
        )}
    </div>
  );
};

export default Login;