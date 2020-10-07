const socket = new WebSocket(config.api.ws);

const waitForConnection = callback => {
  if (socket.readyState) callback();
  else {
    setTimeout(() => {
      waitForConnection(callback);
    }, 10);
  }
};
export default () => store => {
  socket.onopen = () => {
    store.state.websocket.isConnected = true;
    store.dispatch("websocket/subscribe", "global.tickers");
  };
  socket.onclose = () => {};
  socket.onmessage = ({ data }) => {
    const payload = JSON.parse(data);
    store.dispatch("public/handling", payload);
    store.dispatch("exchange/handling", payload);
    store.dispatch("exchange/privateHandling", payload);
    store.dispatch("user/BalanceLogic", payload);
  };
  store.subscribe(mutation => {
    if (mutation.type === "websocket/SEND_MESSAGE")
      waitForConnection(() => socket.send(mutation.payload));
  });
};
