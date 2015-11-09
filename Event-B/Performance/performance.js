requirejs(['bmotion.template'], function (bms) {

    var ele = $("#performance");

    var str = "";

    for (var i = 1; i <= 2000; i++) {

        str = str + '<div id="a' + i + '" style="height:10px;width:10px;display:block;background-color:red;float:left;"></div>';

        bms.observe('formula', {
            selector: "#a" + i,
            formulas: ["x(1)"],
            trigger: function (origin, r) {
                return {
                    style: r[0] === "TRUE" ? "background-color:green;width:100px;height:100px;display:block;float:left" : "background-color:red;width:100px;height:100px;display:block;float:left"
                }
            }
        });

        /*bmotion.registerObserver('performanceObservers', {
         type: "predicate",
         data: {
         selector: "#a" + i + ",#b" + i + ",#c" + i + ",#d" + i + ",#e" + i + ",#f" + i + ",#g" + i,
         predicate: "x(" + 1 + ")",
         true: {
         style: "background-color:green;width:100px;height:100px;display:block;float:left"
         },
         false: {
         style: "background-color:red;width:100px;height:100px;display:block;float:left"
         }
         }
         });*/

    }

    ele.append(str);

});
