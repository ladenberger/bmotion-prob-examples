bms.observe("formula", {
  selector: "#CF_TESTING_SIGNAL",
  formulas: ["signal_status(CF_TESTING_SIGNAL)"],
  trigger: function(origin, values) {
    var colors = {
      "SIGNAL_OFF": "lightgray",
      "SIGNAL_RED": "red",
      "SIGNAL_GREEN": "green",
      "SIGNAL_ORANGE": "orange"
    }
    origin.find("#signal_CF_TESTING_SIGNAL").attr("fill", colors[values[0]]);
  }
});

bms.observe("formula", {
  selector: "#bt_power",
  formulas: ["CS_TopLevel"],
  trigger: function(origin, values) {
    origin.find("path").attr("fill", values[0] === "STANDBY" ? "#840000" : "#077700");
  }
});

bms.observe("formula", {
  selector: "#fillingBPRate",
  formulas: ["fillingBPRate"],
  trigger: function(origin, values) {
    origin.find("#fillingBPRate_val").text(values[0]);
  }
});

bms.observe("formula", {
  selector: "#fillingBPRate",
  formulas: ["fillingBPRate"],
  trigger: function(origin, values) {
    origin.find("#fillingBPRate_val").text(values[0]);
  }
});

bms.observe("formula", {
  selector: "#fillingBPVolume",
  formulas: ["fillingBPVolume"],
  trigger: function(origin, values) {
    origin.find("#fillingBPVolume_val").text(values[0]);
  }
});

bms.observe("formula", {
  selector: "#rinsingBPRate",
  formulas: ["rinsingBPRate"],
  trigger: function(origin, values) {
    origin.find("#rinsingBPRate_val").text(values[0]);
  }
});

bms.observe("formula", {
  selector: "#DFFlow",
  formulas: ["DFFlow"],
  trigger: function(origin, values) {
    origin.find("#DFFlow_val").text(values[0]);
  }
});

bms.observe("formula", {
  selector: "#UFRinsingRate",
  formulas: ["UFRinsingRate"],
  trigger: function(origin, values) {
    origin.find("#UFRinsingRate_val").text(values[0]);
  }
});

bms.observe("formula", {
  selector: "#UFRinsingVolume",
  formulas: ["UFRinsingVolume"],
  trigger: function(origin, values) {
    origin.find("#UFRinsingVolume_val").text(values[0]);
  }
});

bms.observe("formula", {
  selector: "#bloodFlow",
  formulas: ["bloodFlow"],
  trigger: function(origin, values) {
    origin.find("#bloodFlow_val").text(values[0]);
  }
});

["AP", "VP", "BEP"].forEach(function(it) {

  bms.observe("formula", {
    selector: "#" + it + "_display",
    formulas: ["pressure(" + it + ")", "limit_high(" + it + ")", "limit_low(" + it + ")"],
    trigger: function(origin, values) {
      origin.find("#" + it + "_value").text(values[0]);
      origin.find("#" + it + "_limit_high").text(values[1]);
      origin.find("#" + it + "_limit_low").text(values[2]);
      var range = values[1] - values[2];
      if (range > 0) {
        var offset = values[2] < 0 ? values[2] * -1 : 0;
        var einheit = range < 50 ? 50 / range : range / 50;
        origin.find("#" + it + "_line").attr("transform", "translate(0,-" + einheit * (values[0] + offset) + ")");
      }
    }
  });

});

bms.observe("formula", {
  selector: "#label_phase",
  formulas: ["CS_TopLevel"],
  trigger: function(origin, values) {
    origin.text(values[0]);
  }
});

bms.observe("formula", {
  selector: ".parameter_input",
  formulas: ["PREPARATION_sm"],
  trigger: function(origin, values) {
    if (values[0] === "RP_SETTING") {
      origin.prop("disabled", false);
      $("#set_rinsing_parameters,.parameter_input").css("visibility", "visible");
      $("#parameters_display").css("visibility", "hidden");
    } else {
      origin.prop("disabled", true);
    }
  }
});

bms.handler("executeEvent", {
  selector: "#bt_setUFVolume",
  events: [{
    name: "User_SetUFRinsingVolumeParameter",
    predicate: function(origin, container) {
      var val = container.find("#input_UFVolume").val();
      return "p=" + val;
    }
  }]
});

bms.handler("executeEvent", {
  selector: "#bt_setUFRate",
  events: [{
    name: "User_SetUFRinsingRateParameter",
    predicate: function(origin, container) {
      var val = container.find("#input_UFRate").val();
      return "p=" + val;
    }
  }]
});

bms.handler("executeEvent", {
  selector: "#bt_setDFFlow",
  events: [{
    name: "User_SetDFFlowParameter",
    predicate: function(origin, container) {
      var val = container.find("#input_DFFlow").val();
      return "p=" + val;
    }
  }]
});

bms.handler("executeEvent", {
  selector: "#bt_setBloodFlow",
  events: [{
    name: "User_SetBloodFlowParameter",
    predicate: function(origin, container) {
      var val = container.find("#input_BloodFlow").val();
      return "p=" + val;
    }
  }]
});

bms.handler("executeEvent", {
  selector: "#bt_setFillingBPVolume",
  events: [{
    name: "User_SetFillingBPVolumeParameter",
    predicate: function(origin, container) {
      var val = container.find("#input_FillingBPVolume").val();
      return "p=" + val;
    }
  }]
});

bms.handler("executeEvent", {
  selector: "#bt_setFillingBPRate",
  events: [{
    name: "User_SetFillingBPRateParameter",
    predicate: function(origin, container) {
      var val = container.find("#input_FillingBPRate").val();
      return "p=" + val;
    }
  }]
});

bms.handler("executeEvent", {
  selector: "#bt_setRinsingBPRate",
  events: [{
    name: "User_SetRinsingBPRateParameter",
    predicate: function(origin, container) {
      var val = container.find("#input_RinsingBPRate").val();
      return "p=" + val;
    }
  }]
});

bms.onLoadSvg("display", function() {
  $("#set_rinsing_parameters,.parameter_input").css("visibility", "hidden");
  $("#bt_therapy")
    .css('cursor', 'pointer')
    .click(function() {
      $("#set_rinsing_parameters,.parameter_input").css("visibility", "hidden");
      $("#parameters_display").css("visibility", "visible");
    });
  $("#bt_setRinsingParameters")
    .css('cursor', 'pointer')
    .click(function() {
      $("#set_rinsing_parameters,.parameter_input").css("visibility", "visible");
      $("#parameters_display").css("visibility", "hidden");
    });
});
