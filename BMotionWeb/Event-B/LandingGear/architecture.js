// -----------------------------------
// Observe output orders to electro valves
// -----------------------------------
[{
  formula: "open_EV",
  element: "#eo_open_doors"
}, {
  formula: "close_EV",
  element: "#eo_close_doors"
}, {
  formula: "retract_EV",
  element: "#eo_retract_gears"
}, {
  formula: "extend_EV",
  element: "#eo_extend_gears"
}].forEach(function(v) {
  bms.observe("formula", {
    selector: v.element,
    formulas: [v.formula],
    translate: true,
    refinement: "R5GearsDoorsHandleValvesController",
    trigger: function(origin, values) {
      origin.find(".order").attr("stroke", values[0] ? "green" : "red");
    }
  });
});

// -----------------------------------
// Observe valve circuits
// -----------------------------------
[{
  formula: "general_valve",
  element: "#hydraulic_circuit"
}, {
  formula: "valve_open_door",
  element: "#extension_circuit_doors"
}, {
  formula: "valve_close_door",
  element: "#retraction_circuit_doors"
}, {
  formula: "valve_extend_gear",
  element: "#extension_circuit_gears"
}, {
  formula: "valve_retract_gear",
  element: "#retraction_circuit_gears"
}].forEach(function(v) {
  bms.observe('formula', {
    selector: v.element,
    formulas: [v.formula],
    refinement: "R6GearsDoorsHandleValvesControllerSwitch",
    trigger: function(origin, res) {
      origin.attr("class", "circuit_" + res[0]);
    }
  });
});

// -----------------------------------
// Observe cylinders
// -----------------------------------
bms.observe('formula', {
  selector: "#door_cylinder",
  formulas: ["door"],
  refinement: "R1GearDoor",
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
    origin.find("#door_cylinder_forcer").attr("transform", val);
  }
});

bms.observe('formula', {
  selector: "#gear_cylinder",
  formulas: ["gear"],
  refinement: "R0Gear",
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
    origin.find("#gear_cylinder_forcer").attr("transform", val);
  }
});

