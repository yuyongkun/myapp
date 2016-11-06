define([
    'jquery',
    'class',
    'util' ,
    'common' ,
    '../model/management-tool-model'
], function ($, Class, Util, Common, Model) {
    var Info = Class.create({
        initialize: function () {
            this.model = new Model();
            //绑定事件
            this.bindEvent();
        },
        bindEvent: function () {
            Common.bindEvent({
                'click': {
                    '.rebtn': $.proxy(this.submit, this),// 马上注册
                    '.regist-selection-box': $.proxy(this.registSelectionBox, this)
                }
            });
        },
        submit: function () {
            var name = $('.regist-name').val();
            var email = $('.regist-email').val();
            var pw = $('.regist-pw').val();
//            if(name==''){
//                Util.msg.warning('用户名不能为空');
//                return;
//            }
//            if(email==''){
//                Util.msg.warning('邮箱不能为空');
//                return;
//            }
//            if(!Util.regMap.verifyEmail.test(email)){
//                Util.msg.warning('请输入有效的邮箱');
//                return;
//            }
//            if(pw==''){
//                Util.msg.warning('密码不能为空');
//                return;
//            }
//            if($('.regist-selection-box')[0].className.indexOf('ucw-select-cur')==-1){
//                Util.msg.warning('请勾选同意按钮');
//                return;
//            }
            this.model.doReg({
                username:name,
//                email:email,
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
        },
        registSelectionBox: function (e) {
            $(e.currentTarget).toggleClass('ucw-select-cur');
        }
    });
    return Info;
});