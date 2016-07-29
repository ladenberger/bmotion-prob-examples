bms.init(function() {

  bms.eval({
    formulas: ["card(positions)"],
    translate: true,
    trigger: function(r) {

      var nr = r[0];

      // Generate places
      var s = Snap(nr * 50, 45);
      s.attr("id", "frog");
      var xoffset = 0;
      for (var i = 1; i <= nr; i++) {

        var place = s.image("free.png", xoffset, 0, 50, 45);
        place.attr("id", i);
        xoffset = xoffset + 50;

        // Install observer and execute event handler
        bms.observe("formula", {
          selector: "#" + i,
          formulas: ["positions(" + i + ")"],
          trigger: function(origin, res) {
            if (res[0]) {
              origin.attr("href", res[0].substring(0, 5) + ".png");
              origin.attr("data-frog", res[0]);
            }
          }
        });

        bms.executeEvent({
          tooltip: false,
          selector: "#" + i,
          events: [{
            name: "Move_right",
            predicate: function(origin) {
              return "x=" + origin.attr("data-frog");
            }
          }, {
            name: "Move_left",
            predicate: function(origin) {
              return "x=" + origin.attr("data-frog");
            }
          }, {
            name: "Hop_right",
            predicate: function(origin) {
              return "x=" + origin.attr("data-frog");
            }
          }, {
            name: "Hop_left",
            predicate: function(origin) {
              return "x=" + origin.attr("data-frog");
            }
          }]
        });

      }

    }
  })

});
