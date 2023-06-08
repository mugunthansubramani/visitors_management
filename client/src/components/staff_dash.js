import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import pic from "./images/images.png";
import { logDOM } from "@testing-library/react";
import Swal from "sweetalert2";

function StaffDash() {
  const [details, setDetails] = useState([]);
  const [clockout, setclockout] = useState("");
  const [today, setToday] = useState(false);
  function send_report() {
    axios
      .get(
        `https://api.visitormanagement.cloudinworks.com/api/details/sent-report`
      )
      .then((res) => {
        let result = res.data;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your report has been send successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(result);
      })
      .catch((e) => {
        console.log(e);
      });
  }



  function getShowDetails() {


    
  var report_time = new Date();
  console.log(report_time);
  var finalTime = report_time.getFullYear()+  "-"+  ("0" + (report_time.getMonth() + 1)).slice(-2)+"-"+ report_time.getDate();

  // console.log(finalTime);
  

  
    axios
      .post(`https://api.visitormanagement.cloudinworks.com/api/show`)
      .then((res) => {
        let result = res.data;

        setDetails(result.visitors);
        console.log(result.visitors);

        result.visitors.every((data) => {
          console.log(data);
          let da = data.date == finalTime;
          console.log(da);
          setToday(da);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    getShowDetails();
  }, []);

  const logout = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success ml-5",
        cancelButton: "btn btn-danger mr-5",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "Do You Want To Logout!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Log Out!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/";
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          window.location.href = "/";
        }
      });
  };

  const clockoutTime = async (id) => {
    await axios
      .get(`https://api.visitormanagement.cloudinworks.com/api/clockout/${id}`)
      .then(function (res) {
        console.log(res);
        if (res.data.status === "error") {
          alert("Error");
          // getList();
        } else if (res.data.status === true) {
          let result = res.data;
          console.log(result.data);
          setclockout(result);
          // var output = res.data
          // setclockout = output.clockout
          // console.log(clockout);
          // alert("Data Deleted");
          getShowDetails();
        }
      })
      .catch(function (error) {
        alert(error);
        // getList();
      });
  };
  // const [details, setDetails] = useState([]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get('http://api.visitormanagement.cloudinworks.com/api/show')
  //     .then(response => response.json())
  //     .then(json => setDetails(json)) // Replace with your API endpoint

  //     console.log(details);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  // console.log(value.Date);
  var new_data = new Date();

  function formatDate(date) {
    // console.log(date);
    var datenew = new Date(date);
    // console.log(datenew);
    return (
      datenew.getDate() +
      "-" +
      ("0" + (datenew.getMonth() + 1)).slice(-2) +
      "-" +
      datenew.getFullYear()
    );
  }

  function formatTime(timeString) {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + " " + (hour < 12 ? "AM" : "PM");
  }

  return (
    <>
      <div className="container-fluid ">
        <div className="row ">
          <div className="col-lg-4 text-left">
            <img src={pic} width={80} alt="logo" />
          </div>
          <div className="col-lg-4 text-center ">
            <h3 className="m-3 ">Hi Welcome</h3>
          </div>
          <div className="col-lg-4">
            <div className="row mt-3 text-right">
              <div className="col-lg-1">&nbsp;</div>

              {/* {new_data = new Date()  ? ( " ") : (   )} */}

              {today ? (
                <div className="col-lg-4">
                  <button
                    className="btn btn-info text-light text-nowrap"
                    onClick={() => send_report()}
                  >
                    Send Report
                  </button>
                </div>
              ) : null}

              <div className="col-lg-4">
                <button className="btn btn-success  ">
                  <Link to="/register" className="text-light">
                    Add visitor
                  </Link>
                </button>
              </div>
              <div className="col-lg-3">
                <button
                  className="btn btn-danger text-light"
                  empdash
                  onClick={() => logout()}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row text-left ">
          <div className="col-lg-4">
            <h5 className="m-1 ">Visitor's Details</h5>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-lg-12">
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead>
                  <tr className="text-center">
                    <th>ID</th>
                    <th>Visitor Name</th>
                    <th>Mobile Number</th>
                    <th>Visitee</th>
                    <th>Date Of Visit</th>
                    <th>Purpose Of Visit</th>
                    <th>Check in</th>
                    <th>Check Out</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {/* {visitor.map((value) => (
                                 <tr key={value.id}> */}
                  {details.map((value, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{value.name}</td>
                      <td>{value.mobile}</td>
                      <td>{value.visitee}</td>
                      <td>{formatDate(value.date)}</td>
                      <td>{value.purpose}</td>
                      <td>{formatTime(value.clockin)}</td>
                      {/* <td>{value.clockout}</td> */}
                      <td className="text-center">
                        {value.clockout === null ? (
                          <button
                            type="button"
                            name="clk_out"
                            id="clk_out"
                            className=" btn btn-danger"
                            onClick={() => clockoutTime(value.id)}
                          >
                            check out
                          </button>
                        ) : (
                          formatTime(value.clockout)
                        )}
                      </td>
                      <td className="text-center">
                        <Link to={"/Update/" + value.id}>
                          {" "}
                          <button
                            type="button"
                            name="clk_out"
                            id="clk_out"
                            className=" btn btn-success"
                          >
                            Edit
                          </button>
                        </Link>
                      </td>
                      {/* <td><button type="button" name="clk_out" id="clk_out" className="ml-2 btn btn-danger" onClick={() => { xxxxx (value.id) }}>Delete</button></td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default StaffDash;
