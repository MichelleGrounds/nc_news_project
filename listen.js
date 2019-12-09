const app = require("./app");
const { PORT = 9090 } = process.env;

app.listen(PORT, () =>
  console.log(`CORS-enabled web server listening on ${PORT}...`)
);

// app.listen(80, function() {
//   console.log("CORS-enabled web server listening on port 80");
// });
