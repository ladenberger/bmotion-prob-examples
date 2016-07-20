["front", "left", "right"].forEach(function(v) {

  bms.observe('formula', {
    selector: "#" + v + "_door",
    formulas: ["doors(" + v + ")"],
    trigger: function(origin, r) {
      if (r[0] !== undefined) {
        origin.find("image").attr("xlink:href", "img/door_" + r[0] + ".png")
      }
    }
  });

  bms.observe('formula', {
    selector: "#" + v + "_gear",
    formulas: ["gears(" + v + ")"],
    trigger: function(origin, r) {
      if (r[0] !== undefined) {
        origin.find("image").attr("xlink:href", "img/gear_" + r[0] + ".png")
      }
    }
  });

});
