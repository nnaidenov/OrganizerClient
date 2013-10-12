window.dataPersister = (function () {
    var UsersPersister = Class.create({
        init: function (apiUrl) {
            this.apiUrl = apiUrl
        },
        login: function (email, password) {
            var user = {
                email: email,
                authcode: CryptoJS.SHA1(password).toString()
            };

            return httpRequester.postJSON(this.apiUrl + "/login", user)
            .then(function (data) {
                localStorage.setItem("sessionKey", data.sessionKey);
                localStorage.setItem("username", data.username);
            });
        },
        register: function (username, password, mail) {
            var user = {
                authcode: CryptoJS.SHA1(password).toString(),
                email: mail
            };

            return httpRequester.postJSON(this.apiUrl + "/register", user).then(function (data) {
                localStorage.setItem("username", data.username);
                localStorage.setItem("sessionKey", data.sessionKey);
            });
        },
        logout: function () {
            var sessionKey = localStorage.getItem("sessionKey");
            if (sessionKey != "") {
                var headers = {
                    "X-sessionKey": sessionKey
                };
                return httpRequester.putJSON(this.apiUrl + "/logout", null, headers).then(function () {
                    localStorage.clear();
                });
            }
        },
        isLogin: function () {
            if (localStorage.getItem("sessionKey") == null) {
                return false;
            }
            else {
                return true;
            }
        },
        currentUser: function () {
            return localStorage.getItem("username");
        }
    });

    var TodosPersister = Class.create({
        init: function (apiUrl) {
            this.apiUrl = apiUrl;
        },
        create: function (title, description, dateAdded, category) {
            var todo = {
                title: title,
                description: description,
                date: dateAdded,
                category: category
            };

            var sessionKey = localStorage.getItem("sessionKey");
            console.log();
            if (sessionKey != "") {
                var headers = {
                    "X-sessionKey": sessionKey
                };
                return httpRequester.postJSON(this.apiUrl + "/create", todo, headers);
            }
        },
        all: function () {
            var sessionKey = localStorage.getItem("sessionKey");
            var date = localStorage.getItem("byDate");
            console.log();
            if (sessionKey != "") {
                var headers = {
                    "X-sessionKey": sessionKey
                };
                return httpRequester.getJSON(this.apiUrl + "/getbydate?date=" + date, headers);
            }
        }
    });

    var MainPersister = Class.create({
        init: function (rootUrl) {
            this.rootUrl = rootUrl;
            this.users = new UsersPersister(rootUrl + "users");
            this.todos = new TodosPersister(rootUrl + "todos");
        }
    });

    return {
        get: function (rootUrl) {
            return new MainPersister(rootUrl);
        }
    }
}());
