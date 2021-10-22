const Users = require("../models/userModel");
const sendMail = require("./sendMail")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {CLIENT_URL} = process.env
const authCtrl = {
  register: async (req, res) => {
    try {
      const { fullname, username, mobile, email, password, gender } = req.body;
      if (!fullname || !email || !password || !mobile)
        return res.status(400).json({ msg: "Please fill in all fields." });

      let newUserName = username.toLowerCase().replace(/ /g, "");

      if (!validateEmail(email))
        return res.status(400).json({ msg: "Invalid emails." });

      if (!validPhone(mobile))
        return res.status(400).json({ msg: "Invalid phone number." });

      
      const user_email = await Users.findOne({ email });
      if (user_email)
        return res.status(400).json({ msg: "This email already exists." });

      const user_mobile = await Users.findOne({ mobile });
      if (user_mobile)
        return res.status(400).json({ msg: "This mobile already exists." });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters." });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser =
         new Users(
          {
        fullname, username: newUserName, mobile,email, password: passwordHash, gender
      }
    )

      // const activation_token = createActivationToken(newUser);

      // const url = `${CLIENT_URL}/user/activate/${activation_token}`;
      // sendMail( email, url, "Verify your email address");
      

      const access_token = createAccessToken({id: newUser._id})
      const refresh_token = createRefreshToken({id: newUser._id})

      res.cookie('refreshtoken', refresh_token, {
          httpOnly: true,
          path: '/api/refresh_token',
          maxAge: 30*24*60*60*1000 // 30days
      })

      await newUser.save()

      res.json({
        msg: 'Register Success!',
        access_token,
        user: {
            ...newUser._doc,
            password: ''
        }
    })
      
    // res.json({msg: "Register Success! Please activate your email to start."})
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  },
  // activateEmail: async (req, res) => {
  //   try {
  //     const { activation_token } = req.body;
  //     const user = jwt.verify(
  //       activation_token,
  //       process.env.ACTIVATION_TOKEN_SECRET
  //     );

  //     const { fullname,username,mobile, email, password ,gender} = user;

  //     const check = await Users.findOne({ email });
  //     if (check)
  //       return res.status(400).json({ msg: "This email already exists." });
  //       const newUser =
  //       new Users(
  //       {
  //         fullname,
  //         username,
  //         mobile,
  //         email,
  //         password,
  //         gender,
  //       }
  //     )


  //     const access_token = createAccessToken({ id: newUser._id });
  //     const refresh_token = createRefreshToken({ id: newUser._id });

  //     res.cookie("refreshtoken", refresh_token, {
  //       httpOnly: true,
  //       path: "/api/refresh_token",
  //       maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
  //     });

  //     await newUser.save();

  //     res.json({
  //       msg: "Register Success!",
  //       access_token,
  //       user: {
  //         ...newUser._doc,
  //         password: "",
  //       },
  //     });

  //     res.json({ msg: "Account has been activated!" });
  //   } catch (err) {
  //     return res.status(500).json({ msg: err.message });
  //   }
  // },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email }).populate(
        "followers following",
        "avatar username fullname followers following"
      );

      if (!user)
        return res.status(400).json({ msg: "This email does not exist." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Password is incorrect." });

      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
      });

      res.json({
        msg: "Login Success!",
        access_token,
        user: {
          ...user._doc,
          password: "",
        },
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
      return res.json({ msg: "Logged out!" });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  },
  generateAccessToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: "Please login now." });

      jwt.verify(
        rf_token,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, result) => {
          if (err) return res.status(400).json({ msg: "Please login now." });

          const user = await Users.findById(result.id)
            .select("-password")
            .populate(
              "followers following",
              "avatar username fullname followers following"
            );

          if (!user)
            return res.status(400).json({ msg: "This does not exist." });

          const access_token = createAccessToken({ id: result.id });

          res.json({
            access_token,
            user,
          });
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
    // forgotPassword: async (req, res) => {
    //     try {
    //         const { email} = req.body
    //         const user = await Users.findOne({email})
    //         if(!user) return res.status(400).json({msg: "This email does not exist."})

    //         const access_token = createAccessToken({id: user._id})
    //         const url = `${CLIENT_URL}/user/reset/${access_token}`

    //         sendMail(email, url, "Reset your password")
    //         res.json({msg: "Re-send the password, please check your email."})
    //     } catch (err) {
    //         return res.status(500).json({msg: err.message})
    //     }
    // },
    // resetPassword: async (req, res) => {
    //     try {
    //         const {password} = req.body
    //         console.log(password)
    //         const passwordHash = await bcrypt.hash(password, 12)

    //         await Users.findOneAndUpdate({_id: req.user.id}, {
    //             password: passwordHash
    //         })

    //         res.json({msg: "Password successfully changed!"})
    //     } catch (err) {
    //         return res.status(500).json({msg: err.message})
    //     }
    // },
    getUserInfor: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password')

            res.json(user)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getUsersAllInfor: async (req, res) => {
        try {
            const users = await Users.find().select('-password')

            res.json(users)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateUser: async (req, res) => {
        try {
            const {fullname, avatar} = req.body
            await Users.findOneAndUpdate({_id: req.user.id}, {
                fullname, avatar
            })

            res.json({msg: "Update Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateUsersRole: async (req, res) => {
        try {
            const {role} = req.body

            await Users.findOneAndUpdate({_id: req.params.id}, {
                role
            })

            res.json({msg: "Update Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteUser: async (req, res) => {
        try {
            await Users.findByIdAndDelete(req.params.id)

            res.json({msg: "Deleted Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
};

function validPhone(mobile) {
  const re = /^[+]/g;
  return re.test(mobile);
}

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = authCtrl;
