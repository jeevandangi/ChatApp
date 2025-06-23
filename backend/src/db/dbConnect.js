import mongoose from "mongoose"



const dbConnect = async () => {
    try {
        const res = await mongoose.connect(`${process.env.MONGO_URL}/${process.env.DB_NAME}`)
        console.log("DB connected succesfully");

    } catch (error) {
        console.log("DB connection failed", error);
        process.exit(1);
    }
}

export { dbConnect }