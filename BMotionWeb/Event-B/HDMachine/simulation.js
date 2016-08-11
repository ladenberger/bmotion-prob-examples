["AP", "VP", "BEP"].forEach(function(it) {

  bms.handler("executeEvent", {
    selector: "#bt_set" + it,
    events: [{
      name: "PM_SetsPressure",
      predicate: function(origin, container) {
        var apValue = container.find("#input_" + it).val();
        return "pm = " + it + " & prs =" + apValue;
      }
    }]
  });

  bms.handler("executeEvent", {
    selector: "#bt_set" + it + "Window",
    events: [{
      name: "CS_LowLevel_PM_ActivatesLimitWindow",
      predicate: function(origin, container) {
        var llValue = container.find("#input_low" + it).val();
        var lhValue = container.find("#input_high" + it).val();
        return "pm = " + it + " & ll=" + llValue + " & lh=" + lhValue;
      }
    }]
  });

  bms.handler("executeEvent", {
    selector: "#bt_deactivate" + it + "Window",
    events: [{
      name: "CS_LowLevel_PM_DeactivatesLimitWindow",
      predicate: function(origin, container) {
        return "pm = " + it;
      }
    }]
  });

});
