<template>
  <div>
    <!-- Component Header -->
    <HeaderComponents />

    <!-- Swiper Container -->
    <div class="swiper-container">
      <swiper :options="swiperOptions">
        <swiper-slide v-for="(item, index) in items" :key="index">
          <img :src="item.src" :alt="item.alt" />
          <p class="caption">{{ item.caption }}</p>
        </swiper-slide>
      </swiper>
      <!-- Indicators -->
      <div class="indicators">
        <span class="indicator" :class="{ active: realIndex === index }" v-for="(item, index) in items" :key="index"
          @click="jumpToSlide(index)"></span>
      </div>
    </div>

    <!-- Phần Nội Dung Chính -->
    <div class="bg-white text-gray-800">
      <div class="tin-tuc-container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Phần Hội Chợ & Triển Lãm -->
          <div class="card">
            <h2 class="text-xl font-bold text-orange-600 mb-4">HỘI CHỢ &amp; TRIỂN LÃM</h2>
            <img
              alt="Colorful illustration of people dancing and celebrating with text 'Liên kết đào tạo Việt Nam - Hoa Kỳ'"
              class="w-full mb-4 rounded-lg shadow-lg" height="300"
              src="https://storage.googleapis.com/a1aa/image/XnB6xyHCXu26Hy5sQKZeCPx24NIc5wXlOn0rEgTTUrs.jpg"
              width="600" />
            <a href="#" class="feature-text clickable-text">Triển lãm các Chương trình Liên kết Đào tạo Việt Nam - Hoa Kỳ 2025.</a>
            <div class="mb-4">
              <div class="flex items-start mb-2">
                <img alt="Exhibition poster with text 'Triển lãm Mê man'" class="w-24 h-16 mr-4 rounded-lg object-cover"
                  height="60" src="https://storage.googleapis.com/a1aa/image/P8BzlfhIwTb4J0t_BfuU9wBFEHB8Xg9mVYgTPzuv09Q.jpg"
                  width="100" />
                <a href="#" class="clickable-text">Triển lãm Mê man</a>
              </div>
              <div class="flex items-start mb-2">
                <img alt="Exhibition poster with text 'The world as a draft'" class="w-24 h-16 mr-4 rounded-lg object-cover"
                  height="60" src="https://storage.googleapis.com/a1aa/image/d6dfhZLl5f17BYCOwWUKnKmRs5IcaAP3hlcvhyf3P08.jpg"
                  width="100" />
                <a href="#" class="clickable-text">Triển lãm THẾ GIỚI NHƯ LÀ BẢN NHÁP - Đỗ Thanh Lãng &amp; Nguyễn Đức Đạt</a>
              </div>
              <div class="flex items-start mb-2">
                <img alt="Exhibition poster with text 'Retro Rewind'" class="w-24 h-16 mr-4 rounded-lg object-cover"
                  height="60" src="https://storage.googleapis.com/a1aa/image/UZ1IteGN_Vb0N2T8LEYVkro2cAWQEZLC8bNOcMSA8W8.jpg"
                  width="100" />
                <a href="#" class="clickable-text">Hội chợ rong chơi vol 13: Retro Rewind</a>
              </div>
              <div class="flex items-start mb-2">
                <img alt="Exhibition poster with text 'Xuân an lành - Chơi vui khỏe'" class="w-24 h-16 mr-4 rounded-lg object-cover"
                  height="60" src="https://i.ex-cdn.com/vntravellive.com/files/news/2019/05/02/the-gioi-den-long-ruc-ro-o-hoi-an-161742.jpg"
                  width="100" />
                <a href="#" class="clickable-text">Hội chợ 2025: Xuân an lành - Chơi vui khỏe</a>
              </div>
            </div>
            <a class="text-blue-600 hover:underline" href="#">Xem thêm</a>
          </div>

          <!-- Phần Âm Nhạc - Music Shows -->
          <div class="card">
            <h2 class="text-xl font-bold text-orange-600 mb-4">ÂM NHẠC - MUSIC SHOWS</h2>
            <img alt="Poster of a music show with a woman in a red dress and text 'HLALAH Xóm Nhạc'"
              class="w-full mb-4 rounded-lg shadow-lg" height="300"
              src="https://storage.googleapis.com/a1aa/image/H5yubsxsakUQfs5o7OeyT92QkbhSOP90BFHw__NnjnA.jpg"
              width="600" />
            <a href="#" class="feature-text clickable-text">Đêm nhạc Halah - Xóm Nhạc - Ngày 20.03.2025</a>
            <div class="mb-4">
              <div class="flex items-start mb-2">
                <img alt="Concert poster with text 'Rock Trống Taiko'" class="w-24 h-16 mr-4 rounded-lg object-cover"
                  height="60" src="https://file3.qdnd.vn/data/images/0/2022/10/24/vuhuyen/nhac-vien.jpg?dpi=150&quality=100&w=870"
                  width="100" />
                <a href="#" class="clickable-text">Hòa nhạc Rock Trống Taiko đến từ Nhật Bản cùng BATI-HOLIC tại Hà Nội và Hồ Chí Minh 2025</a>
              </div>
              <div class="flex items-start mb-2">
                <img alt="Concert poster with text 'MÙA XUÂN ĐẦU TIÊN'" class="w-24 h-16 mr-4 rounded-lg object-cover"
                  height="60" src="https://storage.googleapis.com/a1aa/image/94Urb7UifENDYEK1zDDcfy7Ca7uMnjCcb4vuveA8x-0.jpg"
                  width="100" />
                <a href="#" class="clickable-text">Salon Âm nhạc thính phòng tháng 3.2025 Chủ đề: MÙA XUÂN ĐẦU TIÊN</a>
              </div>
              <div class="flex items-start mb-2">
                <img alt="Concert poster with text 'Linkin Park Cover Show'" class="w-24 h-16 mr-4 rounded-lg object-cover"
                  height="60" src="https://storage.googleapis.com/a1aa/image/PdhAmQ3NFJAQ0sd7_ysX6-uNhNUl6UZdbVfxhCiqI2g.jpg"
                  width="100" />
                <a href="#" class="clickable-text">Đêm nhạc Linkin Park Cover Show - A place for our heads</a>
              </div>
              <div class="flex items-start mb-2">
                <img alt="Concert poster with text 'Women of Rock'" class="w-24 h-16 mr-4 rounded-lg object-cover"
                  height="60" src="https://wallpapercave.com/wp/wp9264044.jpg" width="100" />
                <a href="#" class="clickable-text">Women of Rock - Đêm nhạc tôn vinh những nữ rocker huyền thoại | Avril Lavigne - Paramore - The Pretty Reckless</a>
              </div>
            </div>
            <a class="text-blue-600 hover:underline" href="#">Xem thêm</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Component Footer -->
    <FooterComponents />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import HeaderComponents from './HeaderComponents.vue';
