const Results = require('../models/Results');

function getResults(_, res) {
  const query = Results.find();
  query.exec((err, results) => {
    if (err) res.send(err);
    else
      res.json(
        results.map((result) => {
          return {
            id: result._id,
            total: result.totalSentimentResult,
            searchString: result.searchString,
            createdAt: result.createdAt,
          };
        })
      );
  });
}

function saveResults(req, res) {
  const newResults = new Results(req.body);

  newResults.save((err, results) => {
    if (err) res.send(err);
    else res.json({ message: 'Results successfully saved!', results });
  });
}

function getResultsById(req, res) {
  Results.findById(req.params.id, (err, results) => {
    if (err) res.send(err);
    else res.json(results);
  });
}

function deleteResultsById(req, res) {
  Results.deleteOne({ _id: req.params.id }, (err, result) => {
    if (err) res.send(err);
    else res.json({ message: 'Results successfully deleted!', result });
  });
}

module.exports = { getResults, saveResults, getResultsById, deleteResultsById };
