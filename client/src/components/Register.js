import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";

// firstName, lastName, phoneNumber, email, passwordUser, maritalStatus, gender, placeOfBirth, dateOfBirth
const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    passwordUser: "",
    maritalStatus: "",
    gender: "",
    placeOfBirth: "",
    dateOfBirth: ""
  });

  const { firstName, lastName, phoneNumber, email, passwordUser, maritalStatus, gender, placeOfBirth, dateOfBirth } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { firstName, lastName, phoneNumber, email, passwordUser, maritalStatus, gender, placeOfBirth, dateOfBirth };
      const response = await fetch(
        "http://localhost:5000/authentication/register",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );
      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        toast.success("Register Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  // firstName, lastName, phoneNumber, email, passwordUser, maritalStatus, gender, placeOfBirth, dateOfBirth

  return (
    <Fragment>
      <h1 className="mt-5 text-center">Register Form</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="firstName"
          value={firstName}
          placeholder="First name"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="lastName"
          value={lastName}
          placeholder="Last Name"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="phoneNumber"
          value={phoneNumber}
          placeholder="Phone number"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="email"
          value={email}
          placeholder="email"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="password"
          name="passwordUser"
          value={passwordUser}
          placeholder="password"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="maritalStatus"
          value={maritalStatus}
          placeholder="marital Status"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="gender"
          value={gender}
          placeholder="Gender"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="placeOfBirth"
          name="placeOfBirth"
          value={placeOfBirth}
          placeholder="Place of Birth"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="dateOfBirth"
          value={dateOfBirth}
          placeholder="Date Of Birth"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />

        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <Link to="/login">login</Link>
    </Fragment>
  );
};

export default Register;