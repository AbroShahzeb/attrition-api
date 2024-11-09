import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Attrition from "./models/attritionModel.js";

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Database connected:", conn?.connection?.host);
};

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Hello world",
  });
});

app.get("/all", async (req, res, next) => {
  const data = await Attrition.find();
  res.status(200).json({
    status: "success",
    message: "Data fetched successfully",
    count: data?.length,
    data: data,
  });
});

app.get("/all/:id", async (req, res, next) => {
  const data = await Attrition.findById(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Data fetched successfully",
    data: data,
  });
});

app.get("/employee", async (req, res, next) => {
  const data = await Attrition.find().select(
    "age dailyRate hourlyRate department gender maritalStatus monthlyIncome"
  );
  res.status(200).json({
    status: "success",
    message: "Data fetched successfully",
    count: data?.length,
    data: data,
  });
});

app.get("/employee/:id", async (req, res, next) => {
  const data = await Attrition.findById(req.params.id).select(
    "age dailyRate hourlyRate department gender maritalStatus monthlyIncome"
  );
  res.status(200).json({
    status: "success",
    message: "Data fetched successfully",
    data: data,
  });
});

app.get("/attrition", async (req, res, next) => {
  const data = await Attrition.find({ attrition: "Yes" });
  res.status(200).json({
    status: "success",
    message: "Data fetched successfully",
    count: data?.length,
    data: data,
  });
});

app.get("/no-attrition", async (req, res, next) => {
  const data = await Attrition.find({ attrition: "No" });
  res.status(200).json({
    status: "success",
    message: "Data fetched successfully",
    count: data?.length,
    data: data,
  });
});

connectDB().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${process.env.PORT || 3000}`);
  });
});
