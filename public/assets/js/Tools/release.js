requirejs(["../config"], function () {
    require(["jquery", "Tools/viewModel/release"], function ($, ViewModel) {
        $(function () {
            new ViewModel();
        })
    })
});