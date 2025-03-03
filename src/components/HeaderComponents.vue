<template>
 <div class="header">
        <div>
            <img src="https://storage.googleapis.com/a1aa/image/r8gmDCJ2c2Je0HAJ5R56F6Q8fGVKWObrcXlGZDVYLHY.jpg" alt="TicketGo logo with text 'Đi chơi đâu, lên Ticketgo'">
        </div>
        <div class="search-bar">
            <input type="text" placeholder="Tìm kiếm...">
            <button><i class="fas fa-search"></i></button>
        </div>
        <div class="nav-links">
            <a href="#">Đăng nhập</a>
            <a href="#">Đăng ký</a>
            <div class="flag">
                <img src="https://storage.googleapis.com/a1aa/image/kWFDWwQUYoogfvc5JhseTQq_67Rzm-wfzz0xOrKJ4Ts.jpg" alt="Vietnam flag">
                <i class="fas fa-caret-down"></i>
            </div>
        </div>
    </div>
    <div class="navbar">
        <div class="container">
            <div>
                <a href="#">Vé ca nhạc</a>
                <a href="#">Văn hóa nghệ thuật</a>
                <a href="#">Du lịch</a>
                <a href="#">Workshop</a>
                <a href="#">Vé xem phim</a>
                <a href="#">Vé tham quan</a>
                <a href="#">Thể thao</a>
                <a href="#">Tin tức</a>
            </div>
            <div>
                <select>
                    <option>Chọn địa điểm</option>
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
            categoryData: [],
            searchKeyword: '',
            username: ''
        }
    },
}
</script>

<style scoped >
@import '@/assets/header.css';
</style>