import FooterComponents from './FooterComponents.vue';
import axios from 'axios';

const items = ref([]);
const baseApiUrl = process.env.VUE_APP_BASE_API_URL || 'http://localhost:3000';

const swiperOptions = {
  loop: true,
  pagination: {
    clickable: true,
  },
  navigation: true,
};

const fetchItems = async () => {
  try {
    const response = await axios.get(`${baseApiUrl}/items`); // Thay đổi đường dẫn API nếu cần
    items.value = response.data; // Giả định rằng API trả về dữ liệu theo định dạng mà bạn cần
  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
  }
};

onMounted(fetchItems);
</script>

<style scoped>
/* Reset & cơ bản */
body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
  background-color: #f8f9fa;
  color: #333;
}

/* Container chung */
.tin-tuc-container {
  max-width: 1600px ;
  margin: 0 auto;
  padding: 20px;
}

/* Style cho Swiper Container */
.swiper-container {
  width: 100%;
  height: 300px;
}

.caption {
  text-align: center;
  color: #2d3748;
  margin-top: 0.5rem;
}

/* Style cho Indicators */
.indicators {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.indicator {
  width: 10px;
  height: 10px;
  background-color: #cbd5e0;
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
}

.indicator.active {
  background-color: #2d3748;
}

/* Style cho Grid (nội dung phía dưới slider) */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

/* Style cho Card */
.card {
  background: #fff;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.card:hover {
  transform: translateY(-5px);
}

.card img {
  width: 100%;
  border-radius: 8px;
}

/* Style cho các link (clickable-text) */
.clickable-text {
  font-size: 12px;
  margin-bottom: 10px;
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease-in-out;
  display: block;
  font-weight: bold;
}

.clickable-text:hover {
  color: #0056b3;
  text-decoration: underline;
}

/* Style cho Feature Text (tăng kích thước chữ và đứng dòng riêng) */
.feature-text {
  font-size: 1.25em;
  margin-top: 10px;
  margin-bottom: 20px;
  display: block;
  font-weight: bold;
}

/* Style cho Flex (ảnh nhỏ và text bên cạnh) */
.flex {
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
}

.flex img {
  width: 100px;
  height: 60px;
  border-radius: 6px;
  margin-right: 12px;
  object-fit: cover;
}

/* Style cho link "Xem thêm" */
a.text-blue-600 {
  font-size: 12px;
  font-weight: bold;
  color: #007bff;
  text-decoration: none;
  transition: color 0.2s ease-in-out;
}

a.text-blue-600:hover {
  color: #0056b3;
  text-decoration: underline;
}
</style>