import mongoose from "mongoose";
import bcrypt from "bcrypt";
import doctorModel from "./models/doctorModel.js";
import 'dotenv/config';

const createDoctor = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI?.trim();
        if (!mongoUri) {
            console.error("MONGODB_URI is not defined");
            return;
        }

        await mongoose.connect(mongoUri.endsWith('/') ? `${mongoUri}prescripto` : `${mongoUri}/prescripto`);
        console.log("DB Connected");

        const salt = await bcrypt.genSalt(10);

        const doctorsToSeed = [
            {
                email: "dr.asha@example.com",
                password: "Doctor@123",
                name: "Dr. Asha Gupta",
                image: "https://via.placeholder.com/150",
                speciality: "General physician",
                degree: "MBBS, MD",
                experience: "8+ Years",
                about: "Dr. Asha Gupta focuses on preventive care and long-term wellness for patients of all ages.",
                fees: 500,
                address: { line1: "12 Health Street", line2: "Downtown" },
                available: true,
                date: Date.now()
            },
            {
                email: "dr.meera@example.com",
                password: "Doctor@123",
                name: "Dr. Meera Rao",
                image: "https://via.placeholder.com/150",
                speciality: "Gynecologist",
                degree: "MBBS, DGO",
                experience: "10+ Years",
                about: "Dr. Meera Rao provides compassionate gynecological care and personalized treatment plans.",
                fees: 700,
                address: { line1: "45 Wellness Road", line2: "North City" },
                available: true,
                date: Date.now()
            },
            {
                email: "dr.kiran@example.com",
                password: "Doctor@123",
                name: "Dr. Kiran Verma",
                image: "https://via.placeholder.com/150",
                speciality: "Dermatologist",
                degree: "MBBS, DDVL",
                experience: "7+ Years",
                about: "Dr. Kiran Verma specializes in skin treatments, acne care, and dermatology consultations.",
                fees: 650,
                address: { line1: "88 Skin Care Avenue", line2: "West End" },
                available: true,
                date: Date.now()
            }
        ];

        for (const doctorData of doctorsToSeed) {
            const hashedPassword = await bcrypt.hash(doctorData.password, salt);
            const existingDoctor = await doctorModel.findOne({ email: doctorData.email });

            if (existingDoctor) {
                await doctorModel.findByIdAndUpdate(existingDoctor._id, {
                    ...doctorData,
                    password: hashedPassword,
                });
            } else {
                const newDoctor = new doctorModel({
                    ...doctorData,
                    password: hashedPassword,
                });
                await newDoctor.save();
            }
        }

        console.log("Seeded doctors with descriptions");

    } catch (error) {
        console.error("Error creating doctor:", error);
    } finally {
        mongoose.disconnect();
    }
};

createDoctor();
