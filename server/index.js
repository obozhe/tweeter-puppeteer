const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const RestController = require('./controllers/RestController');
const analyzeTweets = require('./utils/analyzer');

const port = process.env.PORT || 3000;
const dbHost = 'mongodb://localhost/twitter-analysis';

if (process.env.NODE_ENV === 'production') app.use(express.static(path.join(__dirname, '../dist')));

mongoose.connect(dbHost, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

io.on('connection', (socket) => {
  socket.on('search', async (searchString) => {
    const result = await analyzeTweets(searchString, socket);
    if (result) {
      socket.emit('status', {
        message: `Done! Analyzed ${result.totalSentimentResult.count} tweets.`,
        done: true,
        error: false,
      });
      result.searchString = searchString;
      socket.emit('analyzeResult', result);
    }
  });
});

if (process.env.NODE_ENV !== 'production') {
  const allowCrossDomain = function (_, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
  };
  app.use(allowCrossDomain);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.route('/api/results')
    .get(RestController.getResults)
    .post(RestController.saveResults);

app.route('/api/:id')
    .get(RestController.getResultsById)
    .delete(RestController.deleteResultsById);

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});
