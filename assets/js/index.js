$(function () {
    // 获取用户信息
    getUserInfo();
})

function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.token||''
        // },
        success: function (res) {
            console.log(res);
            // 判断状态码
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            } renderAvatar(res.data)
        }
    })
}

function renderAvatar(user) {
    // 1.用户名
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp' + name);
    console.log(name);
    // 2.用户头像
    if (user.user_pic !== null) {
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show();
        $('.text-avatar').hide();
    } else {
        $('layui-nav-img').hide();
        var text = name[0].toUpperCase();
        $('.text-avatar')
            .html(text)
            .show()
    }
}

var layer = layui.layer;
$('#logout').on('click', function () {
    layer.confirm('是否确认退出', { icon: 3, title: '提示' }, function (index) {
        localStorage.removeItem('token');
        location.href = '/login.html';
        layer.close(index);
    });
})