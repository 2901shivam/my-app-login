import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const setEmaildispatch = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isvalid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isvalid: state.value.includes("@") };
  }
  return { value: "", isvalid: false };
};

const setPassworddispatch=(state,action)=>{
  if (action.type === "USER_INPUT") {
    return { value: action.val, isvalid: action.val.trim().length>6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isvalid: state.value.trim().length>6 };
  }
  return {value:'',isvalid:false}
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [enteredCollegename, setcollegeName] = useState("");
  const [collegenameIsValid, setCollegeNameIsValid] = useState();

  const [emailState, emailDispatch] = useReducer(setEmaildispatch, {
    value:'',
    isvalid: undefined,
  });

  const[passwordState,passwordDispatch]=useReducer(setPassworddispatch,{
    value:'',
    isvalid:undefined,

  })

  useEffect(() => {
    setFormIsValid(
      emailState.isvalid &&
        passwordState.isvalid &&
        enteredCollegename.trim().length > 0
    );
  }, [emailState,passwordState, enteredCollegename]);

  const collegeChangeHandeler = (event) => {
    setcollegeName(event.target.value);

    // setFormIsValid(
    //   event.target.value.trim().length > 0 &&
    //     emailState.isvalid &&
    //     // enteredPassword.trim().length > 6
    //     passwordState.isvalid
    // );
  };

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    emailDispatch ({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(
    //   event.target.value.includes("@") &&
    //     passwordState.isvalid &&
    //     enteredCollegename.trim().length > 0
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
        passwordDispatch({type:'USER_INPUT',val:event.target.value})

    // setFormIsValid(
    //   event.target.value.trim().length > 6 &&
    //     emailState.isvalid &&
    //     enteredCollegename.trim().length > 0
    // );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isvalid);
     emailDispatch({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    passwordDispatch({type:'INPUT_BLUR'});
  };

  const validateCollegeNamehandler = () => {
    setCollegeNameIsValid(enteredCollegename.trim().length > 0);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value, enteredCollegename);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isvalid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isvalid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collegenameIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="college">College Name</label>
          <input
            type="text"
            id="college"
            value={enteredCollegename}
            onChange={collegeChangeHandeler}
            onBlur={validateCollegeNamehandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
