const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());
app.get("/pokedex", (req, res) => {
  fs.readFile("server/pokedox.json", "utf8", (err, data) => {
    if (err) {
      return res
        .status(400)
        .send("Some error while reading data from the json file");
    }

    res.send(data);
  });
});

const PORT = 8000;
app.listen(PORT, () => console.log(`App is listening on the port ${PORT} ...`));
