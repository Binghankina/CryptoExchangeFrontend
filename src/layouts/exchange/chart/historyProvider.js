import { isMarket } from "@/helpers";
var rp = require('request-promise').defaults({
  json: true
})
//TODO change the API here to peatio.
const history = {}

export default {
  history: history,
  getBars: function(symbolInfo, resolution, from, to, first, limit) {
    console.log(symbolInfo, resolution, from, to, first, limit)
    var url = "public/markets/" + isMarket() + "/k-line";
    if (isNaN(localStorage.getItem("tradingview.resolution"))) {
        var period = 1440
    } else {
        var period = localStorage.getItem("tradingview.resolution")
    }

		return new ApiClient("trade")
				.get(url, {
					period: period || "15",
					time_from: from,
					time_to: to,
					limit: '2000'
				})
				.then((res) => {
					// console.log(res)
					if (res.status === 200) {
						var data = res.data
						if (data.length) {
							var bars = data.map(el => {
								return {
									time: el[0] * 1000, //TradingView requires bar time in ms
									low: el[1],
									high: el[2],
									open: el[3],
									close: el[4],
									volume: el[5]
								}
							})
							if (first) {
		            var lastBar = bars[bars.length - 1]
		            history[symbolInfo.name] = {
		              lastBar: lastBar
		            }
		          }
		          return bars
						} else {
							return []
						}
					} else {
						return []
					}
				})
				.catch(error => error);
  }
}
