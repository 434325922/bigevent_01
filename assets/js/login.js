$(function () {

    // 1.表单切换
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide()
    })

    // 2.定义密码规则
    layui.form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            "密码必须6-16位，且不能出现空格"
        ],
        repwd: function (value) {
            var pwd = $('.reg-box input[name=password]').val()
            if (value !== pwd) {
                return "两次密码不一致";
            }
        }
    })

    // 3.注册
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            layui.layer.msg(res.message)
            $('#link_login').click();
            $('#form_reg')[0].reset()
        })
    }) 

    // 4.登录
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message);
                localStorage.setItem('token', res.token);
                location.href = "/index.html"
            }
        })
    })



})