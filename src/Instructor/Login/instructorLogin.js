import React from "react";
import "./instructorLogin.css";
import "./customLogin.css";

export default class InstructorLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  componentDidMount() {
    if(localStorage.getItem("insto")){
      window.location.href = "./instructor-homepage";
    }
    document.body.classList.add('custom-background');
    
  }
  componentWillUnmount() {
    document.body.classList.remove('custom-background');
  }
  
  handleSubmit(e) {
    e.preventDefault();
    const {email, password } = this.state;
    fetch("http://localhost:7845/login-register", {
      mode: "cors",
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "ok") {
          window.localStorage.setItem("insto", data.data);
          window.localStorage.setItem("instEmail", email);
          this.setState({
            email: "",
            password: "",
          });
          window.location.href = "./instructor-homepage";
        }
      });
  }
  render() {
    const FormHeader = (props) => <h2 id="headerTitle">{props.title}</h2>;

    const FormButton = (props) => (
      <div id="buttonInstructor" className="rowInstructor">
        <button onClick={this.handleSubmit}>{props.title}</button>
      </div>
    );

    return (
        
      <div className="page">
        
        <div id="containerInstructor">
          <div id="loginformInstructor">
            <FormHeader title="Instructor Login" />
            <div className="rowInstructor">
              <label>Email</label>
              <input
                type="email"
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
                required
              />
            </div>
            <div className="rowInstructor">
              <label>Password</label>
              <input
                type="password"
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
                required
              />
            </div>
            <FormButton title="Submit" />
            <center>
              <h2 className="h2signupInstructor">
                  Don't Have an Account?
                 <a href="./instructor-register" className="signupatagInstructor">
                  Sign Up
                </a>
              </h2>
            </center>
          </div>
        </div>
      </div>
    );
  }
}
