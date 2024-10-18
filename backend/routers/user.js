import express from "express";
import usermodel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const router = express.Router();
router.use(express.json());
router.get("/", (req, res) => res.json({ message: "from router" }));

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await usermodel.findOne({ email });
  if (user) {
    return res.json({ status: false, message: "User Already exists" });
  }
  const hashpassword = await bcrypt.hash(password, 10);
  const newUser = new usermodel({
    username: username,
    password: hashpassword,
    email: email,
  });
  await newUser.save();
  return res.json({ status: true, message: "User created successfully" });
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await usermodel.findOne({ email });
  if (!user) {
    return res.json({ status: false, message: "User Doesn't exists" });
  }
  const ispassword = await bcrypt.compare(password, user.password);
  if (!ispassword) {
    return res.json({ status: false, message: "Incorrect password" });
  }
  const token = jwt.sign({ username: user.username,email:user.email }, process.env.KEY, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
  return res.json({ message: "login success", status: true });
});

router.get("/", (req, res) => res.send("Home"));

router.post("/forgot", async (req, res) => {
  const { email } = req.body;
  const user = await usermodel.findOne({ email });
  if (!user) {
    return res.json({ status: false, message: "User Doesn't exists" });
  }
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "saichithrarao@gmail.com",
      pass: "tjyk ivts zfys vxvf",
    },
  });
  const token = jwt.sign({ username: user.username,email:user.email }, process.env.KEY, {
    expiresIn: "1hr",
  });
  var mailOptions = {
    from: "saichithrarao@gmail.com",
    to: email,
    subject: "Reset Password",
    text: `http://localhost:5000/reset/${token}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return res.json({ status: false, message: "email not sent" });
    } else {
      return res.json({ status: true, message: "email sent" });
    }
  });
});

router.post("/reset/:token", async (req, res) => {
  const token = req.params.token;
  const password = req.body;
  try {
    const decoded = jwt.verify(token, process.env.KEY);
    const id = decoded.id;
    const hashpassword = await bcrypt.hash(password, 10);
    await user.findByTdAndUpdate({ _id: id }, { password: hashpassword });
    return res.json({ status: true, message: "updated password" });
  } catch (err) {
    return res.json({ status: false, message: "not updated password" });
  }
});

const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: false, message: "no token" });
    }
    const decoded = jwt.verify(token, process.env.KEY);
    next();
  } catch (err) {
    return res.json(err);
  }
};

router.get("/username", (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: true, message: "no user login" });
    }
    const decoded = jwt.verify(token, process.env.KEY);
    return res.json({ status: true, username: decoded.username});
  } catch (err) {
    return res.json(err);
  }
});
router.get("/email", (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: true, message: "no user login" });
    }
    const decoded = jwt.verify(token, process.env.KEY);
    return res.json({ status: true, email: decoded.email });
  } catch (err) {
    return res.json(err);
  }
});

router.get("/auth/verify", verifyUser, async (req, res) => {
  return res.json({ status: true, message: "authorized" });
});

router.get("/auth/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ status: true });
});

router.get("/profile", verifyUser, (req, res) => {
  const { role } = req.username;
  if (role !== "admin") {
    return res
      .status(403)
      .json({ status: false, message: "Forbidden: Access denied" });
  }

  res.status(200).json({ status: true, message: "Authorized: Admin profile" });
});

export { router as Userrouter };
