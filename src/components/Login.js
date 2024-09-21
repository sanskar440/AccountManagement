import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};
    let valid = true;

    if (!username) {
      formErrors.username = 'Username is required';
      valid = false;
    }
    if (!password) {
      formErrors.password = 'Password is required';
      valid = false;
    } 

    setErrors(formErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidated(true);

    if (validateForm()) {
      const success = login(username, password);
      if (success) {
        toast.success('Login Successful'); // Show success toast
        setTimeout(() => {
          navigate('/account'); // Redirect to account page after the toast
        }, 2000);
      } else {
        toast.error('Invalid username or password'); // Show error notification
      }
    }
  };

  const handleChange = (field, value) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
    if (field === 'username') {
      setUsername(value);
    } else if (field === 'password') {
      setPassword(value);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h4 className="text-center mb-4">Login</h4>
              <form noValidate onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    className={`form-control ${errors.username ? 'is-invalid' : validated && !errors.username ? 'is-valid' : ''}`}
                    id="username"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => handleChange('username', e.target.value)}
                    required
                  />
                  <div className="invalid-feedback">{errors.username}</div>
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : validated && !errors.password ? 'is-valid' : ''}`}
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    required
                  />
                  <div className="invalid-feedback">{errors.password}</div>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>
              <div className="text-center mt-3">
                <span>
                  Don't have an account?{' '}
                  <a href="/register" className="text-primary">
                    Register
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <img src="https://img.freepik.com/premium-vector/digital-illustration-man-demonstrating-online-authentication-large-tablet-display_941526-3652.jpg?size=626&ext=jpg&ga=GA1.1.1189847179.1707159913&semt=ais_hybrid" alt="Login" className="img-fluid h-100" />
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </div>
  );
};

export default Login;
