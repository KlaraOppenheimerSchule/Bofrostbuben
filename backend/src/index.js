import express from "express";

const app = express();
const port = 3000;

app.get("/string", (req, res) => {
  res.send("teststring");
});

app.get("/int", (req, res) => {
  res.send("10");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
