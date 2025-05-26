import { Sequelize } from "sequelize";
import { sequelize } from "../config/Database.js";
import { User } from "./UserModel.js";

const { DataTypes } = Sequelize;

export const Note = sequelize.define('notes', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true
});

User.hasMany(Note, { foreignKey: 'userId', as: 'notes' });
Note.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// (async () => {
//     await sequelize.sync();
// })();
