<template>
    <div class="header">
        <div>
            <a href="http://localhost:8080">
                <img src="@/assets/img/banner.png" alt="Mô tả ảnh">
            </a>
        </div>

        <div class="search-bar">
            <input type="text" placeholder="Tìm kiếm...">
            <button><i class="fas fa-search"></i></button>
        </div>
        <div class="nav-links">
            <a href="#">Đăng nhập</a>
            <a href="#">Đăng ký</a>
            <div class="flag" @click="toggleDropdown">
                <img src="https://storage.googleapis.com/a1aa/image/kWFDWwQUYoogfvc5JhseTQq_67Rzm-wfzz0xOrKJ4Ts.jpg"
                    alt="Vietnam flag">
                <i class="fas fa-caret-down"></i>
                <ul v-if="dropdownOpen" class="language-dropdown">
                    <li @click="changeLanguage('vi')">
                        <img src="https://storage.googleapis.com/a1aa/image/kWFDWwQUYoogfvc5JhseTQq_67Rzm-wfzz0xOrKJ4Ts.jpg"
                            alt="Vietnam flag"> Tiếng Việt
                    </li>
                    <li @click="changeLanguage('en')">
                        <img src="https://storage.googleapis.com/a1aa/image/english-flag.png" alt="English flag">
                        English
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="navbar">
        <div class="header-container">
            <div class="link-header">
                <a href="http://localhost:8080/canhac">Vé ca nhạc</a>
                <a href="http://localhost:8080/vanhoa">Văn hóa nghệ thuật</a>
                <a href="http://localhost:8080/dulich">Du lịch</a>
                <a href="http://localhost:8080/vethamquan">Vé tham quan</a>
                <a href="http://localhost:8080/tintuc">Tin tức</a>
            </div>
            <div>
                <select>
                    <option>Chọn địa điểm</option>
                    <option>Hà Nội</option>
                    <option>Huế</option>
                    <option>Đà Nẵng</option>
                    <option>TP.Hồ Chí Minh</option>
                    <option>Các thành phố khác</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "HeaderHomePage",
    data() {
        return {
            dropdownOpen: false,
            selectedLanguage: 'vi',
        };
    },
    methods: {
        toggleDropdown() {
            this.dropdownOpen = !this.dropdownOpen;
        },
        changeLanguage(lang) {
            this.selectedLanguage = lang;
            console.log("Ngôn ngữ đã chọn:", lang);
            this.dropdownOpen = false;
        }
    }
}
</script>


<style scoped>
@import '@/assets/header.css';
</style>
