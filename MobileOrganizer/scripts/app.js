window.app = window.app || {};

document.addEventListener("deviceready", function () {
    app.application = new kendo.mobile.Application(document.body);
});