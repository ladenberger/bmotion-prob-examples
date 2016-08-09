bms.observe("formula", {
  selector: "#label_ccs_status",
  formulas: ["ccs_status"],
  trigger: function(origin, values) {
    origin.text(values[0]);
  }
});

bms.observe("formula", {
  selector: "#label_ccs_target",
  formulas: ["ccs_target"],
  trigger: function(origin, values) {
    origin.text(values[0]);
  }
});

bms.observe("formula", {
  selector: "#label_car_speed",
  formulas: ["car_speed"],
  trigger: function(origin, values) {
    origin.text(values[0]);
  }
});

bms.observe("formula", {
  selector: "#label_car_breaking",
  formulas: ["car_braking"],
  trigger: function(origin, values) {
    origin.text(values[0]);
  }
});

bms.observe("formula", {
  selector: "#tacho_speed",
  formulas: ["car_speed"],
  trigger: function(origin, values) {
    origin.text(values[0] + " km/h");
  }
});

bms.observe("formula", {
  selector: "#tacho_target",
  formulas: ["ccs_target", "ccs_status"],
  trigger: function(origin, values) {
    origin.text(values[0] + " km/h");
    if (values[1] === "cruise") {
      origin.attr("fill", "green");
    } else if (values[1] === "standby") {
      origin.attr("fill", "orange");
    } else {
      origin.attr("fill", "black");
    }
  }
});

bms.observe("formula", {
  selector: "#ccs_icon",
  formulas: ["ccs_status"],
  trigger: function(origin, values) {
    if (values[0] === "cruise") {
      origin.attr("xlink:href", "icon_cruise.png");
    } else if (values[0] === "standby") {
      origin.attr("xlink:href", "icon_standby.png");
    } else {
      origin.attr("xlink:href", "icon_default.png");
    }
  }
});

bms.handler("executeEvent", {
  selector: "#btOnOff",
  events: [{
    name: "USER_SwitchON"
  }, {
    name: "USER_SwitchOFF"
  }]
});

bms.handler("executeEvent", {
  selector: "#brakePedal",
  events: [{
    name: "CAR_BrakeOn"
  }, {
    name: "CAR_BrakeOff"
  }]
});

bms.handler("executeEvent", {
  selector: "#btSet",
  events: [{
    name: "USER_SetTaget"
  }]
});

bms.handler("executeEvent", {
  selector: "#acceleratePedal",
  events: [{
    name: "CAR_Adapt_Speed",
    predicate: function(origin, container) {
      var speed = container.find("#car_speed").val();
      if (speed.length > 0) {
        return "s=" + speed
      } else {
        return ""
      }
    }
  }]
});

bms.handler("executeEvent", {
  selector: "#btSpeedUp",
  events: [{
    name: "USER_Adapt_Speed",
    predicate: "s=1"
  }, {
    name: "USER_Adapt_Speed",
    predicate: "s=5"
  }],
  label: function(origin, event) {
    return "Increase speed " + event.predicate;
  }
});


bms.handler("executeEvent", {
  selector: "#btSpeedDown",
  events: [{
    name: "USER_Adapt_Speed",
    predicate: "s=-1"
  }, {
    name: "USER_Adapt_Speed",
    predicate: "s=-5"
  }],
  label: function(origin, event) {
    return "Decrease speed " + event.predicate;
  }
});

bms.handler("executeEvent", {
  selector: "#btCCSSpeedUp",
  events: [{
    name: "CCS_Adapt_Speed_Up",
    predicate: function(origin, container) {
      var speed = container.find("#ccs_speed").val();
      if (speed.length > 0) {
        return "s=" + speed;
      } else {
        return "s=1";
      }
    }
  }]
});

bms.handler("executeEvent", {
  selector: "#btCCSSpeedDown",
  events: [{
    name: "CCS_Adapt_Speed_Down",
    predicate: function(origin, container) {
      var speed = container.find("#ccs_speed").val();
      if (speed.length > 0) {
        return "s=-" + speed;
      } else {
        return "s=-1";
      }
    }
  }]
});
