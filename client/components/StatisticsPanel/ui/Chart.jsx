import React, { Component } from 'react';
import ChartJS from 'chart.js';
import IconButton from '@material-ui/core/IconButton';
import LinearIcon from '@material-ui/icons/ShowChart';
import PieIcon from '@material-ui/icons/PieChart';

export default class Chart extends Component {
  constructor() {
    super();
    this.state = {
      linear: true,
    };
    this.linearRef = React.createRef();
    this.pieRef = React.createRef();
    this.toggleGrapgics = this.toggleGrapgics.bind(this);

    this.pie = null;
    this.linear = null;
  }

  componentDidMount() {
    this.drawLinearGraphic();
  }

  drawPieGraphic() {
    const myChartRef = this.pieRef.current.getContext('2d');

    const {
      total: { positive, neutral, negative },
    } = this.props;

    const chart = new ChartJS(myChartRef, {
      type: 'pie',
      data: {
        datasets: [
          {
            data: [positive, neutral, negative],
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
              'rgba(54, 162, 235, 0.4)',
              'rgba(255, 206, 86, 0.4)',
              'rgba(255, 99, 132, 0.4)',
            ],
          },
        ],
        labels: ['Positive', 'Neutral', 'Negative'],
      },
      options: {},
    });

    this.pie = chart;
  }

  drawLinearGraphic() {
    const myChartRef = this.linearRef.current.getContext('2d');

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

    const chart = new ChartJS(myChartRef, {
      type: 'line',
      data: {
        labels: id,
        datasets: [
          {
            label: 'Sentimental score',
            data: score,
            backgroundColor: ['rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
            borderWidth: 0.7,
          },
          {
            label: 'Sentimental comparative',
            data: comparative,
            backgroundColor: ['rgba(255, 206, 86, 0.2)'],
            borderColor: ['rgba(255, 206, 86, 1)'],
            borderWidth: 0.7,
          },
          {
            label: 'Count of positive words',
            data: positive,
            backgroundColor: ['rgba(75, 192, 192, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)'],
            borderWidth: 0.7,
          },
          {
            label: 'Count of negative words',
            data: negative,
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)'],
            borderWidth: 0.7,
          },
        ],
      },
      options: {},
    });

    this.linear = chart;
  }

  toggleGrapgics() {
    if (this.state.linear) this.linear.destroy();
    else this.pie.destroy();

    this.setState({ linear: !this.state.linear }, () => {
      if (this.state.linear) this.drawLinearGraphic();
      else this.drawPieGraphic();
    });
  }

  render() {
    return (
      <>
        <IconButton onClick={this.toggleGrapgics}>
          {this.state.linear ? <PieIcon /> : <LinearIcon />}
        </IconButton>
        {this.state.linear ? (
          <canvas id="linear" ref={this.linearRef} />
        ) : (
          <canvas id="pie" ref={this.pieRef} />
        )}
      </>
    );
  }
}
