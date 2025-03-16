import { Sequelize } from "sequelize";

const db = new Sequelize('notes_db', 'root', '', {
    host: '34.27.245.29',
    dialect: 'mysql',
});

export default db;