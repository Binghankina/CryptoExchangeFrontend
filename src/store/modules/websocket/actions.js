const RebuildJSON = json => {
  json = json.filter(e => e !== null);
  return json;
};

export default {
  authenticate({ commit, dispatch }, token) {
    const payload = JSON.stringify({ jwt: token });
    commit("SEND_MESSAGE", payload);
    dispatch("afterAuthenticate");
  },
  afterAuthenticate({ dispatch }) {
    const channels = ["order", "trade", "balance"];
    channels.forEach(channel => dispatch("subscribe", channel));
  },
  subscribe({ state, commit }, channel) {
    state.channel.push(channel);
    const payload = JSON.stringify({
      event: "subscribe",
      streams: [channel]
    });
    commit("SEND_MESSAGE", payload);
  },
  unsubscribe({ state, commit }, channel) {
    let json = state.channel;
    delete json.indexOf(channel);
    state.channel = RebuildJSON(json);
    const payload = JSON.stringify({
      event: "unsubscribe",
      streams: [channel]
    });
    commit("SEND_MESSAGE", payload);
  }
};
