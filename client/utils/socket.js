const io = require('socket.io-client');

export default function() {
  // const socket = io(); //static
  const socket = io.connect('http://localhost:3000'); //development

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