["front", "left", "right"].forEach(function(v) {

  bms.observe('formula', {
    selector: "#" + v + "_door_cylinder",
    formulas: ["doors(" + v + ")"],
    refinement: "R3GearsDoorsHandle",
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
    formulas: ["gears(" + v + ")"],
    refinement: "R3GearsDoorsHandle",
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
    refinement: "R3GearsDoorsHandle",
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
    refinement: "R3GearsDoorsHandle",
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
  formula: "valve_open_door",
  element: "#ev_open_doors"
}, {
  formula: "valve_close_door",
  element: "#ev_close_doors"
}, {
  formula: "valve_extend_gear",
  element: "#ev_extended_gears"
}, {
  formula: "valve_retract_gear",
  element: "#ev_retraction_gears"
}].forEach(function(v) {
  bms.observe("formula", {
    selector: v.element,
    formulas: [v.formula],
    refinement: "R4GearsDoorsHandleValves",
    trigger: function(origin, val) {
      origin.find(".valve").attr("fill", val[0] === "valve_open" ? "blue" : "gray");
    }
  });
});

bms.observe("formula", {
  selector: "#ev_general",
  formulas: ["general_valve"],
  refinement: "R6GearsDoorsHandleValvesControllerSwitch",
  trigger: function(origin, val) {
    origin.find(".valve").attr("fill", val[0] === "valve_open" ? "blue" : "gray");
  }
});

// -----------------------------------
// Observe output orders to general electro valves
// -----------------------------------
bms.observe("formula", {
  selector: "#eo_general",
  formulas: ["general_EV"],
  translate: true,
  refinement: "R6GearsDoorsHandleValvesControllerSwitch",
  trigger: function(origin, val) {
    origin.find(".order")
      .attr("stroke", val[0] ? "green" : "red");
  }
});

// -----------------------------------
// Observe analogical switch
// -----------------------------------
bms.observe("formula", {
  selector: "#analogical_switch",
  formulas: ["general_EV", "analogical_switch"],
  translate: true,
  refinement: "R6GearsDoorsHandleValvesControllerSwitch",
  trigger: function(origin, val) {

    origin.find(".order")
      .attr("fill", val[0] ? "green" : "red")
      .attr("stroke", val[0] ? "green" : "red");

    origin.find("#analogical_switch_open")
      .css("visibility", val[1] == "switch_open" ? "visible" : "hidden");
    origin.find("#analogical_switch_closed")
      .css("visibility", val[1] == "switch_closed" ? "visible" : "hidden");

  }
});

// -----------------------------------
// Observe input signals
// -----------------------------------
bms.observe('formula', {
  selector: "#sensors",
  formulas: [
    "ran(sensors_gear_extended(front)) = {TRUE}",
    "ran(sensors_gear_extended(right)) = {TRUE}",
    "ran(sensors_gear_extended(left)) = {TRUE}",
    "ran(sensors_gear_retracted(front)) = {TRUE}",
    "ran(sensors_gear_retracted(right)) = {TRUE}",
    "ran(sensors_gear_retracted(left)) = {TRUE}",
    "ran(sensors_door_open(front)) = {TRUE}",
    "ran(sensors_door_open(right)) = {TRUE}",
    "ran(sensors_door_open(left)) = {TRUE}",
    "ran(sensors_door_closed(front)) = {TRUE}",
    "ran(sensors_door_closed(right)) = {TRUE}",
    "ran(sensors_door_closed(left)) = {TRUE}",
    "ran(sensors_handle) = {up}",
    "ran(sensors_shock_absorber) = {ground}"
  ],
  refinement: "R8GearsDoorsHandleValvesControllerSwitchLightsSensors",
  trigger: function(origin, r) {
    var elems = [
      "#gear_extended_front",
      "#gear_extended_right",
      "#gear_extended_left",
      "#gear_retracted_front",
      "#gear_retracted_right",
      "#gear_retracted_left",
      "#door_open_front",
      "#door_open_right",
      "#door_open_left",
      "#door_closed_front",
      "#door_closed_right",
      "#door_closed_left",
      "#sensor_handle",
      "#sensor_shock_absorber"
    ];
    elems.forEach(function(i, v) {
      origin.find(v).css("stroke", r[i] === "TRUE" ? "green" : "red");
    });
  }
});

// -----------------------------------
// Observe cockpit lights
// -----------------------------------
bms.observe('formula', {
  selector: "#green_light",
  formulas: ["green_light"],
  refinement: "R7GearsDoorsHandleValvesControllerSwitchLights",
  trigger: function(origin, r) {
    origin.css("fill", r[0] === "on" ? "green" : "#cfffa0");
  }
});

bms.observe('formula', {
  selector: "#orange_light",
  formulas: ["orange_light"],
  refinement: "R7GearsDoorsHandleValvesControllerSwitchLights",
  trigger: function(origin, r) {
    origin.css("fill", r[0] === "on" ? "orange" : "#ffe7ad");
  }
});

bms.observe('formula', {
  selector: "#red_light",
  formulas: ["red_light"],
  refinement: "R7GearsDoorsHandleValvesControllerSwitchLights",
  trigger: function(origin, r) {
    origin.css("fill", r[0] === "on" ? "red" : "#ffc9c9");
  }
});

// -----------------------------------
// Observe handle
// -----------------------------------
bms.observe('formula', {
  selector: "#ev_handle",
  formulas: ["handle"],
  refinement: "R2GearDoorHandle",
  trigger: function(origin, r) {
    if (r[0] !== undefined) {
      origin.attr("xlink:href", "img/handle_" + r[0] + ".png")
    }
  }
});

bms.executeEvent({
  selector: "#green_light",
  refinement: "R7GearsDoorsHandleValvesControllerSwitchLights",
  events: [{
    name: "env_turn_on_green_light"
  }, {
    name: "env_turn_off_green_light"
  }]
});

bms.executeEvent({
  selector: "#orange_light",
  refinement: "R7GearsDoorsHandleValvesControllerSwitchLights",
  events: [{
    name: "env_turn_on_orange_light"
  }, {
    name: "env_turn_off_orange_light"
  }]
});

bms.executeEvent({
  selector: "#red_light",
  events: [{
    name: "env_turn_on_red_light"
  }, {
    name: "env_turn_off_red_light"
  }]
});

bms.executeEvent({
  selector: "#ev_handle",
  refinement: "R2GearDoorHandle",
  events: [{
    name: "toggle_handle_down"
  }, {
    name: "toggle_handle_up"
  }]
});

bms.executeEvent({
  selector: "#ev_general",
  refinement: "R6GearsDoorsHandleValvesControllerSwitch",
  events: [{
    name: "evn_open_general_valve"
  }, {
    name: "evn_close_general_valve"
  }]
});

bms.executeEvent({
  selector: "#ev_open_doors",
  events: [{
    name: "open_valve_door_open"
  }, {
    name: "close_valve_door_close"
  }]
});

bms.executeEvent({
  selector: "#ev_close_doors",
  events: [{
    name: "open_valve_door_close"
  }, {
    name: "close_valve_door_close"
  }]
});

bms.executeEvent({
  selector: "#ev_retraction_gears",
  events: [{
    name: "open_valve_retract_gear"
  }, {
    name: "close_valve_retract_gear"
  }]
});

bms.executeEvent({
  selector: "#ev_extended_gears",
  events: [{
    name: "open_valve_extend_gear"
  }, {
    name: "close_valve_extend_gear"
  }]
});

bms.executeEvent({
  selector: "#signal_close_door",
  refinement: "R5GearsDoorsHandleValvesController",
  events: [{
    name: "con_stimulate_close_door_valve"
  }, {
    name: "con_stop_stimulate_close_door_valve"
  }]
});

bms.executeEvent({
  selector: "#signal_open_door",
  refinement: "R5GearsDoorsHandleValvesController",
  events: [{
    name: "con_stimulate_open_door_valve"
  }, {
    name: "con_stop_stimulate_open_door_valve"
  }]
});

bms.executeEvent({
  selector: "#signal_retract_gears",
  refinement: "R5GearsDoorsHandleValvesController",
  events: [{
    name: "con_stimulate_retract_gear_valve"
  }, {
    name: "con_stop_stimulate_retract_gear_valve"
  }]
});

bms.executeEvent({
  selector: "#signal_extend_gears",
  refinement: "R5GearsDoorsHandleValvesController",
  events: [{
    name: "con_stimulate_extend_gear_valve"
  }, {
    name: "con_stop_stimulate_extend_gear_valve"
  }]
});

bms.executeEvent({
  selector: "#con_stimulate_general_valve",
  refinement: "R5GearsDoorsHandleValvesController",
  events: [{
    name: "con_stimulate_general_valve"
  }]
});

bms.executeEvent({
  selector: "#close_switch",
  refinement: "R6GearsDoorsHandleValvesControllerSwitch",
  events: [{
    name: "env_open_analogical_switch"
  }]
});

bms.executeEvent({
  selector: "#open_switch",
  refinement: "R6GearsDoorsHandleValvesControllerSwitch",
  events: [{
    name: "env_close_analogical_switch"
  }]
});

bms.observe("refinement", {
  selector: ".refinementGroup",
  refinement: function(origin) {
    return origin.attr("data-custom");
  },
  enable: function(origin) {
    origin.css("visibility", "visible");
  },
  disable: function(origin) {
    origin.css("visibility", "hidden");
  }
});

bms.observe("refinement", {
  selector: "#cylinders",
  refinement: "R3GearsDoorsHandle",
  enable: function(origin) {
    origin.find("#gears_doors_refined").css("visibility", "visible");
    origin.find("#gear_door_abstract").css("visibility", "hidden");
  },
  disable: function(origin) {
    origin.find("#gears_doors_refined").css("visibility", "hidden");
    origin.find("#gear_door_abstract").css("visibility", "visible");
  }
});
