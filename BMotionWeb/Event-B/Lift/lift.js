bms.executeEvent({
  selector: "text[data-floor]",
  name: "send_request",
  predicate: function(origin) {
    return "f=" + origin.attr("data-floor")
  }
});

bms.observe('formula', {
  selector: "#txt_floor",
  formulas: [
    "floor"
  ],
  trigger: function(origin, values) {
    origin.text('Current Floor: ' + values[0]);
  }
});

bms.observe('formula', {
  selector: "#txt_direction",
  formulas: [
    "move"
  ],
  trigger: function(origin, values) {
    origin.text('Moving: ' + values[0]);
  }
});

bms.observe('formula', {
  selector: "#txt_direction",
  formulas: [
    "move"
  ],
  trigger: function(origin, values) {
    origin.text('Moving: ' + values[0]);
  }
});

bms.observe("formula", {
  selector: "#lift",
  formulas: ["floor"],
  translate: true,
  trigger: function(origin, values) {
    var door = origin.find("#door");
    switch (values[0]) {
      case 2:
        door.attr("y", "20");
        break
      case 1:
        door.attr("y", "140");
        break
      case 0:
        door.attr("y", "250");
        break
    }
  }
});

bms.observe("formula", {
  selector: "#door",
  formulas: ["door"],
  trigger: function(origin, values) {
    if (values[0] === 'open') {
      origin.attr("fill", "white");
    } else if (values[0] === 'closed') {
      origin.attr("fill", "gray");
    }
  }
});
