bms.observe("formula", {
  selector: "#connected_concentrate",
  formulas: ["connected_concentrate"],
  trigger: function(origin, values) {
    origin.attr("opacity", values[0] === "CONCENTRATE_NONE" ? 0 : 1);
    origin.find("text").text(values[0].replace("CONCENTRATE_", ""));
  }
});

bms.observe("formula", {
  selector: "#patient_connection",
  formulas: ["PATIENT_CONNECTIONS"],
  trigger: function(origin, values) {
    var ven = origin.find("#connected_venously");
    var art = origin.find("#connected_aterially");
    var patient = origin.find("#patient");
    if (values[0] === "PATIENT_BOTH_CONNECTED") {
      patient.attr("opacity", 1);
      ven.attr("opacity", 1);
      art.attr("opacity", 1);
    } else if (values[0] === "PATIENT_ARTERIALLY_CONNECTED") {
      patient.attr("opacity", 1);
      ven.attr("opacity", 0);
      art.attr("opacity", 1);
    } else if (values[0] === "PATIENT_VENOUSLY_CONNECTED") {
      patient.attr("opacity", 1);
      ven.attr("opacity", 1);
      art.attr("opacity", 0);
    } else {
      patient.attr("opacity", 0);
      ven.attr("opacity", 0);
      art.attr("opacity", 0);
    }
  }
});

["AP", "VP", "BEP"].forEach(function(it) {

  bms.observe("formula", {
    selector: "#" + it + "_display",
    formulas: ["pressure(" + it + ")"],
    refinement: "m911",
    trigger: function(origin, values) {
      origin.find("#" + it + "_value").text(values[0] + " mmHg");
    }
  });

});

bms.observe("formula", {
  selector: "#blood_pump",
  formulas: ["BP_active"],
  refinement: "m913",
  translate: true,
  trigger: function(origin, values) {
    var bp_value = origin.find("#BP_value");
    var patient_blood_flow = origin.find("#patient_blood_flow");
    if (values[0]) {
      bp_value.text("Running");
      patient_blood_flow.attr("opactiy", "1");
    } else {
      bp_value.text("Not running");
      patient_blood_flow.attr("opacity", "0");
    }
  }
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
