(function() {
  var load_predictions = function(data) {
    var labels = [];
    var vals = [[]];
    //extract given data into format for plotting
    for (var i = data.length-1; i >= 0; --i) {
      labels.push(data[i][0]);
      vals[0].push(data[i][1]);
    }
    var predictionsChart = new Chartist.Bar('#search-prediction-results-view', {
        labels: labels,
        series: vals
      }, {
        seriesBarDistance: 10,
        axisX: {
          offset: 60
        },
        axisY: {
          offset: 80,
          labelInterpolationFnc: function(value) {
            return value
          },
          scaleMinSpace: 15
        },
        width: '100%',
        height: '400px'
    });
    predictionsChart.on('draw', function(data) {
      if(data.type === 'bar') {
        data.element.animate({
          y2: {
            dur: 1500,
            from: data.y1,
            to: data.y2,
            easing: Chartist.Svg.Easing.easeOutQuint
          },
          opacity: {
            dur: 1500,
            from: 0,
            to: 1,
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      }
    });
  }

  $("#address-search").submit(function(e) {
    e.preventDefault();
    //determine zipcode and relevent geo-data
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        "address": $("#address-search-inp").val()
    }, function(results) {
      var zipcode = 0;
      for (var i = 0; i < results[0].address_components.length; i++) {
        if (results[0].address_components[i].types[0] == 'postal_code') {
          zipcode = parseInt(results[0].address_components[i].long_name);
        }
      }
      //request prediction from backend
      $.post("/backendServices/getDispatchPrediction", {zipcode: zipcode})
        .then(function(data) {
          console.log("prediction response", data);
          var bold = $("<span style='font-weight: bold'>Prediction: </span>");
          var prediction_val = $("<p style='margin-top: 15px'></p>").text(data[0][0]).prepend(bold);
          $(".search-results").append(prediction_val);
          load_predictions(data);
        });
      //update DOM with new information
      var full_address = $("<p></p>").text(results[0].formatted_address);
      var coords_lat = $("<p></p>").text("Latitude: " + results[0].geometry.location.lat());
      var coords_lng = $("<p></p>").text("Longitude: " + results[0].geometry.location.lng());
      var zip_code = $("<p></p>").text("Zipcode: " + zipcode);
      var tags = results[0].types[0];
      for (var i = 1; i < results[0].types.length; ++i) {
        tags += ", " + results[0].types[i];
      }
      var types = $("<p></p>").text(tags);
      $(".search-results").append(full_address, coords_lat, coords_lng, zip_code, tags);
    });
    return false;
  });
})();
