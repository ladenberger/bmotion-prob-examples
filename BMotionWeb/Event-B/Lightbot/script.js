bms.init(function() {
  bms.eval({
    selector: "#field",
    formulas: ["level"],
    translate: true,
    trigger: function(field, res) {

      // Setup Level
      field.empty();
      res[0].forEach(function(v) {
        var x = v[0][0] * 75;
        var y = v[0][1] * 75;
        var level = v[1];
        field.append('<g transform="translate(' + x + ',' + y + ')">' +
          '<rect x="0" y="0" width="75" height="75" fill="lightgray" stroke="black" stroke-width="1" id="' + v[0][0] + '_' + v[0][1] + '"></rect>' +
          '<text x="5" y="12" font-family="Verdana" font-size="10" fill="black">' + level + '</text>' +
          '</g>');
      });
      field.html(function() {
        return this.innerHTML
      });
      var lightbot = document.getElementById("lightbot");
      var bbox = lightbot.getBBox();
      lightbot.setAttribute("width", bbox.x + bbox.width + "px");
      lightbot.setAttribute("height", bbox.x + bbox.height + "px");

    }
  });

  bms.eval({
    selector: "#programs",
    formulas: ["program_size"],
    translate: true,
    trigger: function(origin, res) {
      // Set program size
      origin.find("[id$=_program_container]")
        .css("display", "none");
      res[0].forEach(function(v) {
        var name = v[0].value;
        var size = v[1];
        origin.find("#" + name + "_program_container")
          .css("width", size * 76 + "px")
          .css("display", "block");
        origin.find("#" + name + "_program_size")
          .html("(" + size + ")");
      });
    }
  });

  bms.observe("formula", {
    selector: "#field",
    formulas: ["light_state"],
    translate: true,
    trigger: function(origin, res) {
      res[0].forEach(function(v) {
        var x = v[0][0];
        var y = v[0][1];
        var state = v[1];
        origin.find("#" + x + "_" + y).attr("fill", state ? "yellow" : "#ADD8E6")
      });
    }
  });

});

bms.observe("formula", {
  selector: "#programs",
  formulas: ["programs"],
  translate: true,
  trigger: function(origin, res) {
    var main = origin.find("#main_program_content");
    var proc1 = origin.find("#proc1_program_content");
    var proc2 = origin.find("#proc2_program_content");
    main.empty();
    proc1.empty();
    proc2.empty();
    res[0].forEach(function(v) {
      var p = v[0];
      var elements = [];
      var container = origin.find("#" + p.value + "_program_content");
      v[1].forEach(function(v2) {
        container.append('<img src="img/bt_' + v2[1].value + '.png"/>');
      });
    });
  }
});

bms.observe("formula", {
  selector: "#robot",
  translate: true,
  formulas: ["bot_x", "bot_y"],
  trigger: function(origin, res) {
    origin.attr("x", res[0] * 75 + 20)
      .attr("y", res[1] * 75 + 20);
  }
});

bms.observe("formula", {
  selector: "#robot",
  formulas: ["bot_direction"],
  trigger: function(origin, res) {
    origin.attr("xlink:href", "img/robot_" + res[0] + ".png")
  }
});

bms.executeEvent({
  selector: "img[data-cmd]",
  events: [{
    name: "add_command",
    predicate: function(origin) {
      return "p=main & c=" + origin.attr("data-cmd")
    }
  }, {
    name: "add_command",
    predicate: function(origin) {
      return "p=proc1 & c=" + origin.attr("data-cmd")
    }
  }, {
    name: "add_command",
    predicate: function(origin) {
      return "p=proc2 & c=" + origin.attr("data-cmd")
    }
  }]
});
