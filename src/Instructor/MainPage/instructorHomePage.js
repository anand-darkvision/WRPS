import React from "react";
import axios from "../../../node_modules/axios";

export default class InstructorHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      selectedProduct: null,
    };
  }

  logout = () => {
    localStorage.removeItem("insto");
    localStorage.removeItem("instEmail");
    window.location.href = "./homescreen";
  };

  async componentDidMount() {
    document.body.classList.add("custom-background");
    try {
      const response = await axios.get("http://localhost:7845/get-details");
      this.setState({ products: response.data });
    } catch (error) {
      console.error(error);
    }
  }

  componentWillUnmount() {
    document.body.classList.remove("custom-background");
  }

  handleCardClick = (product) => {
    this.setState({ selectedProduct: product });
  };

  handleCloseClick = () => {
    this.setState({ selectedProduct: null });
  };

  render() {
    const { products, selectedProduct } = this.state;
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
        <div>
          {products.map((product) => (
            <div
              className="card"
              key={product}
              style={{ width: "20rem", marginTop: "3rem", height: "15rem" }}
            >
              <div className="card-body">
                <h5
                  className="card-title"
                  style={{ fontSize: "35px", textTransform: "uppercase" }}
                >
                  {product.courseName}
                </h5>
                <p className="card-text" style={{ fontSize: "20px" }}>
                  {product.courseDes}
                </p>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  style={{ marginTop: "3rem" }}
                  onClick={() => this.handleCardClick(product)}
                >
                  View More
                </button>
              </div>
            </div>
          ))}
        </div>
        {selectedProduct && (
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-modal="true"
            onClick={this.handleCloseClick}
          >
            <div
              className="modal-dialog"
              role="document"
              style={{ marginTop: "12rem" }}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5
                    className="modal-title"
                    style={{ textTransform: "uppercase" }}
                  >
                    {selectedProduct.courseName}
                  </h5>
                  <button type="button" className="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p style={{ fontSize: "2rem" }}>Course Description:</p>
                  <p>{selectedProduct.courseDes}</p>
                  <p style={{ fontSize: "2rem" }}>Amount:</p>
                  <p>{selectedProduct.amount}</p>
                  <p style={{ fontSize: "2rem" }}>Max Students:</p>
                  <p>{selectedProduct.maxStu}</p>
                  <p style={{ fontSize: "2rem" }}>Starting Date:</p>
                  <p>{selectedProduct.startDate}</p>
                  <p style={{ fontSize: "2rem" }}>Course Timming:</p>
                  <p>{selectedProduct.courseTim}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
