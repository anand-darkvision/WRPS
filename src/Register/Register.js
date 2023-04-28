import React from "react";
import "./Register.css";

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, phone, email, password } = this.state;
    console.log("this is server" + name, phone, email, password);
    fetch("http://localhost:7845/register", {
      mode: "cors",
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "ok") {
          this.setState({
            name: "",
            phone: "",
            email: "",
            password: "",
          });
           window.localStorage.setItem("token", data.token);
            window.location.href = "./";
        }
      });
  }
  render() {
    const FormHeader = (props) => (
      <h2 id="headerTitleRegister">{props.title}</h2>
    );

    const FormButton = (props) => (
      <div id="buttonRegister" className="rowRegister">
        <button onClick={this.handleSubmit}>{props.title}</button>
      </div>
    );

    return (
      <div id="containerRegister">
        <div id="loginformRegister">
          <FormHeader title="Register" />
          <div className="rowRegister">
            <label>Name</label>
            <input
              type="text"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
              required
            />
          </div>
          <div className="rowRegister">
            <label>Phone No</label>
            <input
              type="tel"
              pattern="[0-9]{3}"
              value={this.state.phone}
              onChange={(e) => this.setState({ phone: e.target.value })}
              required
            />
          </div>
          <div className="rowRegister">
            <label>Email</label>
            <input
              type="email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
              required
            />
          </div>
          <div className="rowRegister">
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
            <h2 className="h2signupRegister">
              Already Have an Account?
              <a href="./" className="signupatagRegister">
                Sign In
              </a>
            </h2>
          </center>
        </div>
      </div>
    );
  }
}
