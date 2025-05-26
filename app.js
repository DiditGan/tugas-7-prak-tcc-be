import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(cors({
    credentials: true,
    origin: [
        'https://c-04-460105.uc.r.appspot.com'
        // 'http://localhost:3000' // uncomment jika ingin support local dev
    ]
}));
app.use(cookieParser());
app.use(express.json());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

export default app;
