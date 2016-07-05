requirejs(['bmotion.template'], function(bms) {

  // General refinement observer
  bms.observe("refinement", {
    selector: "g[data-refinement]",
    refinements: function(origin) {
      return origin.attr("data-refinement");
    },
    enable: {
      opacity: "1"
    },
    disable: {
      opacity: "0.1"
    }
  });

});
