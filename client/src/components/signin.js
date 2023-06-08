import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./App.css";
import React, { useState } from "react";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleemailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.length === 0) {
      alert("Please enter the email id.");
      return;
    } else if (password.length === 0) {
      alert("Please enter the password.");
      return;
    }

    const loginData = {
      email: email,
      password: password,
    };

    axios
      .post(
        "https://api.visitormanagement.cloudinworks.com/api/login",
        loginData
      )
      .then((response) => {
        const data = response.data;
        console.log(data);

        if (response.data.status === true) {
          if (response.data.data === "superadmin") {
            // alert(data.data);
            window.location.href = "/superadmin_dash";
          } else if (response.data.data === "admin") {
            // alert(data.data);
            window.location.href = "/admin_dash";
          }
        } else {
          alert(data.messages);
        }

        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(error);
      });
  };

  return (
    <>
      <div className="container-fluid pt-5 pb-5 bgcolor">
        <div className="container signin">
          <div className="row">
            <div className="col-lg-6 p-5">
              <div className="row  ">
                <h2 className="col-lg-12">Welcome Back</h2>
              </div>
              <div className="row mt-2 ">
                <h6 className="col-lg-12">
                  Welcome back! Please enter your details
                </h6>
              </div>

              <form>
                <div>
                  <div className="mt-4 text-left ">
                    
                    <h6>Email Id</h6>
                    <div>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleemailChange}
                        placeholder="Enter your mail id"
                        className="form-control mt-2"
                      />
                    </div>
                  </div>

                  <div className="text-left mt-4">
                    <h6>Password</h6>
                    <div>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Enter your password"
                        className="form-control mt-2"
                      />
                    </div>
                  </div>

                  {/* <div className="text-right text-primary mt-4">
                    <h6>Forgot password.?</h6>
                  </div>

                  <div className="text-right text-primary mt-2">
                    <lable>Don't Have a Account? Sign Up </lable>
                  </div> */}

                  <div>
                    <div className="mt-5">
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="btn btn-success signinlogin_button"
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-lg-6  signin_background">&nbsp;</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
