const io = require('socket.io-client');

export default function(toogleConnectionState) {
  const port = DEVELOPMENT ? 'http://localhost:3000' : '';
  const socket = io.connect(port);

  socket.on('connect', () => toogleConnectionState(true));
  socket.on('disconnect', () => toogleConnectionState(false));
  socket.on('error', () => toogleConnectionState(false));

  function startAnalyze(searchString) {
    socket.emit('search', searchString);
  }

  function registerAnalyzeResults(onResult) {
    socket.on('analyzeResult', onResult);
  }

  function regImg(img) {
    socket.on('img', img);
  }

  function registerStatusUpdating(onStatusUpdate) {
    socket.on('status', onStatusUpdate);
  }

  return {
    regImg,
    startAnalyze,
    registerAnalyzeResults,
    registerStatusUpdating
  };
}
