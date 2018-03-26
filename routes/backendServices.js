module.exports = function() {
  var express = require('express');
  var fs = require("fs");
    var router = express.Router();

    router.post('/getDispatchPrediction', function(req, res) {
      var zipcode = req.body.zipcode;
      console.log("ZIPCODE: ", zipcode);
      var content = require("./data/zipcode_search.json");
      for (var i = 0; i < content.length; ++i) {
        if (parseInt(content[i]["zipcode_of_incident"]) == zipcode) {
          console.log(content[i]["zipcode_of_incident"]);
          //combine unit_type and frequency for paired sorting
          var freqs = [
            ['CHIEF', content[i]["unit_0_freq"]],
            ['ENGINE', content[i]["unit_1_freq"]],
            ['INVESTIGATION', content[i]["unit_2_freq"]],
            ['MEDIC', content[i]["unit_3_freq"]],
            ['PRIVATE', content[i]["unit_4_freq"]],
            ['RESCUE CAPTAIN', content[i]["unit_5_freq"]],
            ['RESCUE SQUAD', content[i]["unit_6_freq"]],
            ['SUPPORT', content[i]["unit_7_freq"]],
            ['TRUCK', content[i]["unit_8_freq"]]
          ];
          var ordering = freqs.sort(function(a,b) {
            return b[1] - a[1];
          });
          return res.send(ordering);
        }
      }
      res.send("none");
    });

    return router;
}
