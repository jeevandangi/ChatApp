import { app } from "./app.js";
import { dbConnect } from "./db/dbConnect.js";



dbConnect().then(() => {
    app.listen(process.env.PORT || 7000, () => {
        console.log(`Server is running on port ${process.env.PORT || 7000}`);

    })
})
    .catch((error) => {
        console.error("Error connecting database:", error);
        process.exit(1)
    })
