const express = require("express");

const path = require("path");
const router = express.Router();

const friends = require(path.join(__dirname,"../data/friends.js"));

router.get("/api/friends",function(req,res) {
    res.json(friends);
})
router.post("/api/friends",function(req,res) {
    let newFriend = req.body;
    //this is greater than possible; the first friend will be the best so far
    let minScore = 55;
    let bestFriend = -1;
    for (let i=0; i < friends.length;i++) {
        let score = 0;
        for (let j=0; j < 10; j++) {
            score += Math.abs(newFriend.answers[j] - friends[i].answers[j]);
        }
        if (score < minScore) {
            minScore = score;
            bestFriend = i;
        }
    }
    friends.push(req.body);
    res.json(friends[bestFriend]);
})



module.exports = router;