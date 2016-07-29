bms.observe("cspEvent", {
  selector: "#network",
  observers: [{
    exp: "{fail.x, revive.x, election.x.y, test.x.y, ok.x.y, answer.x.y, coordinator.x.y | x <- {0..N-1}, y <- {0..N-1}}",
    actions: [{
      selector: "path[id^=l-], path[id^=p-]",
      attr: "opacity",
      value: "0"
    }]
  }, {
    exp: "{election.x.y, test.x.y | x <- {0..N-1}, y <- {0..N-1}}",
    actions: [{
      selector: "#l-{{a1}}-{{a2}}, #p-{{a2}}",
      attr: "opacity",
      value: "1"
    }]
  }, {
    exp: "{ok.x.y, answer.x.y, coordinator.x.y | x <- {0..N-1}, y <- {0..N-1}}",
    actions: [{
      selector: "#l-{{a2}}-{{a1}}, #p-{{a2}}",
      attr: "opacity",
      value: "1"
    }]
  }, {
    exp: "{test.x.y | x <- {0..N-1}, y <- {0..N-1}}",
    actions: [{
      selector: "#l-{{a1}}-{{a2}}",
      attr: "stroke",
      value: "cyan"
    }]
  }, {
    "exp": "{ok.x.y | x <- {0..N-1}, y <- {0..N-1}}",
    "actions": [{
      "selector": "#l-{{a2}}-{{a1}}",
      "attr": "stroke",
      "value": "green"
    }]
  }, {
    "exp": "{election.x.y | x <- {0..N-1}, y <- {0..N-1}}",
    "actions": [{
      "selector": "#l-{{a1}}-{{a2}}",
      "attr": "stroke",
      "value": "blue"
    }]
  }, {
    "exp": "{answer.x.y | x <- {0..N-1}, y <- {0..N-1}}",
    "actions": [{
      "selector": "#l-{{a2}}-{{a1}}",
      "attr": "stroke",
      "value": "orange"
    }]
  }, {
    "exp": "{coordinator.x.y | x <- {0..N-1}, y <- {0..N-1}}",
    "actions": [{
      "selector": "#l-{{a2}}-{{a1}}",
      "attr": "stroke",
      "value": "purple"
    }, {
      "selector": "#n-{{a1}}",
      "attr": "fill",
      "value": "purple"
    }]
  }, {
    "exp": "{fail.x | x <- {0..N-1}}",
    "actions": [{
      "selector": "#n-{{a1}}",
      "attr": "fill",
      "value": "lightgray"
    }]
  }, {
    "exp": "{revive.x | x <- {0..N-1}}",
    "actions": [{
      "selector": "#n-{{a1}}",
      "attr": "fill",
      "value": "white"
    }]
  }]
});

/*, {
  "exp": "{leader.x.y | x <- {0..N-1}, y <- {0..N-1}, x < y}",
  "actions": [{
    "selector": "#n-{{a1}}",
    "attr": "fill",
    "value": "lightblue"
  }]
}*/
