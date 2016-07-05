requirejs(['../bmotion-frontend/app/bmotion.config'], function () {

    requirejs.config({
        baseUrl: "../bmotion-frontend/app/"
    });

    requirejs(['js/bmotion.online'], function () {

    });

});
