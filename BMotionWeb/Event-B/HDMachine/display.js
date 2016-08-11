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

bms.init(function() {
  $("#set_rinsing_parameters,.parameter_input").css("visibility", "hidden");
  $("#bt_therapy")
    .css('cursor', 'pointer')
    .click(function() {
      $("#set_rinsing_parameters,.parameter_input").css("visibility", "visible");
      $("#parameters_display").css("visibility", "hidden");
    });
  $("#bt_setRinsingParameters")
    .css('cursor', 'pointer')
    .click(function() {
      $("#set_rinsing_parameters,.parameter_input").css("visibility", "hidden");
      $("#parameters_display").css("visibility", "visible");
    });
});
