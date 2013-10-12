window.httpRequester = (function () {
    var postRequest = function (url, data, headers) {
        var promise = new RSVP.Promise(function (resolve, reject) {
            var urlReq = url;
            var dataReq = JSON.stringify(data);

            $.ajax({
                url: urlReq,
                type: "POST",
                headers: headers,
                contentType: "application/json",
                data: dataReq || "",
                success: function (data) {
                    resolve(data);
                },
                error: function (errorM) {
                    reject(errorM);
                }
            });
        });

        return promise;
    };

    var putRequest = function (url, data, headers) {
        var promise = new RSVP.Promise(function (resolve, reject) {

            var urlReq = url;
            var dataReq = JSON.stringify(data);

            $.ajax({
                url: urlReq,
                type: "PUT",
                headers: headers,
                contentType: "application/json",
                data: dataReq || "",
                success: function (data) {
                    resolve(data);
                },
                error: function (errorM) {
                    reject(errorM);
                }
            });
        });
        return promise;
    };

    var getRequest = function (url, headers) {
        var promise = new RSVP.Promise(function (resolve, reject) {
            $.ajax({
                url: url,
                type: "GET",
                headers: headers,
                contentType: "application/json",
                success: function (data) {
                    resolve(data);
                },
                error: function (errorM) {
                    reject(errorM);
                }
            });
        });

        return promise;
    };

    var getTemplate = function (name) {
        var promise = new RSVP.Promise(function (resolve, reject) {

            $.ajax({
                url: "/views/partials/" + name + ".html",
                type: "GET",
                success: function (data) {
                    resolve(data);
                },
                error: function (errorM) {
                    reject(errorM);
                }
            });
        });
        return promise;
    };

    return {
        postJSON: postRequest,
        getJSON: getRequest,
        putJSON: putRequest,
        getTemplate: getTemplate
    }
}());