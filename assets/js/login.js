// 给去登陆和去注册添加点击事件 实现互相跳转
$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })
})

// 注册页面表单验证

layui.form.verify({
    // username: function(value, item) { //value：表单的值、item：表单的DOM对象
    //     if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
    //         return '用户名不能有特殊字符';
    //     }
    //     if (/(^\_)|(\__)|(\_+$)/.test(value)) {
    //         return '用户名首尾不能出现下划线\'_\'';
    //     }
    //     if (/^\d+\d+\d$/.test(value)) {
    //         return '用户名不能全为数字';
    //     }
    // },

    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pwd: [
        /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ],

    repwd: function(pwd2) {
        var pwd1 = $('.reg-box [name=password]').val();
        if (pwd2 !== pwd1) {
            return '两次输入的密码不一致'
        }
    }
});

//给表单添加提交事件 并调用一个函数
$('#regForm').on('submit', submitData);

function submitData(e) {
    e.preventDefault();
    let datastr = $(this).serialize();
    // console.log(datastr);
    // console.log(this);
    $.ajax({
        url: '/api/reguser',
        method: 'post',
        data: datastr,
        success(res) {
            console.log(res);
            if (res.status != 0) return layui.layer.msg(res.message);
            layui.layer.msg(res.message);
            // 注册成功后直接把表单数据加到登录页面
            let uname = $('.reg-box [name=username]').val().trim();
            $('.login-box [name=username]').val(uname);
            let upwd = $('.reg-box [name=password]').val().trim();
            $('.login-box [name=password]').val(upwd);
            //清空注册页面的表单内容
            $('#regForm')[0].reset();
            //切换到登录页面 相当于模拟点击去登录连接的事件
            $('#link_login').click();

        }
    })
}

//登录页页面操作 
$('#form_login').on('submit', function(e) {
    e.preventDefault();
    let dataStr = $(this).serialize();
    $.ajax({
        url: '/api/login',
        method: 'post',
        data: dataStr,
        success(res) {
            // console.log(res);
            if (res.status != 0) return layui.layer.msg(res.message);
            //用了layui的方法 弹出层延时 和类型
            // layui.layer.layer.msg('同上', {
            //     icon: 1,
            //     time: 2000 //2秒关闭（如果不配置，默认是3秒）
            // }, function() {
            //     //do something
            // });
            layui.layer.msg(res.message, {
                icon: 6,
                time: 1500,
            }, function() {
                //将登录成功的token值保存到本地
                localStorage.setItem('token', res.token);
                // 跳转的主页
                location.href = '/index.html'
            });

        }
    })

})