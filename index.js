import app from "./app.js";
import { sequelize } from "./config/Database.js";
import dotenv from "dotenv";
import router from "./routes/index.js";
dotenv.config();

const port = process.env.PORT || 5000;

app.use("/api", router);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync();
        console.log('Database synchronized.');
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
