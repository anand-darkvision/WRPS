/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./addcourse.css";

export default class AddCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseName: "",
      courseDes: "",
      amount: "",
      maxStu: "",
      startDate: "",
      courseTim: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const insEmail = localStorage.getItem("instEmail");
    console.log(insEmail);
    const { courseName, courseDes, amount, maxStu, startDate, courseTim } =
      this.state;
    fetch("http://localhost:7845/add-course", {
      mode: "cors",
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        insEmail,
        courseName,
        courseDes,
        amount,
        maxStu,
        startDate,
        courseTim,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          this.setState({
            courseName: "",
            courseDes: "",
            amount: "",
            maxStu: "",
            startDate: "",
            courseTim: "",
          });
          window.location.href = "./instructor-homepage";
        }
      });
  }
  logout = () => {
    localStorage.removeItem("insto");
    window.location.href = "./homescreen";
  };
  componentDidMount() {
    document.body.classList.add("custom-background");
  }
  componentWillUnmount() {
    document.body.classList.remove("custom-background");
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-light">
          <div className="container-fluid">
            <a
              className="navbar-brand"
              href="#fs"
              style={{ color: "gray", fontWeight: "600", fontSize: "35px" }}
            >
              WMS INSTRUCTOR PANEL
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="./instructor-homepage"
                  style={{ color: "gray" }}
                >
                  HOME
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#product "
                  style={{ color: "gray" }}
                >
                  SEARCH
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="./instructor-courseadd"
                  style={{ color: "gray" }}
                >
                  ADDCOURSE
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={this.logout}
                  style={{ color: "gray", cursor: "pointer" }}
                >
                  LOGOUT
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="formDiv">
          <form>
            <div className="mb-3">
              <label className="form-label">Course Name</label>
              <input
                type="text"
                className="form-control"
                id="coursename"
                aria-describedby="emailHelp"
                value={this.state.courseName}
                onChange={(e) => this.setState({ courseName: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Course Description</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                value={this.state.courseDes}
                onChange={(e) => this.setState({ courseDes: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Amount</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                value={this.state.amount}
                onChange={(e) => this.setState({ amount: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Max Students</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                value={this.state.maxStu}
                onChange={(e) => this.setState({ maxStu: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label me-5 mt-3">Starting Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={this.state.startDate}
                onChange={(e) => this.setState({ startDate: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label me-5 mt-3">Course Timming</label>
              <input
                type="time"
                id="appt"
                name="appt"
                value={this.state.courseTim}
                onChange={(e) => this.setState({ courseTim: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="btn btn-outline-dark"
              onClick={this.handleSubmit}
            >
              Add
            </button>
          </form>
        </div>
      </div>
    );
  }
}
