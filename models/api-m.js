const fs = require("fs");

exports.selectAllEndpoints = cb => {
  fs.readFile(__dirname + "/../endpoints.json", (err, jsonResponse) => {
    if (err) return err;
    const parsedJsonObject = JSON.parse(jsonResponse);
    return cb(err, parsedJsonObject);
  });
};
