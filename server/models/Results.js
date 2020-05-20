const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResultsSchema = new Schema(
  {
    searchString: { type: String, required: true },
    sentimentResults: [
      {
        id: { type: Number, required: true },
        tweet: { type: String, required: true },
        score: { type: Number, required: true },
        comparative: { type: Number, required: true },
        calculation: [{ strict: false }],
        tokens: [{ type: String }],
        words: [{ type: String }],
        positive: [{ type: String }],
        negative: [{ type: String }],
      },
    ],
    totalSentimentResult: {
      score: { type: String, required: true },
      comparative: { type: String, required: true },
      positive: { type: Number, required: true },
      neutral: { type: Number, required: true },
      negative: { type: Number, required: true },
      count: { type: Number, required: true },
    },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

ResultsSchema.pre('save', (next) => {
  now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model('analysisResults', ResultsSchema);
