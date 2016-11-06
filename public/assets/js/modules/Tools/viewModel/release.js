define("Tools/viewModel/release", ["jquery", "class", "util", "common", "../model/tools-model", "ZeroClipboard.min"], function (e, t, r, i, n, s) {
    window.ZeroClipboard = s;
    var a, o = !1, l = t.create({initialize: function () {
        this.model = new n, this.bindEvent(), require(["ueditor.all.min"], function () {
            a = UE.getEditor("editor")
        }), sessionStorage.setItem("DEVELOPER", 0)
    }, bindEvent: function () {
        i.bindEvent({click: {".release-submit": e.proxy(this.release, this), ".tol-charge-mode .tol-radio": e.proxy(this.chargeMode, this), ".tol-sub-agree": e.proxy(this.tolSubAgree, this), ".get-label": e.proxy(this.getLabel, this), ".label-icon": e.proxy(this.operaLabel, this), ".fun-zone span": e.proxy(this.funLabel, this), ".tol-invite-close": e.proxy(this.tolInviteClose, this), ".invite-list ul li": e.proxy(this.addUser, this), ".closeLabel": e.proxy(this.closeLabel, this), ".release-np-page span": e.proxy(this.releaseNextPage, this), ".step-c1": e.proxy(this.releaseNextPage, this), ".get_suggest_price": e.proxy(this.getSuggestPrice, this), "#generate-icon": e.proxy(this.generateIcon, this), ".whether-debug-agree": e.proxy(this.whetherDebug, this)}, keyup: {".tol-invite-w1 input": e.proxy(this.searchUser, this), ".release-charge-c1 input": e.proxy(this.suggestPrice, this)}, change: {".file": e.proxy(this.uploadImg, this), ".code-source": e.proxy(this.codeSource, this), ".hot-input": e.proxy(this.hotInput, this), ".vest": e.proxy(this.selectDeveloper, this)}}), window.addEventListener("click", function () {
            e(".invite-list").hide()
        }, !1), window.onbeforeunload = function (e) {
        }
    }, whetherDebug: function (t) {
        var r = e(t.currentTarget);
        r.toggleClass("release-btn1-cur")
    }, generateIcon: function () {
        r.generateIconDialog(function (t) {
            var r = e(".img-crop");
            r.empty(), r[1].innerHTML = "<img src='" + t + "'/>"
        })
    }, getSuggestPrice: function (t) {
        var r = e.trim(e(t.target).text().slice(e(t.target).text().indexOf("=") + 1));
        e(t.target).closest(".release-charge-h1").siblings(".release-charge-c1").find("input").val(r)
    }, selectDeveloper: function (e) {
        var t = e.target.value;
        sessionStorage.setItem("DEVELOPER", t)
    }, suggestPrice: function (t) {
        t.target.value = t.target.value.replace(/[^\d.]/g, ""), t.target.value = t.target.value.replace(/^\./g, ""), t.target.value = t.target.value.replace(/\.{2,}/g, ""), t.target.value = t.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        var r = t.target.value || 0, i = t.target.id;
        if ("week_val" == i) {
            e(".release-charge-h1").show();
            var n = new Number(r), s = (4 * n * .95).toFixed(2), a = (4 * n * 12 * .85).toFixed(2), o = (4 * n * 12 * 3 * .75).toFixed(2);
            e("#sug_week_price").text(n), e("#sug_month_price").text("周*4*0.95 = " + s), e("#sug_year_price").text("周*4*12*0.85 = " + a), e("#sug_forver_price").text("周*4*12*3*0.75 = " + o)
        }
    }, releaseNextPage: function (t) {
        var i, n = t.currentTarget, s = e(".release-pre-page"), o = e(".release-next-page");
        if (-1 != n.className.indexOf("step-c1")) {
            e(".step-c1").removeClass("step-current"), e("#step-c" + n.innerText).addClass("step-current");
            var l = "#section-" + n.innerText;
            i = e(l);
            var u = e(".tool-info:visible");
            if (i.html() == u.html())return;
            u.slideToggle(300), i.slideToggle(300), "#section-1" == l ? (o.removeClass("release-disable"), s.addClass("release-disable"), o.text("下一步"), o.removeClass("release-submit")) : "#section-5" == l ? (s.removeClass("release-disable"), o.text("确认"), o.addClass("release-submit")) : (o.text("下一步"), o.removeClass("release-submit"), s.removeClass("release-disable"), o.removeClass("release-disable"))
        } else {
            i = e(n).closest(".release-np-page").siblings(".tool-info:visible");
            var c = i[0].id;
            if (-1 != n.className.indexOf("release-next-page")) {
                if ("section-5" == c)return;
                if (0 == i.index()) {
                    var g = e(".tol-inp").val(), d = e(".tol-pro-name").val(), p = e(".img-crop img").attr("src"), f = [];
                    if (e.each(e(".label-icon-cur"), function (t, r) {
                        f.push(e(r).data("fid"))
                    }), 1 != e(".code-source").val() && "" == g)return void r.msg.warning("请输入原作者姓名");
                    if ("" == d)return void r.msg.warning("请输入工具名称");
                    if ("" == !!p)return void r.msg.warning("请选择工具图标");
                    if (f.length <= 0)return void r.msg.warning("请选择常用功能");
                    e(".step-c1").removeClass("step-current"), e("#step-c2").addClass("step-current")
                } else if (1 == i.index()) {
                    var m = e("#tol-code").val();
                    if ("" == m)return void r.msg.warning("请上传源代码");
                    if (-1 != m.indexOf("getSourceFileName"))return void r.msg.warning("你的代码“getSourceFileName”写法不符合规范，请重新编辑修改后再发布");
                    if (-1 != m.indexOf("getThisScriptFilename"))return void r.msg.warning("你的代码“getThisScriptFilename”写法不符合规范，请重新编辑修改后再发布");
                    if (-1 != m.indexOf("getSourceFileOffSet"))return void r.msg.warning("你的代码“getSourceFileOffSet”写法不符合规范，请重新编辑修改后再发布");
                    if (-1 != m.indexOf("getSourceFileLine"))return void r.msg.warning("你的代码“getSourceFileLine”写法不符合规范，请重新编辑修改后再发布");
                    e(".step-c1").removeClass("step-current"), e("#step-c3").addClass("step-current")
                } else if (2 == i.index()) {
                    var h = e("#release-free"), v = e("#release-charge");
                    if (h.length > 0 && -1 != h[0].className.indexOf("tol-cur") ? this.char_model = 0 : v.length > 0 && -1 != v[0].className.indexOf("tol-cur") && (this.char_model = 1), 0 != this.char_model && 1 != this.char_model)return void r.msg.warning("请设置收费模式");
                    if (1 == this.char_model) {
                        var x = e(".charge-amount").find("input"), b = x[0].value, y = x[1].value, _ = x[2].value, w = x[3].value;
                        if (0 >= _ || 0 >= b || 0 >= y || 0 >= w)return void r.msg.warning("周、月、年、永久使用必须都设置大于零")
                    }
                    e(".step-c1").removeClass("step-current"), e("#step-c4").addClass("step-current")
                } else if (3 == i.index()) {
                    var j = e(".tol-introduction").val(), C = a.getContent();
                    if ("" == j)return void r.msg.warning("请输入工具简介");
                    if ("" == C)return void r.msg.warning("请输入功能说明");
                    e(".step-c1").removeClass("step-current"), e("#step-c5").addClass("step-current")
                } else 4 == i.index();
                i.fadeToggle(500), i.next().fadeToggle(500), "section-4" == c && (o.text("确定"), o.addClass("release-submit")), s.removeClass("release-disable");
                var T = Number(c.match(/\d/)[0]);
                e("#step-c" + T).addClass("step-complete"), e("#line-" + T).addClass("step-bg-complete")
            } else {
                if ("section-1" == c)return;
                "section-2" == c && s.addClass("release-disable");
                var O = Number(e(".step-current")[0].id.match(/\d/)) - 1;
                e(".step-current").removeClass("step-current"), e("#step-c" + O).addClass("step-current"), o.removeClass("release-disable"), o.text("下一步"), o.removeClass("release-submit"), i.fadeToggle(600), i.prev().fadeToggle(600)
            }
        }
    }, closeLabel: function (t) {
        e(t.currentTarget).closest(".label-icon").remove()
    }, addUser: function (t) {
        t.stopPropagation();
        var r = t.currentTarget.innerText;
        e(t.currentTarget).closest(".invite-list").siblings(".tol-invite-w2").find("input").val(r);
        var i = e(t.currentTarget).closest(".tol-invite-s1")[0].id;
        if ("invite-user" == i) {
            $list = e("#tol-inv-list");
            var n = [];
            if (e.each(e("#tol-inv-list span .label-username"), function (e, t) {
                n.push(t.innerText)
            }), -1 != n.join(",").indexOf(r))return
        } else if ("limit-user" == i) {
            $list = e("#limit-user-list");
            var s = [];
            if (e.each(e("#limit-user-list span .label-username"), function (e, t) {
                s.push(t.innerText)
            }), -1 != s.join(",").indexOf(r))return
        } else {
            $list = e("#white-list");
            var a = [];
            if (e.each(e("#white-list span .label-username"), function (e, t) {
                a.push(t.innerText)
            }), -1 != a.join(",").indexOf(r))return
        }
        var o = '<span class="label-style label-style-user"><i class="tol-invite-img">&nbsp;</i><i class="label-username" style="padding: 0 6px 0 0;font-size: 14px;">' + r + '</i><i class="tol-invite-close">x</i></span>';
        $list.append(o), e(".invite-list").html("")
    }, searchUser: function (t) {
        t.stopPropagation();
        var i = e(t.currentTarget), n = i.closest(".tol-invite-w2").siblings(".invite-list");
        if ("" == i.val())return void n.html("");
        var s = i.val();
        this.model.searchUser({username: s}, function (t) {
            if (t.status) {
                var i = "<ul>";
                e.each(t.data, function (e, t) {
                    i += "<li>" + t.username + "</li>"
                }), n.show().html(i + "</ul>")
            } else n.show().html(""), r.msg.warning(t.info)
        })
    }, tolInviteClose: function (t) {
        e(t.currentTarget).closest(".label-style-user").remove()
    }, funLabel: function (t) {
        e(t.target).toggleClass("label-icon-cur")
    }, hotInput: function () {
        var t = e(".hot-input"), r = e.trim(t.val());
        if (r) {
            var i = '<span class="label-icon">' + r + '<i class="closeLabel" style="cursor: pointer">X</i></span> ';
            e(".hot-label").append(i)
        }
        t.val("")
    }, operaLabel: function (t) {
        "i" == t.target.tagName.toLowerCase() && e(t.currentTarget).remove()
    }, getLabel: function () {
        var t = e(".tol-pro-name").val(), i = UE.getEditor("editor").getContent();
        return t ? i ? void this.model.autoTag({name: t, detail: i}, function (t) {
            if (t.status) {
                for (var i = t.tag, n = "", s = 0, a = i.length; a > s; s++)n += '<span class="label-icon">' + i[s] + "<i>X</i></span>";
                e(".hot-label").append(n)
            } else r.msg.warning(t.info)
        }) : void r.msg.warning("请输入功能说明") : void r.msg.warning("请输入工具名称")
    }, tolSubAgree: function (t) {
        e(t.currentTarget).toggleClass("tol-sub-cur")
    }, codeSource: function (t) {
        this._val = t.currentTarget.value, 1 == this._val ? e(".tol-inp")[0].disabled = "disabled" : e(".tol-inp")[0].disabled = !1
    }, uploadImg: function (t) {
        r.uploadPicDialog({title: "上传工具图标", showAreaSelect: !0, file: t.currentTarget, type: 1, submitCallBack: function (t) {
            var r = e(".img-crop");
            r.empty(), r[0].innerHTML = "<img src='" + t + "'/>"
        }})
    }, chargeMode: function (t) {
        e(t.target).addClass("tol-cur"), "tol-mode-free" == e(t.target).parent()[0].className ? (e(".charge-amount").hide(), e(".tol-mode-pay").find("span").removeClass("tol-cur"), e("#free-term").hide(), e(".free-term").val(0)) : (e(".charge-amount").show(), e("#free-term").show(), e(".tol-mode-free").find("span").removeClass("tol-cur"))
    }, inviteUser: "", limitUser: "", whiteUser: "", getData: function () {
        var t = e(".vest").find("option:selected").val(), r = e(".code-source").find("option:selected").val(), i = e(".tol-inp").val(), n = e(".tol-pro-name").val(), s = e(".img-crop img").attr("src"), a = e(".pro-style").find("option:selected").val(), o = [];
        e.each(e(".label-icon-cur"), function (t, r) {
            o.push(e(r).data("fid"))
        });
        var l = e("#tol-code").val(), u = e(".tol-introduction").val(), c = UE.getEditor("editor").getContent(), g = e(".hot-label .label-icon").text().replace(/X/g, ","), d = g.slice(0, g.lastIndexOf(",")), p = e(".free-term").find("option:selected").val(), f = [];
        e.each(e("#tol-inv-list span .label-username"), function (e, t) {
            f.push(t.innerText)
        });
        var m = [];
        e.each(e("#limit-user-list span .label-username"), function (e, t) {
            m.push(t.innerText)
        });
        var h = [];
        e.each(e("#white-list span .label-username"), function (e, t) {
            h.push(t.innerText)
        });
        var v = e(".tol-code-author").find("option:selected").val(), x = {is_original: r, author: i, name: n, ico: s, cid: a, summary: u, detail: c, tag: d, free_time: p, invite: f.join(","), limit: m.join(","), code_protect: v, code: l, white: h.join(","), fun_tag: o, vest: t, whether_debug: -1 != e(".whether-debug-agree")[0].className.indexOf("release-btn1-cur") ? 1 : 0}, b = e(".tol-pro-name").data("id");
        b && e.extend(x, {id: b});
        var y = e("#release-free"), _ = e("#release-charge");
        if (y.length > 0 && -1 != y[0].className.indexOf("tol-cur"))this.char_model = 0; else if (_.length > 0 && -1 != _[0].className.indexOf("tol-cur")) {
            this.char_model = 1;
            var w = e(".charge-amount").find("input"), j = w[0].value, C = w[1].value, T = w[2].value, O = w[3].value;
            e.extend(x, {price_week: j, price_month: C, price_year: T, price_forever: O, price_type: this.char_model})
        }
        return x
    }, validate: function (t) {
        if (-1 == e("#step-c1")[0].className.indexOf("step-complete"))return r.msg.warning("请先完善基本信息"), !1;
        if (-1 == e("#step-c2")[0].className.indexOf("step-complete"))return r.msg.warning("请上传源代码"), !1;
        var i = e("#tol-code").val();
        if (-1 != i.indexOf("getSourceFileName"))return void r.msg.warning("你的代码“getSourceFileName”写法不符合规范，请重新编辑修改后再发布");
        if (-1 != i.indexOf("getThisScriptFilename"))return void r.msg.warning("你的代码“getThisScriptFilename”写法不符合规范，请重新编辑修改后再发布");
        if (-1 != i.indexOf("getSourceFileOffSet"))return void r.msg.warning("你的代码“getSourceFileOffSet”写法不符合规范，请重新编辑修改后再发布");
        if (-1 != i.indexOf("getSourceFileLine"))return void r.msg.warning("你的代码“getSourceFileLine”写法不符合规范，请重新编辑修改后再发布");
        if (-1 == e("#step-c3")[0].className.indexOf("step-complete"))return r.msg.warning("请设置收费模式"), !1;
        if (-1 == e("#step-c4")[0].className.indexOf("step-complete"))return r.msg.warning("请完善其它信息"), !1;
        if (1 != e(".code-source").val() && "" == t.author)return r.msg.warning("请输入原作者姓名"), !1;
        if ("" == t.name)return r.msg.warning("请输入工具名称"), !1;
        if (e(".img-crop").find("img").length <= 0)return void r.msg.warning("请选择工具图标");
        if (t.fun_tag.length <= 0)return r.msg.warning("请选择常用功能"), !1;
        if ("" == t.code)return r.msg.warning("请插入代码"), !1;
        if (1 == this.char_model) {
            if (!t.price_type)return r.msg.warning("请选择收费方式"), !1;
            if (!(t.price_year > 0 && t.price_week > 0 && t.price_month > 0))return r.msg.warning("收费金额必须大于0元"), !1
        }
        if ("" == t.summary)return r.msg.warning("请输入工具简介"), !1;
        if ("" == t.detail)return r.msg.warning("请输入功能说明"), !1;
        var n = e(".tol-code-author");
        return 4 == n.val() && t.white.length <= 0 ? (r.msg.warning("白名单用户不能为空"), !1) : 3 == n.val() && t.invite.length <= 0 ? (r.msg.warning("邀请用户不能为空"), !1) : e(".tol-sub-cur").length <= 0 ? (r.msg.warning("请勾选同意按钮"), !1) : !0
    }, release: function () {
        var e = this.getData(), t = this.validate(e);
        t && (window.onbeforeunload = null, o || (o = !0, this.model.release(e, function (e) {
            200 == e.status ? (r.msg.success(e.info), setTimeout(function () {
                o = !1, location.href = "/Developer/index"
            }, 1e3)) : 201 == e.status ? (o = !1, r.dialog({title: "代码正在审核", hideCancel: !0, hideOk: !0, content: '<span style="line-height: 24px;">' + e.info + '<br>您可前往<a href="/Developer/index" target="_blank" style="color: #0078d7;text-decoration: underline">开发者后台</a>查看工具审核状态</span>', callBackNo: function () {
                location.href = "/tools"
            }, callBackOk: function () {
                location.href = "/tools"
            }})) : 1 == e.status ? (o = !1, r.msg.success(e.info)) : (o = !1, r.msg.warning(e.info))
        })))
    }});
    return l
});