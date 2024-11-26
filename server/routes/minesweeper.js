const express = require("express");
const router = express.Router();

router.get("/download", (req, res) => {
  let filePath = "./public/Projects/Minesweeper Installer.msi";
  res.download(filePath, "Minesweeper Installer.msi", (err) => {
    if (err) {
      console.error(`File not downloaded: ${err}`);
      res.status(500).send("File could not be downloaded");
    }
  });
});

module.exports = router;
 