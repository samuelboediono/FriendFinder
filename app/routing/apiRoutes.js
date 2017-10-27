var friendList = require("../data/friends.js");

module.exports = function(app) {

	app.get("/api/friends", function(req,res) {
		res.json(friendList);
	});

	app.post("/api/friends", function(req,res) {

		var match = {
			name: "",
			photo: "",
			friendComparison: 500
		};

		var friendData = req.body;
		var friendName = friendData.name;
		var friendPhoto = friendData.photo;
		var friendScore = friendData.scores;

		var scoresDiff = 0;

		for (var i = 0; i < friendList.length; i++) {

			// console.log(friendList[i].name);
			scoresDiff = 0;

			for (var j = 0; j < friendList[i].scores[j]; j++) {

				scoresDiff += Math.abs(parseInt(friendScore[j]) - parseInt(friendList[i].scores[j]));
			
				if (scoresDiff <= match.friendComparison) {

					match.name = friendList[i].name;
					match.photo = friendList[i].photo;
					match.friendComparison = scoresDiff;
				}
			}
		}


		friendList.push(friendData);

		res.json(match);


});

}