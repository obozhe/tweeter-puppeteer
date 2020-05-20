import React from 'react';
import SearchPanel from './SearchPanel/SearchPanel';
import socket from '../utils/socket';

import { CSSTransition } from 'react-transition-group';

import StatusHandler from './utils/StatusHandler';
import StatisticsPanel from './StatisticsPanel/StatisticsPanel';
import Error from './utils/Error';

import RestController from '../utils/RestController';

import './App.scss';
export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      showStatusPanel: false,
      showStatisticsPanel: false,
      statuses: [],
      result: null,
      connected: true,
      savedResults: [],
    };

    this.socket = null;
    this.analyze = this.analyze.bind(this);
    this.openSavedResults = this.openSavedResults.bind(this);
    this.loadSavedResults = this.loadSavedResults.bind(this);
    this.initState = this.initState.bind(this);
  }

  componentDidMount() {
    this.loadSavedResults();
    this.socket = socket((connected) => {
      this.setState({ connected });
    });

    this.socket.registerAnalyzeResults((result) => {
      this.setState({ result, showStatusPanel: false });
    });

    this.socket.registerStatusUpdating((status) => {
      this.setState({ statuses: [...this.state.statuses, status] });
    });
  }

  componentWillUnmount() {
    this.socket.unregister();
  }

  loadSavedResults() {
    RestController.getResults().then((res) => this.setState({ savedResults: res.reverse() }));
  }

  analyze(searchValue) {
    this.setState({
      showStatisticsPanel: false,
      statuses: [],
      showStatusPanel: true,
    });
    this.socket.startAnalyze(searchValue);
  }

  openSavedResults(resultId) {
    RestController.getResultsById(resultId).then((result) =>
      this.setState({ showStatisticsPanel: true, result })
    );
  }

  initState() {
    location.reload();
  }

  render() {
    const {
      statuses,
      result,
      showStatusPanel,
      showStatisticsPanel,
      connected,
      savedResults,
    } = this.state;
    return (
      <div>
        {!connected && !result && <Error />}
        <SearchPanel
          close={showStatisticsPanel || showStatusPanel}
          start={this.analyze}
          savedResults={savedResults}
          openResults={this.openSavedResults}
          loadResults={this.loadSavedResults}
          backToInit={this.initState}
        />
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
