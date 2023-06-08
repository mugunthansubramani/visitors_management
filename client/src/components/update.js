import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import pic from "./images/images.png";
import Swal from "sweetalert2";

function Update() {
  const { id } = useParams();
  const [name, setname] = useState("");
  const [mobile, setmobile] = useState("");
  const [visitee, setvisitee] = useState("");
  const [date, setdate] = useState("");
  const [clockin, setclockin] = useState("");
  const [clockout, setclockout] = useState("");
  const [purpose, setpurpose] = useState("");

  // console.log(clockin);
  // var cintime = clockin.split(":");
  // console.log(cintime);
  // var cinhours = parseInt(cintime[0], 10);
  // var cinminutes = parseInt(cintime[1], 10);
  // console.log(cinhours);
  // console.log(cinminutes);
  // const clockinTime = new Date(date);
  // clockinTime.setHours(cinhours);
  // clockinTime.setMinutes(cinminutes);
  // let updateclockintime =clockinTime.getHours()+":"+clockinTime.getMinutes();
  // const paddedclockinTime = updateclockintime.split(':').map(e => `0${e}`.slice(-2)).join(':')
  // console.log(paddedclockinTime);

  // console.log(clockout);
  // var couttime = clockout.split(":");
  // console.log(couttime);
  // var couthours = parseInt(couttime[0], 10);
  // var coutminutes = parseInt(couttime[1], 10);
  // console.log(couthours);
  // console.log(coutminutes);
  // const clockoutTime = new Date(date);
  // clockoutTime.setHours(couthours);
  // clockoutTime.setMinutes(coutminutes);
  // let updateclockouttime =clockoutTime.getHours()+":"+clockoutTime.getMinutes();
  // const paddedclockoutTime = updateclockouttime.split(':').map(e => `0${e}`.slice(-2)).join(':')
  // console.log(paddedclockoutTime);

  function getUpdateDetails() {
    axios
      .get(`https://api.visitormanagement.cloudinworks.com/api/edit/${id}`)
      // .then(response => response.json())
      .then(function (res) {
        const info = res.data;
        const result = info.data;
        console.log(result);
        setname(result.name);
        setmobile(result.mobile);
        setvisitee(result.visitee);
        setdate(result.date);
        setclockin(result.clockin);
        setclockout(result.clockout);
        setpurpose(result.purpose);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    getUpdateDetails();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updateData = {
      name: name,
      mobile: mobile,
      visitee: visitee,
      date: date,
      clockin: clockin,
      clockout: clockout,
      purpose: purpose,
    };

    axios
      .patch(
        `https://api.visitormanagement.cloudinworks.com/api/update/${id}`,
        updateData
      )

      .then((response) => {
        const data = response.data;
        console.log(data);

        if (response.data.status === true) {
          // alert("Data Inserted");
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
          });
          window.location.href = "/admin_dash";
        } else {
          alert("Contact Admin");
          // window.location.href = "/register";
        }
      })

      .catch(function (error) {
        console.log(error);
        alert(error);
        // window.location.reload();
      });
  };

  return (
    <>
      <div className=" container-fluid signup">
        {/* <div className="row ">update</div> */}
        <div className="row">
          <div className="col-lg-5 register_background">
            <img src={pic} width={100} alt="logo" />
          </div>
          <div className="col-lg-1 stroke">&nbsp;</div>
          <div className="col-lg-5">
            <form onSubmit={handleSubmit}>
              <div>
                <div className="text-center mt-3">
                  <h3 colspan="2">Add Visitor Details</h3>
                </div>
              </div>
              <div>
                <div className=" col-lg-12 text-center mt-2">
                  <h6 className="text-left">Name</h6>
                  {/* <input type="text"  id="name" name="name" value={name}  placeholder="Enter your name" className="form-control mt-2" /> */}
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    placeholder="Enter Your Name"
                    className="form-control"
                  />
                </div>
                <div className="col-lg-12 text-center mt-3">
                  <h6 className="text-left">Mobile</h6>

                  <input
                    type="tel"
                    name="mobile"
                    id="mobile"
                    value={mobile}
                    onChange={(e) => setmobile(e.target.value)}
                    placeholder="Enter Mobile No"
                    className="form-control"
                    pattern="[6789][0-9]{9}"
                  />
                </div>
                <div className="col-lg-12 text-center mt-3">
                  <h6 className="text-left">Visitee</h6>

                  <input
                    type="text"
                    name="visitee"
                    id="visitee"
                    value={visitee}
                    onChange={(e) => setvisitee(e.target.value)}
                    placeholder="Enter your Visitee"
                    className="form-control"
                  />
                </div>

                <div className=" col-lg-12 text-center mt-3">
                  <h6 className="text-left">Date</h6>

                  <input
                    type="date"
                    name="date"
                    id="date"
                    value={date}
                    onChange={(e) => setdate(e.target.value)}
                    placeholder="Enter Email id"
                    className="form-control"
                  />
                </div>

                <div className="col-lg-12 no-gutters d-flex text-left mt-4">
                  <h6 className="col-lg-2 mt-2 ">Clockin</h6>

                  <div className="col-lg-4 pr-4">
                    <input
                      type="time"
                      name="clockin"
                      id="clockin"
                      value={clockin}
                      // min="12:00"
                      // max="18:00"
                      onChange={(e) => setclockin(e.target.value)}
                      className="form-control"
                    />
                  </div>

                  <h6 className="col-lg-2 ml-3 mt-2 ">ClockOut</h6>
                  <div className="col-lg-4 pr-4">
                    <input
                      type="time"
                      name="clockout"
                      id="clockout"
                      value={clockout}
                      // min={clockin}
                      onChange={(e) => setclockout(e.target.value)}
                      className="form-control ml-2"
                    />
                  </div>
                </div>

                <div className="col-lg-12 text-center mt-4">
                  <h6 className="text-left">Purpose of Visit : </h6>

                  <textarea
                    type="text"
                    name="purpose"
                    id="purpose"
                    value={purpose}
                    onChange={(e) => setpurpose(e.target.value)}
                    placeholder="Enter Your Purpose Of Visit"
                    className="form-control"
                  />
                </div>
                <div>
                  <div className="text-center mt-4">
                    <button
                      type="submit"
                      name="data_submit"
                      id="data_submit"
                      className="btn btn-success ml-5 pl-4 pr-4"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-1">&nbsp;</div>
        </div>
      </div>
    </>
  );
}

export default Update;
