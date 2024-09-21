import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { Container, Form, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Account = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(user || {});
  const [modalData, setModalData] = useState(user || {});
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({}); // Validation errors state

  const handleChange = (e) => {
    setModalData({
      ...modalData,
      [e.target.name]: e.target.value,
    });

    // Clear error message on change
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: "",
    }));
  };

  const validateForm = () => {
    let formErrors = {};
    let valid = true;

    // Validate Full Name (no empty or blank spaces)
    if (!modalData.fullName || modalData.fullName.trim() === "") {
      formErrors.fullName = "Full Name is required and cannot be blank";
      valid = false;
    }

    // Validate Email (no empty or blank spaces)
    if (!modalData.email || modalData.email.trim() === "") {
      formErrors.email = "Email is required and cannot be blank";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(modalData.email)) {
      formErrors.email = "Email is invalid";
      valid = false;
    }

    // Validate Date of Birth (no empty or blank spaces)
    if (!modalData.dateOfBirth || modalData.dateOfBirth.trim() === "") {
      formErrors.dateOfBirth = "Date of Birth is required and cannot be blank";
      valid = false;
    }

    // Validate Address (no empty or blank spaces)
    if (!modalData.address || modalData.address.trim() === "") {
      formErrors.address = "Address is required and cannot be blank";
      valid = false;
    }

    setErrors(formErrors);
    return valid;
  };

  const handleSave = () => {
    if (validateForm()) {
      let users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.map((u) =>
        u.username === modalData.username ? modalData : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("loggedInUser", JSON.stringify(modalData)); // Update logged-in user
      setUserData(modalData); // Update main userData state
      setShowModal(false); // Close modal after save
    }
  };

  return (
    <Container className="mt-5">
      <h2>Account Details</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Date Of Birth</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{userData.fullName}</td>
            <td>{userData.email}</td>
            <td>{userData.dateOfBirth}</td>
            <td>{userData.address}</td>
            <td>
              <Button
                variant="outline-primary"
                onClick={() => {
                  setModalData(userData); // Set modal data to current user data
                  setShowModal(true);
                }}
              >
                Edit
              </Button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Modal for editing user data */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton  style={{ backgroundColor: '#5584d4', padding: '10px'}}>
        <Modal.Title>Edit Account Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate>
            <Form.Group controlId="formFullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={modalData.fullName}
                onChange={handleChange}
                isInvalid={!!errors.fullName} // Bootstrap validation
              />
              <Form.Control.Feedback type="invalid">
                {errors.fullName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={modalData.email}
                onChange={handleChange}
                isInvalid={!!errors.email} // Bootstrap validation
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formDateOfBirth">
              <Form.Label>Date Of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={modalData.dateOfBirth}
                onChange={handleChange}
                isInvalid={!!errors.dateOfBirth} // Bootstrap validation
              />
              <Form.Control.Feedback type="invalid">
                {errors.dateOfBirth}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={modalData.address}
                onChange={handleChange}
                isInvalid={!!errors.address} // Bootstrap validation
              />
              <Form.Control.Feedback type="invalid">
                {errors.address}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="success" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Account;
