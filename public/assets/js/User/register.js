requirejs(['../config'],function(){
    require(['jquery','User/viewModel/register'],function($,ViewModel){
        $(function(){
            new ViewModel();
        });
    });
});
