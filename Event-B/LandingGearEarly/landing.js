// -----------------------------------
// Observe output orders to electro valves
// -----------------------------------
[{
  formula: "open_EV",
  element: "#e-order-open"
}, {
  formula: "close_EV",
  element: "#e-order-close"
}, {
  formula: "retract_EV",
  element: "#e-order-retract"
}, {
  formula: "extend_EV",
  element: "#e-order-extend"
}].forEach(function(v) {
  bms.observe('formula', {
    selector: v.element,
    formulas: [v.formula],
    translate: true,
    trigger: function(origin, values) {
      origin.attr("fill", values[0] ? "green" : "red");
    }
  });
});

// -----------------------------------
// Observe valve circuits
// -----------------------------------
[{
  formula: "open_door_valve",
  element: "#extension_circuit_doors"
}, {
  formula: "close_door_valve",
  element: "#retraction_circuit_doors"
}, {
  formula: "extend_gear_valve",
  element: "#extension_circuit_gears"
}, {
  formula: "retract_gear_valve",
  element: "#retraction_circuit_gears"
}].forEach(function(v) {
  bms.observe('formula', {
    selector: v.element,
    formulas: [v.formula],
    trigger: function(origin, res) {
      origin.attr("class", "circuit_" + res[0]);
    }
  });
});

// -----------------------------------
// Observe cylinders
// -----------------------------------
["front", "left", "right"].forEach(function(v) {

  /*bms.observe('formula', {
   selector: "#" + v + "_gear_cylinder_l",
   formulas: ["(gears(" + v + ") = gear_moving & valve_extend_gear = valve_open) or (gears(" + v + ") = extended & valve_extend_gear = valve_open) or (gears(" + v + ") = retracted & valve_retract_gear = valve_open)"],
   trigger: function (origin, r) {
   origin.attr("fill", r[0] === "TRUE" ? "#88d2f7" : "#cccccc");
   }
   });

   bms.observe('formula', {
   selector: "#" + v + "_gear_cylinder_r",
   formulas: ["(gears(" + v + ") = gear_moving & valve_extend_gear = valve_open) or (gears(" + v + ") = extended & valve_extend_gear = valve_open) or (gears(" + v + ") = retracted & valve_retract_gear = valve_open)"],
   trigger: function (origin, r) {
   origin.attr("fill", r[0] === "TRUE" ? "#88d2f7" : "#cccccc");
   }
   });

   bms.observe('formula', {
   selector: "#" + v + "_door_cylinder_l",
   formulas: ["(doors(" + v + ") = door_moving & valve_open_door = valve_open) or (doors(" + v + ") = open & valve_open_door = valve_open) or (doors(" + v + ") = closed & valve_close_door = valve_open)"],
   trigger: function (origin, r) {
   origin.attr("fill", r[0] === "TRUE" ? "#88d2f7" : "#cccccc");
   }
   });

   bms.observe('formula', {
   selector: "#" + v + "_door_cylinder_r",
   formulas: ["(doors(" + v + ") = door_moving & valve_close_door = valve_open) or (doors(" + v + ") = open & valve_open_door = valve_open) or (doors(" + v + ") = closed & valve_close_door = valve_open)"],
   trigger: function (origin, r) {
   origin.attr("fill", r[0] === "TRUE" ? "#88d2f7" : "#cccccc");
   }
   });*/

  bms.observe('formula', {
    selector: "#" + v + "_door_cylinder",
    formulas: ["door(" + v + ")"],
    trigger: function(origin, r) {
      var val = "translate(0,0)";
      switch (r[0]) {
        case "closed":
          val = "translate(0,0)";
          break;
        case "open":
          val = "translate(90,0)";
          break;
        case "door_moving":
          val = "translate(45,0)";
          break;
      }
      origin.find("#" + v + "_door_cylinder_forcer").attr("transform", val);
    }
  });

  bms.observe('formula', {
    selector: "#" + v + "_gear_cylinder",
    formulas: ["gear(" + v + ")"],
    trigger: function(origin, r) {
      var val = "translate(0,0)";
      switch (r[0]) {
        case "extended":
          val = "translate(90,0)";
          break;
        case "retracted":
          val = "translate(0,0)";
          break;
        case "gear_moving":
          val = "translate(45,0)";
          break;
      }
      origin.find("#" + v + "_gear_cylinder_forcer").attr("transform", val);
    }
  });

  bms.executeEvent({
    selector: "#" + v + "_door_cylinder",
    events: [{
      name: "env_start_open_door",
      predicate: "gr=" + v
    }, {
      name: "env_open_door_skip",
      predicate: "gr=" + v
    }, {
      name: "env_open_door_last",
      predicate: "gr=" + v
    }, {
      name: "env_start_close_door",
      predicate: "gr=" + v
    }, {
      name: "env_close_door",
      predicate: "gr=" + v
    }, {
      name: "env_close_door_skip",
      predicate: "gr=" + v
    }]
  });

  bms.executeEvent({
    selector: "#" + v + "_gear_cylinder",
    events: [{
      name: "env_start_retracting_first",
      predicate: "gr=" + v
    }, {
      name: "env_retract_gear_skip",
      predicate: "gr=" + v
    }, {
      name: "env_retract_gear_last",
      predicate: "gr=" + v
    }, {
      name: "env_start_extending",
      predicate: "gr=" + v
    }, {
      name: "env_extend_gear_skip",
      predicate: "gr=" + v
    }, {
      name: "env_extend_gear_last",
      predicate: "gr=" + v
    }]
  });

});

// -----------------------------------
// Observe electro valves
// -----------------------------------
[{
  formula: "open_door_valve",
  element: "#ev_open_doors"
}, {
  formula: "close_door_valve",
  element: "#ev_close_doors"
}, {
  formula: "extend_gear_valve",
  element: "#ev_extended_gears"
}, {
  formula: "retract_gear_valve",
  element: "#ev_retraction_gears"
}].forEach(function(v) {
  bms.observe("formula", {
    selector: v.element,
    formulas: [v.formula],
    trigger: function(origin, res) {
      origin.attr("class", "ev_" + res[0]);
    }
  });
});

// -----------------------------------
// Observe handle
// -----------------------------------
bms.observe('formula', {
  selector: "#ev_handle",
  formulas: ["handle"],
  trigger: function(origin, r) {
    if (r[0] !== undefined) {
      origin.attr("xlink:href", "img/handle_" + r[0] + ".png")
    }
  }
});

// -----------------------------------
// Physical Environment
// -----------------------------------
bms.observe('formula', {
  selector: "#front_door",
  formulas: ["door(front)"],
  trigger: function(origin, r) {
    if (r[0] !== undefined) {
      origin.attr("xlink:href", "img/door_" + r[0] + ".png")
    }
  }
});

bms.observe('formula', {
  selector: "#front_gear",
  formulas: ["gear(front)"],
  trigger: function(origin, r) {
    if (r[0] !== undefined) {
      origin.attr("xlink:href", "img/gear_" + r[0] + ".png")
    }
  }
});
