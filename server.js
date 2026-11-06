import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line

app.get("/api", (req, res) => {
  return res.json({
    unix: Date.now(),
    utc: new Date().toUTCString()
  });
});

app.get("/api/{:date}", (req, res) => {
  const date = req.params?.date
  
  const parsedDate = !isNaN(Number(date)) && Number.isInteger(Number(date)) ? new Date(parseInt(date)) : new Date(date);

  if (isNaN(parsedDate)) {
    // invalid date
    return res.status(404).json({ error: "Invalid Date" })
  }

  const unix = Math.floor(parsedDate.getTime())
  const utc = parsedDate.toUTCString()

  const body = { unix, utc }

  res.status(200).json(body)
})

// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
