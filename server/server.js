const express = require("express");
const app = express();
const port = process.env.PORT || 8081;

app.use(require("cors")());
app.use(express.json());
app.use("/api/todos", require("./routes/todos"));

app.listen(port, () => console.log(`Listening on port ${port}`));
