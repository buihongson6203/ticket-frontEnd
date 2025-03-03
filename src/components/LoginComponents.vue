<template>
    <div class="body-login">
        <div id="wrapper">
            <form @submit.prevent="login" id="form-login" style="margin: 0 auto;">
                <h1 class="form-heading">Đăng Nhập</h1>
                <div class="form-group">
                    <i style="margin-top: 8px;" class="fa fa-user"></i>
                    <input type="text" class="form-input" placeholder="Tên đăng nhập" v-model="loginForm.username"
                        required>
                </div>
                <div class="form-group">
                    <i style="margin-top: 8px;" class="fa fa-key"></i>
                    <input type="password" class="form-input" placeholder="Mật khẩu" v-model="loginForm.password"
                        required>
                    <!-- <div id="eye">
                        <i class="fa fa-eye"></i>
                    </div> -->
                </div>
                <div class="from-h">
                    <h5><router-link to="/forgotpassword">Quên mật khẩu?</router-link></h5>
                </div>
                <button type="submit" value="" class="form-submit">Đăng nhập</button>
                <div v-if="error" class="alert alert-danger mt-3" role="alert" style="margin-top: 20px;">
                    {{ error }}
                </div>
                <h5 style="margin-top: 30px;"><router-link to="/register">Bạn chưa có tài khoản? Đăng ký</router-link>
                </h5>

            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "LoginPage",
    props: {
        msg: String
    },
    components: {

    },
    data() {
        return {
            loginForm: {
                username: '',
                password: ''
            },
            error: ''
        }
    },
    methods: {
        async login() {
            if (!this.loginForm.username || !this.loginForm.password) {
                this.error = 'Username and password are required!';
                return;
            }

            try {
                var url = `${process.env.VUE_APP_BASE_API_URL}Auth/AuthController_login`;
                const response = await axios.post(url, {
                    username: this.loginForm.username,
                    password: this.loginForm.password
                });

                console.log(this.loginForm.username);

                if (response.status === 200) {
                    const data = response.data;
                    // localStorage.setItem('token', data.token);
                    localStorage.setItem('customerToken', data.token);
                    // Lưu username vào localStorage
                    localStorage.setItem('username', this.loginForm.username);
                    console.log(data.username);

                    console.log(data.token);

                    console.log('Đăng nhập thành công:', data);
                    this.$router.push('/').then(() => {
                        window.location.reload();
                    });
                } else {
                    this.error = response.data.message || 'Sai tên đăng nhập hoặc mật khẩu!';
                }
            } catch (error) {
                console.error('Đã xảy ra lỗi khi đăng nhập:', error);
                this.error = error.response?.data.message || 'Sai tên đăng nhập hoặc mật khẩu!';
            }
        }
    },
    mounted() {
        import('../assets/app');
    }
}
</script>

<style scoped>
/* @import '@/assets/app.css';
@import '@/assets/reset.css'; */
@import '../assets/login-user.css';
/*# sourceMappingURL=bootstrap-reboot.css.map */
</style>