const io = require('socket.io-client');

export default function() {
  const port = DEVELOPMENT ? 'http://localhost:3000' : '';
  const socket = io.connect(port);

  socket.on('error', err => console.log('socket error:', err));

  function startAnalyze(searchString) {
    socket.emit('search', searchString);
  }

  function registerAnalyzeResults(onResult) {
    socket.on('analyzeResult', onResult);
  }

  function registerStatusUpdating(onStatusUpdate) {
    socket.on('status', onStatusUpdate);
  }

  return {
    startAnalyze,
    registerAnalyzeResults,
    registerStatusUpdating
  };
}
