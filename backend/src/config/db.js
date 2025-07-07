import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MONOGODB CONNECTED SUCCESSFULLY!");
    } catch (error) {
        console.error("Error connevting to MONGODB", error)
        process.exit(1) // 1 mean exit with failure
    }
}