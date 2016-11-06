requirejs.config({
	baseUrl:'/assets/js/modules',
	waitSeconds: 35,
	urlArgs: 'v=20151112.js',//改动不合并到入口文件的js文件时才需要修改
    enforceDefine: false,
	paths: {
        'util'                  :       './global/util',
        'common'                  :       './global/common',
        'text'                   : '../plugs/text',

		'jquery'                  :       '../libs/jquery.min',
		'class'                   :       '../libs/class',
		'underscore'              :       '../libs/underscore',
        //限制图片大小
        'bootstrap.min'            :       '../plugs/cropper/bootstrap.min',
        'cropper.min'            :         '../plugs/cropper/cropper.min',
        'extension_image_cropper'            : '../plugs/cropper/extension_image_cropper',
        // 分页
        'page_bar'              :       '../plugs/pageBar',

        // 文件上传
        'ajaxfileupload'            :       '../plugs/ajaxupload/ajaxfileupload/ajaxfileupload',
        'fileinput'            :       '../plugs/ajaxupload/fileinput/js/fileinput',
        'fileinput_locale_zh'            :       '../plugs/ajaxupload/fileinput/js/fileinput_locale_zh',

        'ajaxupload'            :       '../libs/ajaxupload',

        'echarts'            :       '../plugs/echarts.common.min',

        // 图片区域选择
        'jquery.imgareaselect.min':'../plugs/imgareaselect/jquery.imgareaselect',
        // loading
        'spin.min':'../plugs/spin.min',
        //复制
        'jquery.zclip':'../plugs/jquery.zclip/jquery.zclip.min',
        // 福文本编辑框
        'ueditor.all.min'         :       '../plugs/ueditor/ueditor.all.min',
        'ZeroClipboard.min'       :       '../plugs/ueditor/third-party/zeroclipboard/ZeroClipboard.min',
        'shCore'                  :       '../plugs/ueditor/third-party/SyntaxHighlighter/shCore',
        'shBrushJScript'                  :       '../plugs/ueditor/third-party/SyntaxHighlighter/shBrushJScript',
        'zh-cn'                   :       '../plugs/ueditor/lang/zh-cn/zh-cn'
	},
	shim: {
        'jquery.zclip':{
            deps:['jquery']
        },
		'underscore'              : { exports: '_'},
		'jquery'                  : { exports: '$'},
        'shBrushJScript':{
            deps:['shCore']
        },
        'ueditor.all.min'         :{
            deps:['../plugs/ueditor/ueditor.config']
        },
        'zh-cn'                   :{
            deps:['ueditor.all.min']
        },
        'fileinput_locale_zh':{
            deps:['jquery']
        },
        'jquery.imgareaselect.min':{
            deps:['jquery']
        },
        'extension_image_cropper':{
            deps:['jquery']
        },
        'bootstrap.min':{
            deps:['jquery']
        }
    }
});