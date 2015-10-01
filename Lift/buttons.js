requirejs(['../../../app/bmotion.config'], function () {

    requirejs.config({
        baseUrl: "../../../app/"
    });

    requirejs(['bmotion.template'], function (bms) {

        bms.executeEvent({
            selector: "#bt_move_up",
            events: [{name: "move_up"}, {name: "move_up_stop"}]
        });

        bms.executeEvent({
            selector: "#bt_move_down",
            events: [{name: "move_dn"}, {name: "move_dn_stop"}]
        });

    });

});