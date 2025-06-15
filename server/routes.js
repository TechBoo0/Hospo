const express = require("express");
const Medcard = require("./Medcard");
const router = express.Router();
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require('uuid'); 
const Delivery = require("./Delivarys");
const Doctor = require("./Doctor");
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mohanavamsi14@gmail.com',
        pass: 'wken sosx ofjc cqvu'
    }
});
router.get("/medcards", async (req, res) => {
    try {
        const data = await Medcard.find({});
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch medcards' });
    }
});

router.post("/medications",async (req,res)=>{
    const {id,medications}=req.body
    const pasient = await Medcard.findById(id)
    pasient.medications=medications
})
router.post("/register", async (req, res) => {
    const {
        name,
        email,
        phone,
        address,
        registrationType,
        symptoms,
        medications,
        date,
        doctorId,
        deliveryRequired
    } = req.body;

    console.log(req.body);
    const doc=await Doctor.findById(doctorId)
    console.log(doc);
    const mailOptions = {
        from: 'mohanavamsi14@gmail.com',
        to: doc.email,
        subject: 'New Registration',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                <h3 style="color: #333;">Hey Doc,</h3>
                <p style="font-size: 16px; color: #555;">You have a new booking on <strong style="color: #28a600;">${date}</strong>.</p>
                <p style="font-size: 16px; color: #555;"><strong>Patient Details:</strong></p>
                <ul style="font-size: 16px; color: #555;">
                    <li><strong>Name:</strong> ${name}</li>
                    <li><strong>Email:</strong> ${email}</li>
                    <li><strong>Patient ID:</strong> ${email.split("@")[0]}</li>
                    <li><strong>Phone:</strong> ${phone}</li>
                    <li><strong>Address:</strong> ${address}</li>
                    <li><strong>Registration Type:</strong> ${registrationType}</li>
                    <li><strong>Symptoms:</strong> ${symptoms}</li>
                    <li><strong>Medications:</strong> ${medications}</li>
                </ul>
                <p>And the id:</p><b>${email.split("@")[0]}</b>
                <p style="font-size: 16px; color: #555;">If you'd like to confirm, please use the link below:</p>
                <a href="https://hospo.onrender.com/conform/${email}/${phone}" style="display: inline-block; padding: 10px 15px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px;">Confirm Booking</a>
                <a href="https://chayoo.vercel.app/video" style="display: inline-block; padding: 10px 15px; background-color: #009bff; color: white; text-decoration: none; border-radius: 5px;"> &#xF21F; Meeting Link</a>
                <p style="font-size: 16px; color: #555; margin-top: 20px;">And here is your <a href="https://chayoo.vercel.app/video" style="color: #007bff;">meeting link</a>.</p>
            </div>
        `
    };

    try {
        await Medcard.create(req.body);
        const mail = await transporter.sendMail(mailOptions);
        console.log(mail);
        res.status(200).json({ message: 'Email sent successfully',delivery:deliveryRequired,name,email});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});


router.get("/conform/:email/:id", async (req, res) => {
    const { email, id } = req.params;
    try {
        const mailOptions = {
            from: 'mohanavamsi14@gmail.com',
            to: email,
            subject: 'Booking Confirmed',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                    <h3 style="color: #333;">Hello,</h3>
                    <p style="font-size: 16px; color: #555;">Your schedule is confirmed. Please join the meeting at the scheduled time by clicking the link below:</p>
                    <a href="https://hospo-ten.vercel.app/meeting/${email.split("@")[0]}" style="display: inline-block; padding: 10px 15px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Join Meeting</a>
                    <p style="font-size: 16px; color: #555; margin-top: 20px;">The meeting is scheduled for 9:30 on the specified date.</p>
                </div>
            `
        };
        await transporter.sendMail(mailOptions);
        const pasient=await Medcard.findById(id)
        pasient.confirm=true
        await pasient.save()
        res.status(200).json({ message: 'Booking confirmed successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to confirm booking' });
    }
});
router.post("/delivery", async (req, res) => {

    const { name, email} = req.body;


    try {
        const orderId = uuidv4(); 

        const newDelivery = new Delivery({
            orderId,
            customerName:name,
            email,
            deliveryDetails:" AS price",
        });

        const savedDelivery = await newDelivery.save();

        const mailOptions = {
            from: 'mohanavamsi14@gmail.com', 
            to: email,                    
            subject: 'Delivery Status Update',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; color: #333;">
                    <h2 style="color: #5c5c5c;">Your Delivery is on the Way!</h2>
                    <p style="font-size: 16px;">Here are the details of your delivery:</p>
                    <p style="font-size: 16px; color: #333;">Click the button below to view more details:</p>
                    <a href="https://hospo-ten.vercel.app/track" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-align: center; border-radius: 5px; text-decoration: none; font-size: 16px;">View Your Delivery</a>
                    <p style="font-size: 12px; color: #777; margin-top: 20px;">If you have any questions, feel free to reply to this email.</p>
                </div>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Error sending email', error });
            } else {
                console.log('Email sent:', info.response);
            }
        });

        return res.status(201).json({ message: 'Delivery created successfully', delivery: savedDelivery });
    } catch (error) {
        console.error('Error creating delivery:', error);
        return res.status(500).json({ message: 'Error creating delivery', error });
    }
});

module.exports = router;
