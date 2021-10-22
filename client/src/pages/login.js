import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { login } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import googleIcon from "../images/google.png";
import facebookIcon from "../images/facebook.png";
const Login = () => {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const [typePass, setTypePass] = useState(false);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };

  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={handleSubmit}>
            <h3 className="title">Sign in</h3>
            <div className="form-group">
              <div className="input-field">
                <i className="fa fa-envelope" aria-hidden="true"></i>

                <input
                  type="email"
                  className="email"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Email"
                  onChange={handleChangeInput}
                  name="email"
                  value={email}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-field">
                <i className="fa fa-lock" aria-hidden="true"></i>
                <input
                  type={typePass ? "text" : "password"}
                  className="password"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={handleChangeInput}
                  value={password}
                  name="password"
                />
                <small className="hide" onClick={() => setTypePass(!typePass)}>
                  {typePass ? "Hide" : "Show"}
                </small>
              </div>
            </div>
            <button
              type="submit"
              className="button"
              disabled={email && password ? false : true}
            >
              Login
            </button>

            <p className="social-text">Or sign in with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <img src={googleIcon} alt="googleicon" className="socialicon" />
              </a>
              <a href="#" className="social-icon">
                <img
                  src={facebookIcon}
                  alt="facebookicon"
                  className="socialicon"
                />
              </a>
            </div>

            <Link className="my-2" to="/forgot_password">
              Forgot your password?
            </Link>

            <p className="my-2">
              You don't have an account?{" "}
              <Link to="/register" style={{ color: "crimson" }}>
                Register Now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
