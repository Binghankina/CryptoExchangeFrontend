export default {
  loadingStatus: state => state.mine_control.loading,
  checkAvailableDepth: state => state["depth"].asks.length || state["depth"].bids.length,
  getControlOrderArray: state => state.mine_control.array_orders,
  getControlTradeArray: state => state.mine_control.array_trades
};
