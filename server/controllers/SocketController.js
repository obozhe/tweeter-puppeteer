const analyzeTweets = require('../utils/analyzer');

const search = async (socket, searchString) => {
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
};

module.exports = { search };
