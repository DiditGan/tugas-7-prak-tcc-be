import { User } from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'email']
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ msg: "Semua field wajib diisi" });
        }
        const existing = await User.findOne({ where: { email } });
        if (existing) {
            return res.status(400).json({ msg: "Email sudah terdaftar" });
        }
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        await User.create({
            name: name,
            email: email,
            password: hashPassword
        });
        res.status(201).json({ msg: "Register berhasil" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (!user) return res.status(404).json({ msg: "Email tidak ditemukan" });
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) return res.status(400).json({ msg: "Wrong Password" });
        const userId = user.id;
        const name = user.name;
        const email = user.email;
        const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1h'
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const logout = async (req, res) => {
    res.sendStatus(200);
}
