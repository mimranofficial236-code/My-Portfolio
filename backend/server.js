const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('../')); // Serve frontend files

// Email transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'mimranofficial236@gmail.com',
        subject: `Portfolio Contact: Message from ${name}`,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background: #1a1a2e; color: #e0e0e0;">
                <h2 style="color: #00f0ff; border-bottom: 2px solid #00f0ff; padding-bottom: 10px;">
                    New Contact Form Submission
                </h2>
                <p><strong style="color: #00f0ff;">Name:</strong> ${name}</p>
                <p><strong style="color: #00f0ff;">Email:</strong> ${email}</p>
                <p><strong style="color: #00f0ff;">Message:</strong></p>
                <p style="background: #0a0a0f; padding: 15px; border-radius: 8px;">${message}</p>
                <hr style="border-color: #00f0ff; margin: 20px 0;">
                <p style="font-size: 12px; color: #888;">Sent from Muhammad Imran's Portfolio</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ success: false, message: 'Failed to send message' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
