define([
    'jquery',
    'class',
    'util' ,
    'common' ,
    '../model/management-tool-model'
], function ($, Class, Util, Common, Model) {
    var Info = Class.create({
        initialize: function () {
            var self=this;
            this.model = new Model();
            $('#btnLogin').click(function(){
                var name=$('#LoginName').val();
                var pw=$('#Password').val();
                self.model.doLogin({
                    username:name,
                    password:pw
                }, function (result) {
                    if (result.status) {
                        Util.msg.success(result.info);
                    setTimeout(function () {
                        location.href = '/';
                    }, 1000);
                    } else {
                        Util.msg.warning(result.info);
                    }
                });
            });
        }
    });
    return Info;
});