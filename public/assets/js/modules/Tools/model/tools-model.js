/*
* 用户中心
* */
define(['jquery', 'class', 'common', 'util' ], function ($, Class, Common, Util) {
    var Model = Class.create({
        initialize: function () {

        },
        /*
         * 积分兑换
         * */
        changeIntegral: function (postData,success) {
            this._url = '/User/changeIntegral';
            Common.ajax({
                url: this._url,
                data: postData,
                success: function (result) {
                    success && success(result);
                },
                error: function () {
                    Util.msg.error('网络异常，请稍后重试');
                }
            });
        },
        /*
         * 领取红包
         * */
        getRedPacket: function (postData,success) {
            this._url = '/RedPacket/getRedPacket';
            Common.ajax({
                url: this._url,
                data: postData,
                success: function (result) {
                    success && success(result);
                },
                error: function () {
                    Util.msg.error('网络异常，请稍后重试');
                }
            });
        },
        /*
         * 积分提现
         * */
        withdrawApply: function (postData,success) {
            this._url = '/User/withdrawApply';
            Common.ajax({
                url: this._url,
                data: postData,
                success: function (result) {
                    success && success(result);
                },
                error: function () {
                    Util.msg.error('网络异常，请稍后重试');
                }
            });
        },
        /*
         * 兑换红包
         * */
        exchange: function (postData,success) {
            this._url = '/RedPacket/exchange';
            Common.ajax({
                url: this._url,
                data: postData,
                success: function (result) {
                    success && success(result);
                },
                error: function () {
                    Util.msg.error('网络异常，请稍后重试');
                }
            });
        },
        /*
         * 私信回复
         * */
        sendMessage: function (postData,success) {
            this._url = '/User/sendMessage';
            Common.ajax({
                url: this._url,
                data: postData,
                success: function (result) {
                    success && success(result);
                },
                error: function () {
                    Util.msg.error('网络异常，请稍后重试');
                }
            });
        },
        /*
         * 修改密码
         * */
        doRecoverPassword: function (postData, success) {
            this._url = '/User/doRecoverPassword';
            Common.ajax({
                url: this._url,
                data: postData,
                success: function (result) {
                    success && success(result);
                },
                error: function () {
                    Util.msg.error('网络异常，请稍后重试');
                }
            });
        },
        /*
         * 找回密码
         * */
        recoverPassword: function (postData, success) {
            this._url = '/User/recoverPassword';
            Common.ajax({
                url: this._url,
                data: postData,
                success: function (result) {
                    success && success(result);
                },
                error: function () {
                    Util.msg.error('网络异常，请稍后重试');
                }
            });
        },
        /*
         * 发送邮箱找回密码邮件
         * */
        sendRecoverMail: function (postData, success) {
            this._url = '/User/sendRecoverMail';
            Common.ajax({
                url: this._url,
                data: postData,
                success: function (result) {
                    success && success(result);
                },
                error: function () {
                    Util.msg.error('网络异常，请稍后重试');
                }
            });
        },
        /*
         * 统计列表
         * */
        countList: function (postData, success) {
            this._url = '/Developer/countList';
            Common.ajax({
                url: this._url,
                data: postData,
                success: function (result) {
                    success && success(result);
                },
                error: function () {
                    Util.msg.error('网络异常，请稍后重试');
                }
            });
        },
        /*
         * 积分充值
         * */
        recharge: function (postData, success) {
            this._url = '/User/recharge';
            Common.ajax({
                url: this._url,
                data: postData,
                success: function (result) {
                    success && success(result);
                },
                error: function () {
                    Util.msg.error('充值失败');
                }
            });
        },
        /*
         * 修改密码
         * */
        changPassword: function (postData, success) {
            this._url = '/User/changPassword';
            Common.ajax({
                url: this._url,
                data: postData,
                success: function (result) {
                    success && success(result);
                },
                error: function () {
                    Util.msg.error('修改密码失败');
                }
            });
        },
        /*
         * 开发者认证
         * */
        certificate: function (postData, success) {
            this._url = '/User/certificate';
            Common.ajax({
                url: this._url,
                data: postData,
                success: function (result) {
                    success && success(result);
                },
                error: function () {
                    Util.msg.error('认证失败');
                }
            });
        },
        /*
         * 生成优惠码
         * */
        promo: function (postData, success) {
            this._url = '/Developer/promo';
            Common.ajax({
                url: this._url,
                data: postData,
                success: function (result) {
                    success && success(result);
                },
                error: function () {
                    Util.msg.error('优惠码生成失败');
                }
            });
        },
        /*
         * 注册
         * */
        doReg: function (postData, success) {
            this._url = '/doReg';
            Common.ajax({
                url: this._url,
                data: postData,
                success: function (result) {
                    success && success(result);
                },
                error: function () {
//                    Util.msg.error('注册失败');
                }
            });
        },
        /*
         * 登陆
         * */
        doLogin: function (postData, success) {
            this._url = '/doLogin';
            Common.ajax({
                url: this._url,
                data: postData,
                success: function (result) {
                    success && success(result);
                },
                error: function () {
//                    Util.msg.error('注册失败');
                }
            });
        },
        /*
         * 编辑用户信息
         * */
        info: function (postData, success) {
            this._url = '/user/info';
            Common.ajax({
                url: this._url,
                data: postData,
                success: function (result) {
                    success && success(result);
                },
                error: function () {
                    Util.msg.error('操作失败');
                }
            });
        },
        /*
         * 工具停用、启用、删除
         * */
        enable: function (postData, success) {
            this._url = '/ToolManage/enable';
            Common.ajax({
                url: this._url,
                data: postData,
                success: function (result) {
                    success && success(result);
                },
                error: function () {
                    Util.msg.error('操作失败');
                }
            });
        },
        /*
         * 添加工具
         * */
        addTools: function (postData, success) {
            this._url = '/Tools/addTool';
            Common.ajax({
                url: this._url,
                data: postData,
                success: function (result) {
                    success && success(result);
                },
                error: function () {
                    Util.msg.error('工具添加失败');
                }
            });
        },
        /*
         * 取消收藏
         * */
        collect: function (postData, success) {
            this._url = '/Tools/collect';
            Common.ajax({
                url: this._url,
                data: postData,
                success: function (result) {
                    success && success(result);
                },
                error: function () {
                    Util.msg.error('工具添加失败');
                }
            });
        },
        /*
         * 工具续费
         * */
        renewal: function (postData, success) {
            this._url = '/ToolManage/renewal';
            Common.ajax({
                url: this._url,
                data: postData,
                success: function (result) {
                    success && success(result);
                },
                error: function () {
                    Util.msg.error('工具添加失败');
                }
            });
        },

        /*
         * 工具下架/上线
         * */
        disable: function (postData, success) {
            this._url = '/Developer/disable';
            Common.ajax({
                url: this._url,
                data: postData,
                success: function (result) {
                    success && success(result);
                },
                error: function () {
                    Util.msg.error('操作失败');
                }
            });
        }

    });
    return Model;
});