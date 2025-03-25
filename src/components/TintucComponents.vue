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
        <span
          class="indicator"
          :class="{ active: realIndex === index }"
          v-for="(item, index) in items"
          :key="index"
          @click="jumpToSlide(index)"
        ></span>
      </div>
    </div>

    <!-- Phần Nội Dung Chính -->
    <div class="main-content">
      <div class="content-container">
        <div class="grid-container">
          <!-- Lặp qua từng category -->
          <div class="card" v-for="(category, catIndex) in categories" :key="catIndex">
            <h2 class="category-title">{{ category.name }}</h2>
            <img
              v-if="category.events.length > 0"
              :alt="category.events[0].title"
              class="feature-image"
              :src="getImageUrl(category.events[0].image)"
            />
            <a
              v-if="category.events.length > 0"
              href="#"
              class="feature-text"
              >{{ category.events[0].title }}</a
            >
            <div class="event-list">
              <div
                class="event-item"
                v-for="(event, eventIndex) in category.events.slice(1)"
                :key="eventIndex"
              >
                <img
                  :alt="event.title"
                  class="event-image"
                  :src="getImageUrl(event.image)"
                />
                <a href="#" class="event-title">{{ event.title }}</a>
              </div>
            </div>
            <a class="view-more" href="#">Xem thêm</a>
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
import HeaderComponents from './HeaderComponents.vue';
import FooterComponents from './FooterComponents.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

// Swiper options
const swiperOptions = {
  loop: true,
  autoplay: {
    delay: 3000,
  },
};

// Dữ liệu cho Swiper (sẽ được cập nhật từ API)
const items = ref([]);
const realIndex = ref(0);

const jumpToSlide = (index) => {
  realIndex.value = index;
};

// Dữ liệu động từ API
const categories = ref([]);

// Hàm tạo URL đầy đủ cho ảnh
const getImageUrl = (imagePath) => {
  return imagePath ? `http://localhost:3000${imagePath}` : 'https://via.placeholder.com/600x300';
};

// Hàm gọi API và tạo dữ liệu cho Swiper
const fetchCategories = async () => {
  try {
    const response = await fetch('http://localhost:3000/categories/list');
    const result = await response.json();
    categories.value = result.data.filter((cat) => cat.events.length > 0);

    // Lấy tất cả events từ các categories
    const allEvents = categories.value.flatMap((category) => category.events);

    // Tạo mảng items cho Swiper từ events
    items.value = allEvents.map((event) => ({
      src: getImageUrl(event.image), // Dùng image từ event
      alt: event.title, // Dùng title làm alt
      caption: event.title, // Dùng title làm caption
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

onMounted(() => {
  fetchCategories();
});
</script>

<style scoped>
/* Swiper styles */
.swiper-container {
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
}
.swiper-container img {
  width: 100%;
  height: 400px; /* Chiều cao slide */
  object-fit: cover; /* Đảm bảo ảnh không bị méo */
}
.caption {
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 500;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}
.indicators {
  text-align: center;
  margin-top: 10px;
}
.indicator {
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #ccc;
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
}
.indicator.active {
  background-color: #f97316;
}

/* Main content styles */
.main-content {
  background-color: #f5f5f5; /* Màu nền xám nhạt giống hình */
  color: #4b5563; /* Màu chữ xám đậm */
  padding: 3rem 0; /* Khoảng cách trên dưới */
}

/* Content container */
.content-container {
  max-width: 1400px; /* Giới hạn chiều rộng */
  margin: 0 auto;
  padding: 0 1rem; /* Khoảng cách trái phải */
}

/* Grid layout */
.grid-container {
  display: grid;
  grid-template-columns: repeat(1, 1fr); /* 1 cột trên màn hình nhỏ */
  gap: 2rem; /* Khoảng cách giữa các card */
}
@media (min-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr); /* 2 cột trên màn hình lớn */
  }
}

/* Card styles */
.card {
  border-radius: 0.5rem; /* Bo góc */
  padding: 1rem; /* Khoảng cách bên trong */
}

/* Category title */
.category-title {
  font-size:24px; /* Kích thước chữ 20px */
  font-weight: 700; /* Chữ đậm */
  color: #f97316; /* Màu cam */
  margin-bottom: 1rem; /* Khoảng cách dưới */
  position: relative;
  padding-left: 1rem; /* Khoảng cách trái để chừa chỗ cho thanh dọc */
}
.category-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px; /* Thanh dọc màu cam */
  background-color: #f97316;
}

/* Feature image */
.feature-image {
  width: 100%;
  height: 200px; /* Chiều cao cố định giống hình */
  object-fit: cover; /* Đảm bảo ảnh không bị méo */
  border-radius: 0.5rem; /* Bo góc */
  margin-bottom: 1rem; /* Khoảng cách dưới */
}

/* Feature text */
.feature-text {
  display: block;
  font-size: 20px; 
  font-weight: 600; 
  color: #4b5563; 
  margin-bottom: 1rem; 
}
.feature-text:hover {
  text-decoration: underline;
}

/* Event list */
.event-list {
  margin-bottom: 1rem; /* Khoảng cách dưới */
}
.event-item {
  display: flex;
  align-items: flex-start; /* Căn chỉnh đầu dòng */
  margin-bottom: 0.5rem; /* Khoảng cách giữa các item */
}
.event-image {
  width: 150px; /* Kích thước ảnh nhỏ */
  height: 70px;
  object-fit: cover; /* Đảm bảo ảnh không bị méo */
  border-radius: 0.25rem; /* Bo góc nhẹ */
  margin-right: 1rem; /* Khoảng cách phải */
}
.event-title {
  color: #4b5563; /* Màu xám đậm */
  font-size: 0.95rem; /* Kích thước chữ nhỏ */
  line-height: 1.4; /* Khoảng cách dòng */
}
.event-title:hover {
  text-decoration: underline;
}

/* View more link */
.view-more {
  color: #2563eb; /* Màu xanh */
  font-size: 0.9rem; /* Kích thước chữ nhỏ */
}
.view-more:hover {
  text-decoration: underline;
}
</style>