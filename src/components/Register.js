import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'

const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    email: '',
    fullName: '',
    dateOfBirth: '',
    address: '',
  });

  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const navigate = useNavigate();

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Password validation regex (1 uppercase, 1 lowercase, 1 number, min 6 chars)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

  // Handle input changes and validate in real-time
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });

    // Real-time validation for each field
    let newErrors = { ...errors };

    switch (name) {
      case 'username':
        newErrors.username = value.trim() ? '' : 'Username is required';
        break;

      case 'password':
        newErrors.password = passwordRegex.test(value)
          ? ''
          : 'Password must contain at least 1 uppercase, 1 lowercase, 1 number, and be at least 6 characters long';
        break;

      case 'email':
        newErrors.email = emailRegex.test(value) ? '' : 'Please enter a valid email address';
        break;

      case 'fullName':
        newErrors.fullName = value.trim() ? '' : 'Full name is required';
        break;

      case 'dateOfBirth':
        newErrors.dateOfBirth = value ? '' : 'Date of birth is required';
        break;

      case 'address':
        newErrors.address = value.trim() ? '' : 'Address is required';
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  // Final validation check before submission
  const validateForm = () => {
    let formErrors = {};

    if (!userData.username.trim()) {
      formErrors.username = 'Username is required';
    }

    if (!passwordRegex.test(userData.password)) {
      formErrors.password = 'Password must contain at least 1 uppercase, 1 lowercase, 1 number, and be at least 6 characters long';
    }

    if (!emailRegex.test(userData.email)) {
      formErrors.email = 'Please enter a valid email address';
    }

    if (!userData.fullName.trim()) {
      formErrors.fullName = 'Full name is required';
    }

    if (!userData.dateOfBirth) {
      formErrors.dateOfBirth = 'Date of birth is required';
    }

    if (!userData.address.trim()) {
      formErrors.address = 'Address is required';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      register(userData);
      navigate('/login'); // Redirect to login page after registration
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h4 className="text-center mb-4">Register</h4>
              <form onSubmit={handleSubmit} noValidate>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                      type="text"
                      className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                      id="username"
                      name="username"
                      placeholder="Enter username"
                      value={userData.username}
                      onChange={handleChange}
                      required
                    />
                    {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      id="password"
                      name="password"
                      placeholder="Enter password"
                      value={userData.password}
                      onChange={handleChange}
                      required
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      id="email"
                      name="email"
                      placeholder="Enter email"
                      value={userData.email}
                      onChange={handleChange}
                      required
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input
                      type="text"
                      className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                      id="fullName"
                      name="fullName"
                      placeholder="Enter full name"
                      value={userData.fullName}
                      onChange={handleChange}
                      required
                    />
                    {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                    <input
                      type="date"
                      className={`form-control ${errors.dateOfBirth ? 'is-invalid' : ''}`}
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={userData.dateOfBirth}
                      onChange={handleChange}
                      required
                    />
                    {errors.dateOfBirth && <div className="invalid-feedback">{errors.dateOfBirth}</div>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                      type="text"
                      className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                      id="address"
                      name="address"
                      placeholder="Enter address"
                      value={userData.address}
                      onChange={handleChange}
                      required
                    />
                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Register
                </button>
              </form>
              <div className="text-center mt-3">
                <span>
                  Already have an account?{' '}
                  <a href="/login" className="text-primary">
                    Login
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
