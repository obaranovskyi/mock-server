module.exports = {
	routes: [
		{
			type: "get",
			url: "/person",
			data: require("./person")
		},
		{
			type: "post",
			url: "/dog",
			data: require("./dog")
		}
	]
}