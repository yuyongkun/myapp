requirejs(['../config'],function(){
    require(['jquery','User/viewModel/login'],function($,ViewModel){
        $(function(){
            new ViewModel();
        });
    });
});
