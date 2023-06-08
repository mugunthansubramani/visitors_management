import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import pic from "./images/images.png";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Admin_dash() {
  const [details, setDetails] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);


  function getList() {
    let intime = new Date(startDate);
    var flstarttime =
      intime.getFullYear() +
      "-" +
      ("0" + (intime.getMonth() + 1)).slice(-2) +
      "-" +
      intime.getDate();

    let outtime = new Date(endDate);
    var flendtime =
      outtime.getFullYear() +
      "-" +
      ("0" + (outtime.getMonth() + 1)).slice(-2) +
      "-" +
      outtime.getDate();

    let data = {
      from_date: flstarttime == "1970-01-1" ? null : flstarttime,
      to_date: flendtime == "1970-01-1" ? null : flendtime,
    };

    axios
      .post("https://api.visitormanagement.cloudinworks.com/api/show", data)
      .then((res) => {
        let result = res.data;
        setDetails(result.visitors);

        // console.log(details);
        console.log(res);
        // console.log(details.clockin);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    getList();
  }, []);

  const deleteData = async (id) => {
    await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://api.visitormanagement.cloudinworks.com/api/destroy/${id}`
          )
            .then(function (res) {
              console.log(res);
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
  
              if (res.data.status === "error") {
                alert("Error");
                getList();
              } else if (res.data.status === true) {
                // alert("Data Deleted");
  
                getList();
              }
            })
            .catch(function (error) {
              alert(error);
              getList();
            });
        }
      });
    };

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
          //   Swal.fire({
          //     position: 'top-end',
          //     icon: 'success',
          //     title: 'Your work has been saved',
          //     showConfirmButton: false,
          //     timer: 1500
          //   })
          //   swalWithBootstrapButtons.fire("logout successful.");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // swalWithBootstrapButtons.fire(
          //   'Cancelled',
          //   'Back to admin Dashboard',
          // )
          //   let timerInterval;
          //   Swal.fire({
          //     title: "Back to admin Dashboard!",
          //     html: "I will close in <b></b> milliseconds.",
          //     timer: 2000,
          //     timerProgressBar: true,
          //     didOpen: () => {
          //       Swal.showLoading();
          //       const b = Swal.getHtmlContainer().querySelector("b");
          //       timerInterval = setInterval(() => {
          //         b.textContent = Swal.getTimerLeft();
          //       }, 100);
          //     },
          //     willClose: () => {
          //       clearInterval(timerInterval);
          //     },
          //   }).then((result) => {
          //     /* Read more about handling dismissals below */
          //     if (result.dismiss === Swal.DismissReason.timer) {
          //       console.log("I was closed by the timer");
          //     }
          //   });
        }
      });
  };

  // const logout = () => {
  //     const confirm = window.confirm("are you sure?");
  //     if(confirm){
  //         window.location.href = "/";
  //     }else {
  //         // same as clicking a link
  //         // not optimal solution though
  //         window.location.reload();
  //     }
  // }

  function formatTime(timeString) {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + " " + (hour < 12 ? "AM" : "PM");
  }

  return (
    <>
      <div className="container-fluid ">
        <div className="row  ">
          <div className="col-lg-4">
            <h3 className=" m-0 ">
              <img src={pic} width={80} alt="logo" />
            </h3>
          </div>
          <div className="col-lg-4 text-center ">
            <h3 className="mt-4 ">Hi Welcome</h3>
          </div>
          <div className="col-lg-4">
            <div className="row mt-3 text-right">
              <div className="col-lg-5">&nbsp;</div>
              <div className="col-lg-4">&nbsp;</div>
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
            <h5 className="m-3 ">Visitor's Details</h5>
          </div>
        </div>

        <div className="row text-center">
          <div className="col-lg-3">
            <h3 className="mt-1 ">&nbsp;</h3>
          </div>
          <div className="col-lg-2 ">
            <h3 className="mt-1">&nbsp;</h3>
          </div>
          <div className="col-lg-7">
            <div className="row mt-1 text-right">
              <div className="col-lg-0"></div>
              <div className="col-lg-5 d-flex mt-1">
                <div className="col-lg-2">
                  <h6>From:</h6>
                </div>
                <div className="col-lg-10">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    startDate={startDate}
                    // endDate={endDate}
                    maxDate={endDate ? endDate : new Date()}
                    dateFormat="dd-MM-yyyy"
                    placeholderText="Select the start date"
                    isClearable
                  />
                </div>
              </div>
              <div className="col-lg-5  d-flex mt-1">
                <div className="col-lg-2">
                  {" "}
                  <h6>To: </h6>
                </div>
                <div className="col-lg-10">
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    // selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    maxDate={new Date()}
                    dateFormat="dd-MM-yyyy"
                    placeholderText="Select the end date"
                    isClearable
                  />
                </div>
              </div>
              <div className="col-lg-1 ">
                <button className="btn btn-primary" onClick={getList}>
                  Apply
                </button>
                {/* onClick={getList()} */}
              </div>
              <div className="col-lg-1"></div>
            </div>
          </div>
        </div>

        {/* onClick={handleDateFilter}  */}
        {/* onClick={() => { xxxxx (value.id) }} */}

        <div className="row mt-4">
          <div className="col-lg-12">
            <div className="table-responsive">
              <table className="table table-bordered table-hover text-center">
                <thead>
                  <tr>
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
                <tbody>
                  {details.map((value, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{value.name}</td>
                      <td>{value.mobile}</td>
                      <td>{value.visitee}</td>
                      <td>{value.date}</td>
                      <td>{value.purpose}</td>
                      <td>{formatTime(value.clockin)}</td>
                      <td>
                        {value.clockout ? formatTime(value.clockout) : "-"}
                      </td>

                      <td>
                        <button
                          type="button"
                          name="clk_out"
                          id="clk_out"
                          className=" btn btn-danger"
                          onClick={() => deleteData(value.id)}
                        >
                          Delete
                        </button>
                        {/* <button type="button" name="clk_out" id="clk_out" className=" btn btn-danger" >clockout</button> */}
                      </td>
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
export default Admin_dash;
