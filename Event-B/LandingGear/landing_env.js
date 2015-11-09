requirejs(['bmotion.template'], function (bms) {

    ["front", "left", "right"].forEach(function (v) {

        bms.observe('formula', {
            selector: "#" + v + "_door_img",
            formulas: ["doors(" + v + ")"],
            trigger: function (origin, r) {
                var img = origin.find("img");
                img.attr("src", "img/door_" + r[0] + ".png")
            }
        });

        bms.observe('formula', {
            selector: "#" + v + "_gear_img",
            formulas: ["gears(" + v + ")"],
            trigger: function (origin, r) {
                var img = origin.find("img");
                img.attr("src", "img/gear_" + r[0] + ".png")
            }
        });

    });

});
