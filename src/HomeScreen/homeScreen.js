// eslint-disable-next-line
import React from "react";
import "./homescreen.css";
import axios from "../../node_modules/axios";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      selectedProduct: null,
      paymentProduct: null,
      cardHoler: "",
      cardNum: "",
      expiryDate: "",
      cvv: "",
    };
  }

  logout = () => {
    localStorage.removeItem("token");
    window.location.href = "./";
  };
  async componentDidMount() {
    try {
      const response = await axios.get("http://localhost:7845/get-details");
      this.setState({ products: response.data });
    } catch (error) {
      console.error(error);
    }
  }
  handleCardClick = (product) => {
    this.setState({ selectedProduct: product });
  };

  handleCloseClick = () => {
    this.setState({ selectedProduct: null });
  };

  handlePayClick = (prod) => {
    this.setState({ paymentProduct: prod });
  };

  handleClosePay = () => {
    this.setState({ paymentProduct: null });
  };

  render() {
    const { products, selectedProduct, paymentProduct } = this.state;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-light">
          <div className="container-fluid">
            <a
              className="navbar-brand"
              href="#fs"
              style={{ color: "gray", fontWeight: "600", fontSize: "35px" }}
            >
              WMS
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
                  href="#header"
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
                  href="./instructor-login"
                  style={{ color: "gray" }}
                >
                  INSTRUCTOR
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
                  <p style={{ fontSize: "2rem" }}>Starting Date:</p>
                  <p>{selectedProduct.startDate}</p>
                  <p style={{ fontSize: "2rem" }}>Course Timming:</p>
                  <p>{selectedProduct.courseTim}</p>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    style={{ marginTop: "3rem" }}
                    onClick={() => this.handlePayClick(selectedProduct)}
                  >
                    Pay
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div>
          {paymentProduct && (
            <div
              className="modal fade show d-block"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-modal="true"
              onClick={this.handleClosePay}
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
                      {paymentProduct.courseName}
                    </h5>
                    <button type="button" className="close" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="mb-3">
                        <label className="form-label">
                          Full Name On The Card
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="coursename"
                          aria-describedby="emailHelp"
                          value={this.state.courseName}
                          onChange={(e) =>
                            this.setState({ courseName: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Card Number</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="xxxx xxxx xxxx xxxx"
                          id="exampleInputPassword1"
                          value={this.state.courseDes}
                          onChange={(e) =>
                            this.setState({ courseDes: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label me-5 mt-3">
                          Expiry date
                        </label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={this.state.startDate}
                          onChange={(e) =>
                            this.setState({ startDate: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label me-5 mt-3">CVV</label>
                        <input
                          type="text"
                          className="form-control"
                          id="coursename"
                          aria-describedby="emailHelp"
                          value={this.state.courseName}
                          onChange={(e) =>
                            this.setState({ courseName: e.target.value })
                          }
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
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
