requirejs(['bmotion.template'], function (bms) {

    // -----------------------------------
    // Observe output orders to electro valves
    // -----------------------------------
    [
        {formula: "open_EV", element: "#e-order-open"},
        {formula: "close_EV", element: "#e-order-close"},
        {formula: "retract_EV", element: "#e-order-retract"},
        {formula: "extend_EV", element: "#e-order-extend"}
    ].forEach(function (v) {
            bms.observe('formula', {
                selector: v.element,
                formulas: [v.formula],
                trigger: function (origin, res) {
                    origin.attr("class", "o_" + res[0]);
                }
            });
        });

    // -----------------------------------
    // Observe valve circuits
    // -----------------------------------
    [
        {formula: "general_valve", element: "#hydraulic_circuit"},
        {formula: "valve_open_door", element: "#extension_circuit_doors"},
        {formula: "valve_close_door", element: "#retraction_circuit_doors"},
        {formula: "valve_extend_gear", element: "#extension_circuit_gears"},
        {formula: "valve_retract_gear", element: "#retraction_circuit_gears"}
    ].forEach(function (v) {
            bms.observe('formula', {
                selector: v.element,
                formulas: [v.formula],
                trigger: function (origin, res) {
                    origin.attr("class", "circuit_" + res[0]);
                }
            });
        });

    // -----------------------------------
    // Observe cylinders
    // -----------------------------------
    ["front", "left", "right"].forEach(function (v) {

        bms.observe('formula', {
            selector: "#" + v + "_gear_cylinder_l",
            formulas: ["(gears(" + v + ") = gear_moving & valve_extend_gear = valve_open) or (gears(" + v + ") = extended & valve_extend_gear = valve_open) or (gears(" + v + ") = retracted & valve_retract_gear = valve_open)"],
            trigger: function (origin, r) {
                origin.attr("fill", r[0] === "TRUE" ? "#88d2f7" : "#cccccc");
            }
        });

        bms.observe('formula', {
            selector: "#" + v + "_gear_cylinder_r",
            formulas: ["(gears(" + v + ") = gear_moving & valve_extend_gear = valve_open) or (gears(" + v + ") = extended & valve_extend_gear = valve_open) or (gears(" + v + ") = retracted & valve_retract_gear = valve_open)"],
            trigger: function (origin, r) {
                origin.attr("fill", r[0] === "TRUE" ? "#88d2f7" : "#cccccc");
            }
        });

        bms.observe('formula', {
            selector: "#" + v + "_door_cylinder_l",
            formulas: ["(doors(" + v + ") = door_moving & valve_open_door = valve_open) or (doors(" + v + ") = open & valve_open_door = valve_open) or (doors(" + v + ") = closed & valve_close_door = valve_open)"],
            trigger: function (origin, r) {
                origin.attr("fill", r[0] === "TRUE" ? "#88d2f7" : "#cccccc");
            }
        });

        bms.observe('formula', {
            selector: "#" + v + "_door_cylinder_r",
            formulas: ["(doors(" + v + ") = door_moving & valve_close_door = valve_open) or (doors(" + v + ") = open & valve_open_door = valve_open) or (doors(" + v + ") = closed & valve_close_door = valve_open)"],
            trigger: function (origin, r) {
                origin.attr("fill", r[0] === "TRUE" ? "#88d2f7" : "#cccccc");
            }
        });

        bms.observe('formula', {
            selector: "#" + v + "_door_cylinder",
            formulas: ["doors(" + v + ")"],
            trigger: function (origin, r) {
                var val = "translate(0,0)";
                switch (r[0]) {
                    case "closed":
                        val = "translate(0,0)";
                        break;
                    case "open":
                        val = "translate(90,0)";
                        break;
                    case "door_moving":
                        val = "translate(45,0)";
                        break;
                }
                origin.find("#" + v + "_door_cylinder_forcer").attr("transform", val);
            }
        });

        bms.observe('formula', {
            selector: "#" + v + "_gear_cylinder",
            formulas: ["gears(" + v + ")"],
            trigger: function (origin, r) {
                var val = "translate(0,0)";
                switch (r[0]) {
                    case "extended":
                        val = "translate(90,0)";
                        break;
                    case "retracted":
                        val = "translate(0,0)";
                        break;
                    case "gear_moving":
                        val = "translate(45,0)";
                        break;
                }
                origin.find("#" + v + "_gear_cylinder_forcer").attr("transform", val);
            }
        });

        bms.executeEvent({
            selector: "#" + v + "_door_cylinder",
            events: [
                {name: "env_start_open_door", predicate: "gr=" + v},
                {name: "env_open_door_skip", predicate: "gr=" + v},
                {name: "env_open_door_last", predicate: "gr=" + v},
                {name: "env_start_close_door", predicate: "gr=" + v},
                {name: "env_close_door", predicate: "gr=" + v},
                {name: "env_close_door_skip", predicate: "gr=" + v}
            ]
        });

        bms.executeEvent({
            selector: "#" + v + "_gear_cylinder",
            events: [
                {name: "env_start_retracting_first", predicate: "gr=" + v},
                {name: "env_retract_gear_skip", predicate: "gr=" + v},
                {name: "env_retract_gear_last", predicate: "gr=" + v},
                {name: "env_start_extending", predicate: "gr=" + v},
                {name: "env_extend_gear_skip", predicate: "gr=" + v},
                {name: "env_extend_gear_last", predicate: "gr=" + v}
            ]
        });

    });

    bms.observe('formula', {
        selector: "#oev_general",
        formulas: ["general_EV",
            "general_EV = TRUE & analogical_switch = switch_closed"],
        trigger: function (origin, r) {
            origin.find("#ge-order-1").attr("class", "o_" + r[0]);
            origin.find("#ge-order-2").attr("class", "o_" + r[1]);
        }
    });

    bms.observe('formula', {
        selector: "#electro-valves",
        formulas: ["valve_open_door = valve_open",
            "valve_close_door = valve_open",
            "valve_extend_gear = valve_open",
            "valve_retract_gear = valve_open"],
        trigger: function (origin, r) {
            origin.find("#ev_open_doors").attr("class", "ev_" + r[0]);
            origin.find("#ev_close_doors").attr("class", "ev_" + r[1]);
            origin.find("#ev_extended_gears").attr("class", "ev_" + r[2]);
            origin.find("#ev_retraction_gears").attr("class", "ev_" + r[3]);
        }
    });

    bms.observe('formula', {
        selector: "#ev_general",
        formulas: ["general_valve = valve_open"],
        trigger: function (origin, r) {
            origin.attr("class", "ev_" + r[0]);
        }
    });

    // -----------------------------------
    // Observe analogical switch
    // -----------------------------------
    bms.observe('formula', {
        selector: "#analogical_switch",
        formulas: ["general_EV = TRUE & analogical_switch = switch_closed",
            "analogical_switch"],
        trigger: function (origin, r) {
            var ss = r[1];
            origin.attr("class", "switch_" + r[0]);
            origin.find("#switch").attr("y", ss === "switch_open" ? 200 : 216);
            origin.find("#switch_to_handle").attr("y2", ss === "switch_open" ? 212 : 220);
            var y = ss === "switch_open" ? 207 : 218;
            origin.find("#switchi1").attr("y2", y);
            origin.find("#switchi2").attr("y1", y).attr("y2", y);
        }
    });

    bms.observe('formula', {
        selector: "#sensors",
        formulas: [
            "ran(sensors_gear_extended(front)) = {TRUE}",
            "ran(sensors_gear_extended(right)) = {TRUE}",
            "ran(sensors_gear_extended(left)) = {TRUE}",
            "ran(sensors_gear_retracted(front)) = {TRUE}",
            "ran(sensors_gear_retracted(right)) = {TRUE}",
            "ran(sensors_gear_retracted(left)) = {TRUE}",
            "ran(sensors_door_open(front)) = {TRUE}",
            "ran(sensors_door_open(right)) = {TRUE}",
            "ran(sensors_door_open(left)) = {TRUE}",
            "ran(sensors_door_closed(front)) = {TRUE}",
            "ran(sensors_door_closed(right)) = {TRUE}",
            "ran(sensors_door_closed(left)) = {TRUE}",
            "ran(sensors_handle) = {up}",
            "ran(sensors_shock_absorber) = {ground}"
        ],
        trigger: function (origin, r) {
            var elems = [
                "#gear_extended_front",
                "#gear_extended_right",
                "#gear_extended_left",
                "#gear_retracted_front",
                "#gear_retracted_right",
                "#gear_retracted_left",
                "#door_open_front",
                "#door_open_right",
                "#door_open_left",
                "#door_closed_front",
                "#door_closed_right",
                "#door_closed_left",
                "#sensor_handle",
                "#sensor_shock_absorber"
            ];
            elems.forEach(function(i, v) {
                origin.find(v).css("stroke", r[i] === "TRUE" ? "green" : "red");
            });
        }
    });

    // -----------------------------------
    // Observe cockpit lights
    // -----------------------------------
    bms.observe('formula', {
        selector: "#green_light",
        formulas: ["green_light"],
        trigger: function (origin, r) {
            origin.css("fill", r[0] === "on" ? "green" : "#cfffa0");
        }
    });

    bms.observe('formula', {
        selector: "#orange_light",
        formulas: ["orange_light"],
        trigger: function (origin, r) {
            origin.css("fill", r[0] === "on" ? "orange" : "#ffe7ad");
        }
    });

    bms.observe('formula', {
        selector: "#red_light",
        formulas: ["red_light"],
        trigger: function (origin, r) {
            origin.css("fill", r[0] === "on" ? "red" : "#ffc9c9");
        }
    });

    // -----------------------------------
    // Observe handle
    // -----------------------------------
    bms.observe('formula', {
        selector: "#ev_handle",
        formulas: ["handle"],
        trigger: function (origin, r) {
            if (r[0] !== undefined) {
                origin.attr("xlink:href", "img/handle_" + r[0] + ".png")
            }
        }
    });

    bms.executeEvent({
        selector: "#green_light",
        events: [{name: "env_turn_on_green_light"}, {name: "env_turn_off_green_light"}]
    });

    bms.executeEvent({
        selector: "#orange_light",
        events: [{name: "env_turn_on_orange_light"}, {name: "env_turn_off_orange_light"}]
    });

    bms.executeEvent({
        selector: "#red_light",
        events: [{name: "env_turn_on_red_light"}, {name: "env_turn_off_red_light"}]
    });

    bms.executeEvent({
        selector: "#ev_handle",
        events: [{name: "toggle_handle_down"}, {name: "toggle_handle_up"}]
    });

    bms.executeEvent({
        selector: "#ev_general",
        events: [{name: "evn_open_general_valve"}, {name: "evn_close_general_valve"}]
    });

    bms.executeEvent({
        selector: "#ev_open_doors",
        events: [{name: "open_valve_door_open"}, {name: "close_valve_door_close"}]
    });

    bms.executeEvent({
        selector: "#ev_close_doors",
        events: [{name: "open_valve_door_close"}, {name: "close_valve_door_close"}]
    });

    bms.executeEvent({
        selector: "#ev_retraction_gears",
        events: [{name: "open_valve_retract_gear"}, {name: "close_valve_retract_gear"}]
    });

    bms.executeEvent({
        selector: "#ev_extended_gears",
        events: [{name: "open_valve_extend_gear"}, {name: "close_valve_extend_gear"}]
    });

    bms.executeEvent({
        selector: "#signal_close_door",
        events: [{name: "con_stimulate_close_door_valve"}, {name: "con_stop_stimulate_close_door_valve"}]
    });

    bms.executeEvent({
        selector: "#signal_open_door",
        events: [{name: "con_stimulate_open_door_valve"}, {name: "con_stop_stimulate_open_door_valve"}]
    });

    bms.executeEvent({
        selector: "#signal_retract_gears",
        events: [{name: "con_stimulate_retract_gear_valve"}, {name: "con_stop_stimulate_retract_gear_valve"}]
    });

    bms.executeEvent({
        selector: "#signal_extend_gears",
        events: [{name: "con_stimulate_extend_gear_valve"}, {name: "con_stop_stimulate_extend_gear_valve"}]
    });

    bms.executeEvent({
        selector: "#con_stimulate_general_valve",
        events: [{name: "con_stimulate_general_valve"}]
    });

    bms.executeEvent({
        selector: "#switch",
        events: [
            {name: "env_close_analogical_switch"},
            {name: "env_open_analogical_switch"}
        ]
    });

});
