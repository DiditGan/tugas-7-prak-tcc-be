import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;


const Note = db.define(
  "note",
  {
    judul: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isi: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Note;

(async () => {
  await db.sync();
})();
