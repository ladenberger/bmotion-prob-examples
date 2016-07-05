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
