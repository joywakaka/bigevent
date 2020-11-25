$(function() {

})

// 获取用户数据 并渲染到页面的对应位置

function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'get',
        header: {
            Authorization: localStorage.getItem('token')
        },
        success(res) {
            // console.log(res);
            if (res.tatus !== 0) {
                return layui.layer.msg('获取用户信息失败!')
            }
            //调用修改用户信息的函数
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(user) {
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    //按需渲染用户头像'
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        //选择用户名的第一个字母 并大写填充在图片的位置
        var first = name[0].toUpperCase();
        $('.text-avatar').text(first).show();
    }
}

function logout() {
    lay.layer.confirm('确定退出吗?', { icon: 3, title: '提示' }, function(index) {
        //删除localStorge 的token值
        localStorage.removeItem('token');
        //跳转到login.html
        location.href = '/login.html';
        layer.close(index);
    })
}