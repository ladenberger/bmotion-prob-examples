    bms.observe("cspEvent", {
      selector: "#phils",
      observers: [{
        "exp": "{thinks.x | x <- {0..4}}",
        "actions": [{
          "selector": "#phil{{a1}}h",
          "attr": "fill",
          "value": "green"
        }]
      }, {
        "exp": "{eats.x | x <- {0..4}}",
        "actions": [{
          "selector": "#phil{{a1}}ts",
          "attr": "fill",
          "value": "green"
        }]
      }, {
        "exp": "{sits.x | x <- {0..4}}",
        "actions": [{
          "selector": "#phil{{a1}}",
          "attr": "opacity",
          "value": "0"
        }, {
          "selector": "#phil{{a1}}t",
          "attr": "opacity",
          "value": "1"
        }]
      }, {
        "exp": "{getsup.x | x <- {0..4}}",
        "actions": [{
          "selector": "#phil{{a1}}",
          "attr": "opacity",
          "value": "1"
        }, {
          "selector": "#phil{{a1}}t",
          "attr": "opacity",
          "value": "0"
        }]
      }, {
        "exp": "{putsdown.p.f | p <- {0..4}, f <- {0..4}}",
        "actions": [{
          "selector": "#fork{{a2}}",
          "attr": "opacity",
          "value": "1"
        }, {
          "selector": "#fork{{a1}}{{a2}}",
          "attr": "opacity",
          "value": "0"
        }, {
          "selector": "#phil{{a1}}ts",
          "attr": "fill",
          "value": "black"
        }]
      }, {
        "exp": "{picks.p.f | p <- {0..4}, f <- {0..4}}",
        "actions": [{
          "selector": "#fork{{a1}}{{a2}}",
          "attr": "opacity",
          "value": "1"
        }, {
          "selector": "#fork{{a2}}",
          "attr": "opacity",
          "value": "0"
        }]
      }]
    });
