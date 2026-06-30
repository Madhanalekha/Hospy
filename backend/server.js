import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoute.js"

// app config
const app = express()
const port = process.env.PORT || 4000

// middlewares
app.use(express.json())
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',
    'https://adminprescriptodr.vercel.app',
    'https://prescriptoapp-wheat.vercel.app'
  ],
  credentials: true
}))

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)

app.get("/", (req, res) => {
  res.send("API Working")
});

const startServer = async () => {
  try {
    await connectDB();

    if (!process.env.VERCEL && !process.env.NETLIFY) {
      app.listen(port, () => console.log(`Server started on PORT:${port}`))
    }
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
}

startServer();

export default app
