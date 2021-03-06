$(function () {
    // 1.表单验证
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度应为1~6位之间！';
            }
        }
    })

    // 2.用户渲染
    initUserInfo();
    var layer = layui.layer;
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 3.重置用户
    $('#btn_reset').on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    })

    // 修改用户
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success:function(res){
                if(res.status !==0){
                    return layer.msg('用户信息修改失败！')
                }
                layer.msg('修改成功！')
                window.parent.getUserInfo();
            }
        })

    })













})