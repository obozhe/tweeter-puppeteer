import React, { Component } from 'react';
import ChartJS from 'chart.js';

export default class Chart extends Component {
  constructor() {
    super();
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext('2d');
    const { sentimentResults } = this.props;
    const { id, score, comparative, positive, negative } = sentimentResults.reduce(
      (data, { id, score, comparative, positive, negative }) => {
        data.id.push(id);
        data.score.push(score);
        data.comparative.push(comparative);
        data.positive.push(positive.length);
        data.negative.push(negative.length);
        return data;
      },
      { id: [], score: [], comparative: [], positive: [], negative: [] }
    );

    new ChartJS(myChartRef, {
      type: 'line',
      data: {
        labels: id,
        datasets: [
          {
            label: 'Sentimental score',
            data: score,
            backgroundColor: ['rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
            borderWidth: 0.7
          },
          {
            label: 'Sentimental comparative',
            data: comparative,
            backgroundColor: ['rgba(255, 206, 86, 0.2)'],
            borderColor: ['rgba(255, 206, 86, 1)'],
            borderWidth: 0.7
          },
          {
            label: 'Count of positive words',
            data: positive,
            backgroundColor: ['rgba(75, 192, 192, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)'],
            borderWidth: 0.7
          },
          {
            label: 'Count of negative words',
            data: negative,
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)'],
            borderWidth: 0.7
          }
        ]
      },
      options: {}
    });
  }
  render() {
    return <canvas id="myChart" ref={this.chartRef} />;
  }
}
