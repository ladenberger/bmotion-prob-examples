bms.executeEvent({
  selector: "text[data-floor]",
  events: [{
    name: "send_request",
    predicate: function(origin) {
      return "f=" + origin.attr("data-floor")
    }
  }]
});
