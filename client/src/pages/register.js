import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { register } from "../redux/actions/authAction";

const Register = () => {
  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const initialState = {
    fullname: "",
    username: "",
    mobile: "",
    email: "",
    password: "",
    cf_password: "",
    gender: "male",
  };
  const [userData, setUserData] = useState(initialState);
  const { fullname, username, mobile, email, password, cf_password } = userData;

  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userData));
  };

  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={handleSubmit}>
            <h3 className="title">Sign up</h3>

            <div className="form-group">
              <div className="input-field">
                <i class="fa fa-id-card-o" aria-hidden="true"></i>

                <input
                  type="text"
                  className="fullname"
                  id="fullname"
                  name="fullname"
                  placeholder="Fullname"
                  onChange={handleChangeInput}
                  value={fullname}
                  style={{ background: `${alert.fullname ? "#fd2d6a14" : ""}` }}
                />

                <small className="form-text text-danger">
                  {alert.fullname ? alert.fullname : ""}
                </small>
              </div>
            </div>

            <div className="form-group">
              <div className="input-field">
                <i class="fa fa-user" aria-hidden="true"></i>

                <input
                  type="text"
                  className="username"
                  id="username"
                  name="username"
                  placeholder="Username"
                  onChange={handleChangeInput}
                  value={username.toLowerCase().replace(/ /g, "")}
                  
                />

                <small className="form-text text-danger">
                  {alert.username ? alert.username : ""}
                </small>
              </div>
            </div>

            <div className="form-group">
              <div className="input-field">
                <i class="fa fa-phone" aria-hidden="true"></i>

                <input
                  type="mobile"
                  className="email"
                  id="exampleInputmobile"
                  name="mobile"
                  placeholder="Phone number"
                  onChange={handleChangeInput}
                  value={mobile}
                
                />

                <small className="form-text">
                  {alert.mobile ? alert.mobile : ""}
                </small>
              </div>
            </div>

            <div className="form-group">
              <div className="input-field">
                <i class="fa fa-envelope" aria-hidden="true"></i>

                <input
                  type="email"
                  className="email"
                  id="exampleInputEmail1"
                  name="email"
                  placeholder="Email"
                  onChange={handleChangeInput}
                  value={email}
                 
                />

                <small className="form-text text-danger">
                  {alert.email ? alert.email : ""}
                </small>
              </div>
            </div>

            <div className="form-group">
              <div className="input-field">
                <i class="fa fa-lock" aria-hidden="true"></i>
                <input
                  type={typePass ? "text" : "password"}
                  className="confirm_email"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={handleChangeInput}
                  value={password}
                  name="password"

                />

                <small className="hide" onClick={() => setTypePass(!typePass)}>
                  {typePass ? "Hide" : "Show"}
                </small>
                <small className="form-text text-danger">
                {alert.password ? alert.password : ""}
              </small>
              </div>

              
            </div>

            <div className="form-group">
              <div className="input-field">
                <i class="fa fa-key" aria-hidden="true"></i>
                <input
                  type={typeCfPass ? "text" : "password"}
                  className="cf_password"
                  id="cf_password"
                  placeholder="Confirm Password"
                  onChange={handleChangeInput}
                  value={cf_password}
                  name="cf_password"
                  
                />

                <small
                  className="hide"
                  onClick={() => setTypeCfPass(!typeCfPass)}
                >
                  {typeCfPass ? "Hide" : "Show"}
                </small>
                <small className="form-text text-danger">
                {alert.cf_password ? alert.cf_password : ""}
              </small>
              </div>

              
            </div>

            <div className="gender">
              <label htmlFor="male" className="gender">
                Male:{" "}
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  defaultChecked
                  onChange={handleChangeInput}
                />
              </label>

              <label htmlFor="female" className="gender">
                Female:{" "}
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  onChange={handleChangeInput}
                />
              </label>

              <label htmlFor="other" className="gender">
                Other:{" "}
                <input
                  type="radio"
                  id="other"
                  name="gender"
                  value="other"
                  onChange={handleChangeInput}
                />
              </label>
            </div>

            <button type="submit" className="button">
              Register
            </button>

            <p className="my-2">
              Already have an account?
              <Link to="/" style={{ color: "crimson" }}>
                Login Now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
