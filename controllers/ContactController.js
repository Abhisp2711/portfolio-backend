const Contact = require("../models/Contact");
const transporter = require("../config/mailer");

exports.sendContactMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    //save messaage to MongoDB
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    //Email to you
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission from ${name}`,
      test: `
         Name:${name},
         Email: ${email},
         Message:${message},
      `,
    });

    //Automatic reply to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for contacting me!",
      text: `Hello ${name},\n\nThank you for your message! I will get back to you as soon as possible.\n\nBest regards,\nAbhishek kumar singh`,
    });
    res
      .status(200)
      .json({ success: true, message: "Messaage sent & saved successfully! " });
  } catch (err) {
    console.error("Error sending message: ", err);
    res.status(500).json({ error: "Failed to process  message" });
  }
};
