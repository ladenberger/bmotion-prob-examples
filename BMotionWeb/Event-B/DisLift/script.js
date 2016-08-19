bms.observe("formula", {
  selector: "#lift",
  formulas: ["floor"],
  translate: true,
  trigger: function(origin, values) {
    var door = origin.find("#door");
    switch (values[0]) {
      case 1:
        door.attr("y", "20");
        break
      case 0:
        door.attr("y", "140");
        break
      case -1:
        door.attr("y", "250");
        break
    }

  }
});


bms.callMethod({
  name: "testMethod",
  args: ["foo", "bar"],
  callback: function(data) {
    console.log(data);
  }
});

bms.observe("method", {
  selector: "#door",
  name: "testMethod",
  args: ["foo", "bar"],
  callback: function(origin, data) {
    console.log(origin, data);
  }
});

bms.handler("method", {
  selector: "#door",
  name: "random",
  args: [10],
  callback: function(origin, data) {
    console.log(origin, data);
  }
});

/*bms.observe("predicate", {
  selector: "#door",
  predicate: "door = open",
  true: function(origin) {
    origin.attr("fill", "white");
  },
  false: function(origin) {
    origin.attr("fill", "gray");
  }
});*/

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

bms.observe("set", {
  selector: "#request_buttons",
  set: "request",
  convert: function(element) {
    return "#bt_" + element;
  },
  actions: [{
    attr: "fill",
    value: "green"
  }]
});

bms.executeEvent({
  selector: "ellipse[data-floor]",
  events: [{
    name: "send_request",
    predicate: function(origin) {
      return "f=" + origin.attr("data-floor")
    }
  }],
  label: function(origin, event) {
    return "Push button " + event.predicate;
  }
});
