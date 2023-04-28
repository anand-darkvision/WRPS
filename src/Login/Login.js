import React from "react";
import "./Login.css";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const {email, password } = this.state;
    console.log("this is server" + email, password);
    fetch("http://localhost:7845/login", {
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
          window.localStorage.setItem("token", data.data);
          this.setState({
            email: "",
            password: "",
          });
          window.location.href = "./homescreen";
        }
      });
  }

  componentDidMount() {
    if(localStorage.getItem("token")){
      window.location.href = "./homescreen";
    }
  }
  render() {
    const FormHeader = (props) => <h2 id="headerTitle">{props.title}</h2>;

    const FormButton = (props) => (
      <div id="button" className="row">
        <button onClick={this.handleSubmit}>{props.title}</button>
      </div>
    );

    return (
      <div id="container">
        <div id="loginform">
          <FormHeader title="Login" />
          <div className="row">
            <label>Email</label>
            <input
              type="email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
              required
            />
          </div>
          <div className="row">
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
            <h2 className="h2signup">
              Don't Have an Account?
              <a href="./register" className="signupatag">
                Sign Up
              </a>
            </h2>
          </center>
        </div>
      </div>
    );
  }
}
