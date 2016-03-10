bms.init(function() {

  bms.eval({
    formulas: ["d"],
    translate: true,
    trigger: function(r) {

      var cars = r[0];
      var s = Snap("#carsonbridge");

      var yoffset = 215;
      for (var i = 1; i <= cars; i++) {

        // Cars on bridge to island
        var place = s.image("images/carl.png", 450, yoffset, 34, 18);
        place.attr("id", "to_il_" + i);
        place.attr("style", "visibility:hidden");
        place.attr("class", "car");

        // Cars on bridge to mainland
        var place = s.image("images/carr.png", 350, yoffset, 34, 18);
        place.attr("id", "to_ml_" + i);
        place.attr("style", "visibility:hidden;");
        place.attr("class", "car");

        // Cars on island
        var place = s.image("images/carl.png", 150, yoffset, 34, 18);
        place.attr("id", "il_" + i);
        place.attr("style", "visibility:hidden");
        place.attr("class", "car");

        yoffset = yoffset + 25;

      }

    }

  });

  bms.observe("formula", {
    selector: "#carsonbridge",
    formulas: ["a", "b", "c"],
    translate: true,
    trigger: function(origin, r) {
      // Hide all cars ...
      origin.find(".car").css("visibility", "hidden");
      // ... and display only needed
      for (var a = 1; a <= r[0]; a++) {
        origin.find("#to_il_" + a).css("visibility", "visible");
      }
      for (var b = 1; b <= r[1]; b++) {
        origin.find("#il_" + b).css("visibility", "visible");
      }
      for (var c = 1; c <= r[2]; c++) {
        origin.find("#to_ml_" + c).css("visibility", "visible");
      }
    }
  });

  bms.observe("predicate", {
    selector: "#value_n",
    predicate: "2<a",
    true: {
      fill: "green"
    },
    false: {
      fill: "red"
    }
  });

});
