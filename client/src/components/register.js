import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./App.css";
import pic from "./images/images.png";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function Register() {
  const [name, setname] = useState("");
  const [mobile, setmobile] = useState("");
  const [visitee, setvisitee] = useState("");
  const [date, setdate] = useState('');
  const [clockin, setclockin] = useState("");
  const [clockout, setclockout] = useState("");
  const [purpose, setpurpose] = useState("");

  // const clockinTimestamp = () => {
  //   const dt = new Date(clockin).getTime();
  //   setTimestampclockin(dt / 1000);
  // }
  // console.log(Timestampclockin);

  // const clockoutTimestamp = (clockout) => {
  //   const dt = new Date(clockout).getTime();
  //   setTimestampclockout(dt / 1000);
  // }

  // const clockinTimestamp = new Date(date);
  // const hours = clockinTimestamp.getHours();
  // const minutes = clockinTimestamp.getMinutes();
  // console.log(clockin);
  // const hours = clockin.getHours();
  // const minutes = clockout.getMinutes();
  // const clockinTimestamp = new Date(date);
  // clockinTimestamp.setHours(hours);
  // clockinTimestamp.setMinutes(minutes);
  // console.log(clockinTimestamp);
  // console.log(hours);

  //   console.log(clockin);
  //   var time = clockin.split(":");
  //   console.log(time);
  //   var hours = parseInt(time[0], 10);
  //   var minutes = parseInt(time[1], 10);
  //   console.log(hours);
  //   console.log(minutes);
  //   const clockinTime = new Date(date);
  //   clockinTime.setHours(hours);
  //   clockinTime.setMinutes(minutes);

  //    var clockinTimestamp = clockinTime.getTime();
  //    console.log(clockinTimestamp);

  //   var tsin = new Date(clockinTimestamp);
  //   console.log(tsin);

  //   // console.log(tsin.getFullYear()+  "-"+(tsin.getMonth()+1)+"-"+ tsin.getDate()+" "+tsin.getHours()+":"+tsin.getMinutes());
  //   var finalcin = tsin.getFullYear()+  "-"+(tsin.getMonth()+1)+"-"+ tsin.getDate()+" "+tsin.getHours()+":"+tsin.getMinutes()
  // console.log(finalcin);

  //   console.log(clockout);
  //   var time = clockout.split(":");
  //   console.log(time);
  //   var hours = parseInt(time[0], 10);
  //   var minutes = parseInt(time[1], 10);
  //   console.log(hours);
  //   console.log(minutes);
  //   const clockoutTime = new Date(date);
  //   clockoutTime.setHours(hours);
  //   clockoutTime.setMinutes(minutes);

  //   var clockoutTimestamp = clockoutTime.getTime();
  //    console.log(clockoutTimestamp);

  //   var tsout = new Date(clockoutTimestamp);
  //   console.log(tsout);

  //   console.log(tsout.getFullYear()+  "-"+(tsout.getMonth()+1)+"-"+ tsout.getDate()+" "+tsout.getHours()+":"+tsout.getMinutes());
  //   var finalcout = tsout.getFullYear()+  "-"+(tsout.getMonth()+1)+"-"+ tsout.getDate()+" "+tsout.getHours()+":"+tsout.getMinutes()

  useEffect(() => {
    console.log('rishi');
    let initial_date = new Date();
    let final_date =
      initial_date.getFullYear() +
      "-" +
      ("0" + (initial_date.getMonth() + 1)).slice(-2) +
      "-" +
      initial_date.getDate();
    setdate(final_date);

  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.length === 0) {
      alert("Please enter your name.");
      return;
    } else if (mobile.length === 0) {
      alert("Please enter your mobile number.");
      return;
    } else if (visitee.length === 0) {
      alert("Please enter your visitee name.");
      return;
    } else if (date.length === 0) {
      alert("Please enter the date of visit.");
      return;
    } else if (clockin.length === 0) {
      alert("Please enter your clockin time.");
      return;
    }
    // else if (clockout.length === 0) {
    //   alert('Please enter your clockout.')
    //   return;
    // }
    else if (purpose.length === 0) {
      alert("Please enter your purpose of visit.");
      return;
    }

    const registerData = {
      name: name,
      mobile: mobile,
      visitee: visitee,
      date: date,
      clockin: clockin,
      clockout: clockout,
      purpose: purpose,
    };

    console.log(registerData);
    axios
      .post(
        "https://api.visitormanagement.cloudinworks.com/api/save-details",
        registerData
      )

      .then((response) => {
        const data = response.data;
        console.log(data);

        if (response.data.status === true) {
          alert("Data Inserted");
          // Swal.fire({
          //   position: 'top-end',
          //   icon: 'success',
          //   title: 'Visitor details added successfully',
          //   showConfirmButton: true,
          //   timer: 2500
          //})
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
        <div className="row">
          <div className="col-lg-5 register_background">
            <img src={pic} width={100} alt="logo" />
          </div>
          <div className="col-lg-1 stroke">&nbsp;</div>
          <div className="col-lg-5">
            <form onSubmit={handleSubmit}>
              <div>
                <div className="text-center mt-3">
                  <h3 colSpan="2">Add Visitor Details</h3>
                </div>
              </div>
              <div>
                <div className=" col-lg-12 text-center mt-2">
                  <h6 className="text-left">Name</h6>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    placeholder="Enter Your Name"
                    className="form-control"
                    pattern="[A-Za-z ]{1,32}"
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
                    // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
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
                      onChange={(e) => setclockin(e.target.value)}
                      className="form-control"
                    />
                  </div>

                  <h6 className="col-lg-2 ml-3 mt-2 ">ClockOut</h6>
                  <div className="col-lg-4 pr-4">
                    <input
                      type="time"
                      // datetime-local
                      name="clockout"
                      id="clockout"
                      value={clockout}
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
                  <div className="text-center mt-3 mb-3">
                    <button
                      type="submit"
                      name="data_submit"
                      id="data_submit"
                      className="btn btn-info ml-5 pl-4 pr-4"
                    >
                      Checkin
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

export default Register;
