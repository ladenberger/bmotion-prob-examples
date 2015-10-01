requirejs(['../../../app/bmotion.config'], function () {

    requirejs.config({
        baseUrl: "../../../app/"
    });

    requirejs(['bmotion.template'], function (bms) {

        /*bms.observe('formula', {
         selector: 'text[data-floor]',
         formulas: ["floor"],
         translate: true,
         trigger: function (origin, data) {
         origin.attr("fill", origin.attr("data-floor") === data[0] ? "green" : "red");
         }
         });*/

        bms.observe('formula', {
            selector: '#txt_floor',
            formulas: ["floor"],
            trigger: function (origin, r) {
                origin.text('Current Floor: ' + r[0]);
            }
        });

        bms.observe("formula", {
            selector: "#txt_direction",
            formulas: ["move"],
            trigger: function (origin, r) {
                origin.text('Moving: ' + r[0]);
            }
        });

        bms.executeEvent({
            selector: "#txt_direction",
            events: [{name: "switch_move_up"}, {name: "switch_move_dn"}]
        });

        bms.observe('formula', {
            selector: '#lift',
            formulas: ["floor"],
            trigger: function (origin, val) {
                var door = origin.find("#door");
                switch (val[0]) {
                    case "0":
                        door.attr("y", "275");
                        break;
                    case "1":
                        door.attr("y", "175");
                        break;
                    case "2":
                        door.attr("y", "60");
                        break;
                }
            }
        });

        /*bms.observe("formula", {
         selector: "#door",
         formulas: ["door"],
         trigger: function (origin, val) {
         val[0] === "open" ? origin.attr("fill", "white") : origin.attr("fill", "lightgray");
         }
         });*/

        bms.observe("bset", {
            selector: "#request",
            expression: "request",
            convert: function (id) {
                switch (id) {
                    case 0:
                        return "#label_floor_-1";
                        break;
                    case 1:
                        return "#label_floor_0";
                        break;
                    case 2:
                        return "#label_floor_1";
                        break;
                }
            },
            transform: {
                fill: "orange"
            }
        });

        bms.observe("formula", {
            selector: "#door",
            formulas: ["door"],
            trigger: function (origin, val) {
                if (val[0] === "open") {
                    return {"fill": "white"};
                } else {
                    return {"fill": "lightgray"};
                }
            }
        });

        bms.executeEvent({
            selector: '#door',
            events: [{name: "close_door"}, {name: "open_door"}, {name: "move_serve"}]
        });

        bms.executeEvent({
            selector: "text[data-floor]",
            events: [
                {
                    name: "send_request", predicate: function (origin) {
                    return "f=" + origin.attr("data-floor")
                }
                }
            ]
        });

    });

});