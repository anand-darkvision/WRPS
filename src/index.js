import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import Login from "./Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Register/Register";
import HomeScreen from "./HomeScreen/homeScreen";
import PrivateRoute from "./PrivateRoute";
import InstructorLogin from "./Instructor/Login/instructorLogin";
import InstructorRegister from "./Instructor/Register/instructorRegister";
import InstructorHomePage from "./Instructor/MainPage/instructorHomePage";
import InstructorPrivateRoute from "./PrivateRoute/InstructorPrivateRoute";
import AddCourse from "./Instructor/addCourse/AddcoursePAge";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/homescreen"
          element={
            <PrivateRoute>
              <HomeScreen />
            </PrivateRoute>
          }
        />
        <Route
          path="/instructor-login"
          element={
            <PrivateRoute>
              <InstructorLogin />
            </PrivateRoute>
          }
        />
        <Route
          path="/instructor-register"
          element={
            <PrivateRoute>
              <InstructorRegister />
            </PrivateRoute>
          }
        />
        <Route
          path="/instructor-homepage"
          element={
            <PrivateRoute>
              <InstructorPrivateRoute>
                <InstructorHomePage />
              </InstructorPrivateRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/instructor-courseadd"
          element={
            <PrivateRoute>
              <InstructorPrivateRoute>
                <AddCourse/>
              </InstructorPrivateRoute>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
reportWebVitals();
