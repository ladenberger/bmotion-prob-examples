requirejs(['bmotion.template'], function (bms) {

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
