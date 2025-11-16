const fs = require("fs");
const path = require("path")

const deleteFile = (filename) => {
  const filePath = path.join(process.cwd(), "uploads", filename);
  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) console.log("Error deleting file:", err);
    });
  }
};

const convertToMinutes = (time) => {
    const [h, m] = time.split(":");
    return Number(h) * 60 + Number(m);
  };

  const createTimeInText = (time) => {
    return `${String(Math.floor(time / 60)).length < 2 ? String(Math.floor(time / 60)).padStart(2,"0") : Math.floor(time / 60) }:${String(Math.floor(time % 60)).length < 2 ? String(Math.floor(time % 60)).padStart(2,"0") : Math.floor(time % 60) }`
  }

  module.exports = {createTimeInText,convertToMinutes,deleteFile}
