bms.observe('formula', {
  selector: "#door",
  refinement: "R1GearDoor",
  formulas: ["door"],
  trigger: function(origin, r) {
    if (r[0] !== undefined) {
      origin.find("image").attr("xlink:href", "img/door_" + r[0] + ".png")
    }
  }
});

bms.observe('formula', {
  selector: "#gear",
  refinement: "R0Gear",
  formulas: ["gear"],
  trigger: function(origin, r) {
    if (r[0] !== undefined) {
      origin.find("image").attr("xlink:href", "img/gear_" + r[0] + ".png")
    }
  }
});

["front", "left", "right"].forEach(function(v) {

  bms.observe('formula', {
    selector: "#" + v + "_door",
    refinement: "R4GearsDoorsHandleValves",
    formulas: ["doors(" + v + ")"],
    trigger: function(origin, r) {
      if (r[0] !== undefined) {
        origin.find("image").attr("xlink:href", "img/door_" + r[0] + ".png")
      }
    }
  });

  bms.observe('formula', {
    selector: "#" + v + "_gear",
    refinement: "R4GearsDoorsHandleValves",
    formulas: ["gears(" + v + ")"],
    trigger: function(origin, r) {
      if (r[0] !== undefined) {
        origin.find("image").attr("xlink:href", "img/gear_" + r[0] + ".png")
      }
    }
  });

});

bms.observe("refinement", {
  selector: "#gear_door_refined",
  refinement: "R3GearsDoorsHandle",
  enable: function(origin) {
    origin.css("visibility", "visible");
  },
  disable: function(origin) {
    origin.css("visibility", "hidden");
  }
});

bms.observe("refinement", {
  selector: "#gear_door_abstract",
  refinement: "R3GearsDoorsHandle",
  enable: function(origin) {
    origin.css("visibility", "hidden");
  },
  disable: function(origin) {
    origin.css("visibility", "visible");
  }
});
