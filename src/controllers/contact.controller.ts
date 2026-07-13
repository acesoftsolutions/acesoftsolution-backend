import { Request, Response } from "express";

import Contact from "../models/Contact";

import EmailService from "../services/email.service";

import { IContact } from "../types/contact";

export const submitContact = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      name,
      email,
      phone,
      company,
      message,
      needsNDA,
      marketingConsent,
    }: IContact = req.body;

    // Save enquiry
    const contact = await Contact.create({
      name,
      email,
      phone,
      company,
      message,
      needsNDA,
      marketingConsent,
    });

    // Send email to admin
    await EmailService.sendAdminEmail({
      name,
      email,
      phone,
      company,
      message,
      needsNDA,
      marketingConsent,
    });

    // Send thank you email
    await EmailService.sendCustomerEmail({
      name,
      email,
      phone,
      company,
      message,
      needsNDA,
      marketingConsent,
    });

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully.",
      data: {
        id: contact._id,
      },
    });
  } catch (error) {
    console.error("Contact Controller Error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};