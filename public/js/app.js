(function() {
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
    var bar1 = new Chartist.Bar('.ct-chart', {
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
    bar1.on('draw', function(data) {
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
})();
