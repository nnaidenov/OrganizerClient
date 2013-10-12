(function (a) {
    var persister = new dataPersister.get("http://mobileorganizer.apphb.com/api/");
 
    var viewModel = kendo.observable({
        title: "dsds",
        description: "",
        todoDate: "",
        createButton: createTodo
    });

    function initTodo() {
        kendo.bind($("#create-todo-view"), viewModel);
    }

    function createTodo() {
        app.application.pane.loader.show();
        $("loaderCreate").css("display", "");
        setTimeout(function () { }, 2500);
        var errorsText = "";
        var isValidModel = true;

        if (this.get("title").length < 1) {
            errorsText += "Title is required! <br/>";
            isValidModel = false;
        }

        if (this.get("description").length < 1) {
            errorsText += "Description is required!  <br/>";
            isValidModel = false;
        }

        if (this.get("todoDate").length < 1) {
            errorsText += "Date is required!  <br/>";
            isValidModel = false;
        }

        if (isValidModel) {
            $(".validationError").html("");
            persister.todos.create(this.get("title"), this.get("description"), this.get("todoDate"), "business")
            .then(function (data) {
                app.application.pane.loader.hide();
                navigator.notification.alert("Created!");
                viewModel.set("title", "");
                viewModel.set("description", "");
                viewModel.set("todoDate", "");
            }, function (data) {
                $(".validationError").text(data.responseText);
            });
        }
        else {
            console.log(errorsText);
            $(".validationError").html(errorsText);
        }
    }

    a.createTodo = {
        init: initTodo
    };
}(app));
