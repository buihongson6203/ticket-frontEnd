<template>
    <div class="login-container">
        <div class="login-box">
            <h2 class="login-title">Login Admin</h2>
            <form class="login-form" @submit.prevent="login">
                <div class="input-group">
                    <input type="text" id="loginEmail" v-model="loginForm.email" placeholder="Email" required>
                </div>
                <div class="input-group">
                    <input type="password" id="loginPassword" v-model="loginForm.password" placeholder="Password"
                        required>
                </div>
                <button type="submit" class="login-btn">Login</button>
                <div v-if="error" class="error-message">{{ error }}</div>
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'LoginAdmin',
    props: {
        msg: String
    },
    data() {
        return {
            loginForm: {
                email: '',
                password: '',
            },
            error: ''
        };
    },
    methods: {
        async login() {
            if (!this.loginForm.email || !this.loginForm.password) {
                this.error = 'Username and password are required!';
                return;
            }

            try {
                var url = `${process.env.VUE_APP_BASE_API_URL}/auth/login`;
                const response = await axios.post(url, {
                    email: this.loginForm.email,
                    password: this.loginForm.password,
                    name: this.loginForm.name
                });
                console.log(response);
                
                if (response.status === 201 ) {
                    const data = response.data;
                    const roles = data.role;
                    console.log(roles);
                    if (roles.includes('ADMIN')) {
                        localStorage.setItem('adminToken', data.token);
                        console.log('Đăng nhập thành công:', data);
                        this.$router.push('/admin').then(() => {
                            window.location.reload();
                        });
                    } else {
                        console.log('Đăng nhập thành công nhưng không phải admin:', data);
                        this.error = 'Bạn không có quyền truy cập vào trang admin.';
                    }
                } else {
                    this.error = response.data.message || 'Sai thông tin đăng nhập hoặc mật khẩu!';
                }
            } catch (error) {
                console.error('Đã xảy ra lỗi khi đăng nhập:', error);
                this.error = error.response?.data.message || 'Sai thông tin đăng nhập hoặc mật khẩu!';
            }
        }
    },

    created() {
        console.log('Component created');
    }
}

</script>
<style scoped>
@import '@/assets/loginadmin.css';
</style>