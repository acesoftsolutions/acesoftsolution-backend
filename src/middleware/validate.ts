import { Request, Response, NextFunction } from "express";
import validator from "validator";

const validateContact = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    email,
    phone,
    company,
    message,
    needsNDA,
  } = req.body;

  if (!name || name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: "Name is required",
    });
  }

  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email address",
    });
  }

  if (!phone || phone.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Invalid phone number",
    });
  }

  if (!company) {
    return res.status(400).json({
      success: false,
      message: "Company is required",
    });
  }

  if (!message || message.length < 10) {
    return res.status(400).json({
      success: false,
      message: "Message is too short",
    });
  }

  if (
    needsNDA !== "yes" &&
    needsNDA !== "no"
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid NDA value",
    });
  }

  next();
};

export default validateContact;