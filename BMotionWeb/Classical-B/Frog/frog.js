for (var i = 1; i <= 7; i++) {

  bms.observe('formula', {
    selector: "#pos" + i,
    formulas: ["positions(" + i + ")"],
    trigger: function(origin, res) {
      origin.attr("xlink:href", res[0].substring(0, 5) + ".png");
      origin.attr("data-frog", res[0]);
    }
  });

  bms.executeEvent({
    selector: "#pos" + i,
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
