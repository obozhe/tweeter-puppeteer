const Sentiment = require('sentiment');
const sentiment = new Sentiment();

const getTweetsBySearch = require('./TwitterApi');

const convertResults = (result, tweet) => {
  result.score += tweet.score;
  result.comparative += tweet.comparative;
  if (tweet.score > 0) result.positive++;
  if (tweet.score === 0) result.neutral++;
  if (tweet.score < 0) result.negative++;
  return result;
};

const analyzeTweets = async (searchString, socket) => {
  const tweets = await getTweetsBySearch(searchString, socket);
  if (!tweets) return;
  const sentimentResults = [];

  Array.from(tweets).forEach((tweet, id) => {
    const formattedTweet = tweet.replace(/https:\/\/t.co\/\w+/g, '');
    const result = sentiment.analyze(formattedTweet);
    sentimentResults.push({ id, tweet: formattedTweet, ...result });
  });

  const totalSentimentResult = sentimentResults.reduce(convertResults, {
    score: 0,
    comparative: 0,
    positive: 0,
    neutral: 0,
    negative: 0,
  });

  totalSentimentResult.score = totalSentimentResult.score / sentimentResults.length;
  totalSentimentResult.comparative = totalSentimentResult.comparative / sentimentResults.length;
  totalSentimentResult.count = sentimentResults.length;

  return { sentimentResults, totalSentimentResult };
};

module.exports = analyzeTweets;
