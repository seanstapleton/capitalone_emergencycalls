(function() {
  var load_vis1 = function() {
    $.getJSON("/data/dotw_calls.json", function(data) {
      var counts = [
        {"name": "CHIEF", "data": [0,0,0,0,0,0,0]},
        {"name": "ENGINE", "data": [0,0,0,0,0,0,0]},
        {"name": "INVESTIGATION", "data": [0,0,0,0,0,0,0]},
        {"name": "MEDIC", "data": [0,0,0,0,0,0,0]},
        {"name": "PRIVATE", "data": [0,0,0,0,0,0,0]},
        {"name": "RESCUE CAPTAIN", "data": [0,0,0,0,0,0,0]},
        {"name": "RESCUE SQUAD", "data": [0,0,0,0,0,0,0]},
        {"name": "SUPPORT", "data": [0,0,0,0,0,0,0]},
        {"name": "TRUCK", "data": [0,0,0,0,0,0,0]}
      ];
      $.each(data, function( key, val ) {
        counts[val.unit_type]["data"][val.day_of_the_week] += 1;
      });
      var bar0 = new Chartist.Bar('#vis1-view', {
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          series: counts
        }, {
          seriesBarDistance: 10,
          axisX: {
            offset: 60
          },
          axisY: {
            offset: 80,
            labelInterpolationFnc: function(value) {
              return value + ' calls'
            },
            scaleMinSpace: 15
          },
          width: '100%',
          height: '400px',
          plugins: [
            Chartist.plugins.legend()
          ]
      });
      vis1_loaded = true;
      bar0.on('draw', function(data) {
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
    });
  }
  var load_vis2 = function() {
    $.getJSON("/data/hour_calls.json", function(data) {
      var counts = [
        {"name": "CHIEF", "data": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
        {"name": "ENGINE", "data": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
        {"name": "INVESTIGATION", "data": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
        {"name": "MEDIC", "data": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
        {"name": "PRIVATE", "data": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
        {"name": "RESCUE CAPTAIN", "data": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
        {"name": "RESCUE SQUAD", "data": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
        {"name": "SUPPORT", "data": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
        {"name": "TRUCK", "data": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}
      ];
      $.each(data, function( key, val ) {
        counts[val.unit_type]["data"][val.hour] += 1;
      });
      var line1 = new Chartist.Line('#vis2-view', {
        labels: ["12am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm"],
        series: counts
      }, {
        low: 0,
        showArea: true,
        width: '100%',
        height: '400px',
        plugins: [
          Chartist.plugins.legend()
        ]
      });
      vis2_loaded = true;
      line1.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 2000 * data.index,
              dur: 2000,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        }
      });
    });
  }
  var load_vis3 = function() {
    $.getJSON("/data/priority_vs_neighborhood_calls.json", function(data) {
      var counts = [
        {"name": "DISTRICT 1", "data": [0,0,0,0]},
        {"name": "DISTRICT 2", "data": [0,0,0,0]},
        {"name": "DISTRICT 3", "data": [0,0,0,0]},
        {"name": "DISTRICT 4", "data": [0,0,0,0]},
        {"name": "DISTRICT 5", "data": [0,0,0,0]},
        {"name": "DISTRICT 6", "data": [0,0,0,0]},
        {"name": "DISTRICT 7", "data": [0,0,0,0]},
        {"name": "DISTRICT 8", "data": [0,0,0,0]},
        {"name": "DISTRICT 9", "data": [0,0,0,0]},
        {"name": "DISTRICT 10", "data": [0,0,0,0]},
        {"name": "DISTRICT 11", "data": [0,0,0,0]}
      ];
      $.each(data, function( key, val ) {
        switch (val.priority) {
          case 2:
            counts[val.supervisor_district - 1]["data"][0] += 1;
            break;
          case 3:
            counts[val.supervisor_district - 1]["data"][1] += 1;
            break;
          case 7:
            counts[val.supervisor_district - 1]["data"][2] += 1;
            break;
          default:
            counts[val.supervisor_district - 1]["data"][3] += 1;
            break;
        }
      });
      new Chartist.Bar('#vis3-view', {
        labels: ['Priority 2', 'Priority 3', 'Priority 7', 'Priority 8'],
        series: counts
      }, {
        stackBars: true,
        axisY: {
          labelInterpolationFnc: function(value) {
            return (value / 1000) + 'k';
          }
        },
        width: '100%',
        height: '400px',
        plugins: [
          Chartist.plugins.legend()
        ]
      }).on('draw', function(data) {
        if(data.type === 'bar') {
          data.element.attr({
            style: 'stroke-width: 30px'
          });
          data.element.attr({
            style: 'stroke-width: 0px'
        });
        var strokeWidth = 30;
        var last = 0;
        for (var i = 0; i < 9; i++) {
          if (data.seriesIndex === i) {
            data.element.animate({
                y2: {
                    begin: last,
                    dur: 500*(Math.pow(0.5,i)),
                    from: data.y1,
                    to: data.y2,
                    easing: Chartist.Svg.Easing.easeOutSine,
                },
                'stroke-width': {
                    begin: last,
                    dur: 500*(Math.pow(0.5,i)),
                    from: 1,
                    to: strokeWidth,
                    fill: 'freeze',
                }
            }, false);
            last += 500*(Math.pow(0.5,i))
          }
        }

        }
      });
      vis3_loaded = true;
    });
  }
  var vis1_loaded = false;
  var vis2_loaded = false;
  var vis3_loaded = false;

  $(".vis-picker").click(function() {
    var id_picked = "#" + $(this).attr("id") + "-view";
    var id = $(this).attr("id");
    if (id == "vis1" && !vis1_loaded) {
      load_vis1();
    } else if (id == "vis2" && !vis2_loaded) {
      load_vis2();
    } else if (id == "vis3" && !vis3_loaded) {
      load_vis3();
    }
    $(".vis-view").removeClass("selected");
    $(id_picked).addClass("selected");
  });

  load_vis1();

})();
