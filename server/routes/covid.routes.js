const predict = require("../utils/predict");

module.exports = (app) => {

  app.post("/api/covid/predict",
    [
      (req, res) => {

        const data = req.body;

        console.log(data);

        const result = predict(data);

        return res.status(200).json(result);
      }
    ]
  );
}
