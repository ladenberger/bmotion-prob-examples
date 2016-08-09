var module = angular.module('phonebook', [])
  .controller("pCtrl", function($scope) {

    bms.observe("formula", {
      formulas: ["db", "active"],
      translate: true,
      trigger: function(values) {
        $scope.db = values[0];
        $scope.active = values[1];
      }
    });

    $scope.isActive = function(name) {
      return $scope.active.indexOf(name) > -1;
    };

  });

bms.observe("formula", {
  selector: "#lock",
  formulas: ["lock"],
  translate: true,
  trigger: function(origin, values) {
    origin.prop("checked", values[0]);
  }
});

bms.observe("formula", {
  selector: "#bt_add",
  formulas: ["lock"],
  translate: true,
  trigger: function(origin, values) {
    if (values[0]) {
      origin.addClass("disabled");
    } else {
      origin.removeClass("disabled");
    }
  }
});

bms.observe("formula", {
  selector: "#name,#nr,#bt_add",
  formulas: ["lock"],
  translate: true,
  trigger: function(origin, values) {
    origin.prop('disabled', values[0]);
  }
});

bms.handler("executeEvent", {
  selector: "#bt_add",
  events: [{
    name: "add",
    predicate: function(origin, container) {
      var name = container.find("#name");
      var nr = container.find("#nr");
      return "name = " + name.val() + " & nr = " + nr.val();
    }
  }],
  callback: function(origin, data) {
    alert(data.predicate + " successfully added to phonebook!");
  }
});

bms.handler("executeEvent", {
  selector: "#bt_search",
  events: [{
    name: "lookup",
    predicate: function(origin, container) {
      return "name = " + container.find("#nnsearch").val();
    }
  }],
  label: function(origin, event) {
    if (event.canExecute) {
      return "<span>Search for " + event.predicate + " in phonebook.</span>";
    } else {
      return "<span>" + event.predicate + " not in phonebook.</span>";
    }
  },
  callback: function(origin, data) {
    alert("Number of " + data.predicate + " is: " + data.returnValues[0]);
  }
});

bms.handler("executeEvent", {
  selector: "#lock",
  events: [{
    name: "lock"
  }, {
    name: "unlock"
  }]
});
