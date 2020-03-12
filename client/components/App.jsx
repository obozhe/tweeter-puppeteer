import React from 'react';
import SearchPanel from './SearchPanel';
import socket from '../utils/socket';

import { CSSTransition } from 'react-transition-group';

import '../assets/scss/App.scss';
import StatusHandler from './StatusHandler';
import StatisticsPanel from './StatisticsPanel';
import Error from './Error';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      showStatusPanel: false,
      showStatisticsPanel: false,
      statuses: [],
      result: null,
      connected: true
    };

    this.socket = null;
    this.analyze = this.analyze.bind(this);
  }

  componentDidMount() {
    this.socket = socket(connected => {
      this.setState({ connected });
    });

    this.socket.registerAnalyzeResults(result => {
      console.log(result);
      this.setState({ result, showStatusPanel: false });
    });

    this.socket.registerStatusUpdating(status => {
      this.setState({ statuses: [...this.state.statuses, status] });
    });
  }

  analyze(searchValue) {
    this.setState({
      showStatisticsPanel: false,
      statuses: [],
      showStatusPanel: true
    });
    this.socket.startAnalyze(searchValue);
  }

  render() {
    const {
      statuses,
      result,
      showStatusPanel,
      showStatisticsPanel,
      connected,
      loaded
    } = this.state;
    return (
      <div>
        {!connected && !result && <Error />}
        <SearchPanel start={this.analyze} />
        <div className="main-section">
          <CSSTransition
            in={showStatusPanel}
            classNames="fade"
            timeout={500}
            onExited={() => this.setState({ showStatisticsPanel: true })}
            mountOnEnter
            unmountOnExit
          >
            <StatusHandler statuses={statuses} />
          </CSSTransition>
          <CSSTransition
            in={showStatisticsPanel}
            classNames="fade"
            timeout={500}
            onExited={() => this.setState({ result: null })}
            mountOnEnter
            unmountOnExit
          >
            <StatisticsPanel analyzeResults={result} />
          </CSSTransition>
        </div>
      </div>
    );
  }
}
