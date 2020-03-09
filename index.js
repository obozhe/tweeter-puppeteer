const Sentiment = require('sentiment');
const { getTweetsBySearch } = require('./TwitterApi');
const sentiment = new Sentiment();

const analyzeTweets = async searchString => {
  const sentimentResults = [];
  const tweets = await getTweetsBySearch(searchString);
  tweets.forEach(tweet => {
    const result = sentiment.analyze(tweet);
    sentimentResults.push(result);
    console.log(result);
    console.log('________________________________________________________');
  });

  const totalSentimentResult = sentimentResults.reduce(
    (result, el) => {
      result.score += el.score;
      result.comparative += el.comparative;
      if (el.score > 0) result.positive++;
      if (el.score === 0) result.neutral++;
      if (el.score < 0) result.negative++;
      return result;
    },
    { score: 0, comparative: 0, positive: 0, neutral: 0, negative: 0 }
  );

  totalSentimentResult.score = totalSentimentResult.score / sentimentResults.length;
  totalSentimentResult.comparative = totalSentimentResult.comparative / sentimentResults.length;

  console.log(totalSentimentResult);
};

const searchString = 'poutin';
analyzeTweets(searchString);
