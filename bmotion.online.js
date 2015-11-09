requirejs(['../bmotion-prob-frontend/app/bmotion.config'], function () {

    requirejs.config({
        baseUrl: "../bmotion-prob-frontend/app/"
    });

    requirejs(['prob.online'], function () {
    });

});
