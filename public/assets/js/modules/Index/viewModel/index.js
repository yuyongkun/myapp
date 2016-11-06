define([
    'jquery',
    'class',
    'util' ,
    'common' ,
], function ($, Class, Util, Common) {
    var Index = Class.create({
        initialize: function () {
            Util.initCarouseImg();
            this.reCalculationPer();
            // 广告
            Util.initCarouseAd({
                id:'v5c',
                w:2000,
                fq:10,
                n:1,
                h:document.getElementById('v5c').clientHeight
            });
//            Util.initCarouseAd({
//                wrap:$('#notice-wrap'),
//                pre:$('.notice-pre'),
//                next:$('.notice-next'),
//                delay:100,
//                speed:6000,
//                autoRoll:true
//            });
            Common.bindEvent({
                'click': {
                    '.notice-next span': $.proxy(this.noticeNext, this),// 翻看广告
                    '.nav-head span': $.proxy(this.navHeadTab, this),// 翻看广告
//                    '.tsl-item': $.proxy(this.toToolsDetail, this),
//                    '.index-item': $.proxy(this.toToolsDetail, this),
                }
            });
        },
        reCalculationPer: function () {
            $('.tsw-mask').each(function (i, domFile) {
                var _percentage = $(domFile).data('percentage') / 5;
                var _width = 78 - 78 * _percentage;
                $(domFile).css('width', _width);
            });
        },
        toToolsDetail: function (e) {
            var tid = $(e.currentTarget).data('tid');
            location.href = '/tools/' + tid;
        },
        navHeadTab: function (e) {
            var _id = $(e.currentTarget).data('id');
            $(e.currentTarget).siblings('span').removeClass('m4-cur');
            $(e.currentTarget).addClass('m4-cur');
            $('.tools-list-tab').hide();
            $('#' + _id).show();
        },
        noticeNext: function () {

        }
    });
    return Index;
});