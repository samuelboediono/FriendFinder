var friendList = require("../data/friends.js");

module.exports = function(app) {

	app.get("/api/friends", function(req,res) {
		res.json(friendList);
	});

	app.post("/api/friends", function(req,res) {

		var newFriendScore = req.body.scores;
		var scoreArray = [];
		var countFriend = 0;
		var bestMatch = 0;

		for(var i = 0; i < friendList.length; i++) {
			var scoresDiff = 0;

			for(var j = 0; j < newFriendScore.length; j++) {
				scoresDiff += (Math.abs(parseInt(friendList[i].scores[j]) - parseInt(newFriendScore[j])));
			}

			scoreArray.push(scoresDiff);
		}

		for(var i = 0; i < scoreArray.length; i++) {
			if(scoreArray[i] <= scoreArray[bestMatch]) {
				bestMatch = i;
			}
		}

		var returnFriend = friendList[bestMatch];
		res.json(returnFriend);

		friendList.push(req.body);
	});
};

