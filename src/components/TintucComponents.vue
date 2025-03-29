<template>
  <div>
    <!-- Tiêu đề của component -->
    <HeaderComponents />

    <!-- Container cho Swiper -->
    <div class="swiper-container-tintuc">
      <swiper :options="swiperOptions" @slideChange="onSlideChange">
        <!-- Lặp qua từng item trong mảng items -->
        <swiper-slide v-for="(item, index) in items" :key="index">
          <img :src="item.src" :alt="item.alt" />
          <p class="caption-tintuc">{{ item.caption }}</p> 
        </swiper-slide>
      </swiper>
      <!-- Chỉ số điều hướng -->
      <div class="indicators-tintuc">
        <span 
          class="indicator-tintuc" 
          :class="{ active: realIndex === index }" 
          v-for="(item, index) in items" 
          :key="index" 
          @click="jumpToSlide(index)"
        ></span>
      </div>
    </div>

    <!-- Phần Nội Dung Chính -->
    <div class="main-content-tintuc">
      <div class="content-container-tintuc">
        <div class="grid-container-tintuc">
          <!-- Lặp qua từng danh mục -->
          <div class="card-tintuc" v-for="(category, catIndex) in categories" :key="catIndex">
            <h2 class="category-title-tintuc">{{ category.name }}</h2>
            <!-- Hiển thị hình ảnh nổi bật nếu có sự kiện -->
            <img 
              v-if="category.events.length > 0" 
              :alt="category.events[0].title" 
              class="feature-image-tintuc" 
              :src="getImageUrl(category.events[0].image)" 
            />
            <a 
              v-if="category.events.length > 0" 
              href="#" 
              class="feature-text-tintuc"
            >{{ category.events[0].title }}</a>
            <div class="event-list-tintuc">
              <!-- Lặp qua từng sự kiện trong danh mục -->
              <div 
                class="event-item-tintuc" 
                v-for="(event, eventIndex) in category.events.slice(1)" 
                :key="eventIndex"
              >
                <img 
                  :alt="event.title" 
                  class="event-image-tintuc" 
                  :src="getImageUrl(event.image)" 
                />
                <a href="#" class="event-title-tintuc">{{ truncateTitle(event.title) }}</a>
              </div>
            </div>
            <a class="view-more-tintuc" href="#">Xem thêm</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Chân trang của component -->
    <FooterComponents />
  </div>
</template>

<script setup>
// Import các thư viện và component cần thiết
import { ref, onMounted } from 'vue';
import HeaderComponents from './HeaderComponents.vue';
import FooterComponents from './FooterComponents.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

// Tùy chọn cho Swiper
const swiperOptions = {
  loop: true, // Lặp lại các slide
  autoplay: {
    delay: 3000, // Thời gian giữa các slide (3000ms)
    disableOnInteraction: false, // Không dừng autoplay khi người dùng tương tác
  },
};

// Khai báo biến reactive cho dữ liệu
const items = ref([]); // Mảng chứa các item cho Swiper
const realIndex = ref(0); // Chỉ số slide hiện tại

// Hàm nhảy đến slide tương ứng
const jumpToSlide = (index) => {
  realIndex.value = index; // Cập nhật chỉ số slide
};

// Hàm xử lý khi slide thay đổi
const onSlideChange = (swiper) => {
  realIndex.value = swiper.activeIndex; // Cập nhật chỉ số hiện tại
};

// Dữ liệu động từ API
const categories = ref([]); // Mảng chứa các danh mục

// Hàm tạo URL đầy đủ cho ảnh
const getImageUrl = (imagePath) => {
  return imagePath ? `http://localhost:3000${imagePath}` : 'https://via.placeholder.com/600x300'; // Trả về URL ảnh
};

// Hàm cắt văn bản và thêm dấu "..."
const truncateTitle = (title) => {
  return title.length > 50 ? title.slice(0, 50) + '...' : title; // Cắt tiêu đề nếu dài hơn 50 ký tự
};

// Hàm gọi API và tạo dữ liệu cho Swiper
const fetchCategories = async () => {
  try {
    const response = await fetch('http://localhost:3000/categories/list'); // Gọi API để lấy danh mục
    const result = await response.json(); // Chuyển đổi phản hồi thành JSON
    categories.value = result.data.filter((cat) => cat.events.length > 0); // Lọc danh mục có sự kiện

    // Lấy tất cả sự kiện từ các danh mục
    const allEvents = categories.value.flatMap((category) => category.events);

    // Tạo mảng items cho Swiper từ sự kiện
    items.value = allEvents.map((event) => ({
      src: getImageUrl(event.image), // Dùng image từ event
      alt: event.title, // Dùng title làm alt
      caption: event.title, // Dùng title làm caption
    }));
  } catch (error) {
    console.error('Error fetching categories:', error); // Xử lý lỗi khi gọi API
  }
};

// Gọi hàm fetchCategories khi component được mount
onMounted(() => {
  fetchCategories();
});
</script>

<style scoped>
/* Các kiểu dáng cho Swiper */
.swiper-container-tintuc {
  position: relative; /* Đặt vị trí tương đối cho container */
  max-width: 1400px;
  margin: 0 auto;
  border-radius: 10px; /* Bo viền cho container */
  overflow: hidden; /* Ẩn phần thừa */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Đổ bóng nhẹ */
}

.swiper-container-tintuc img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  transition: transform 0.5s ease; /* Hiệu ứng chuyển động */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); /* Đổ bóng cho hình ảnh */
}

.swiper-container-tintuc img:hover {
  transform: scale(1.05); /* Phóng to hình ảnh khi hover */
}

.caption-tintuc {
  display: none; /* Ẩn hoàn toàn phần tử */
}

/* Chỉ số điều hướng */
.indicators-tintuc {
  position: absolute; /* Đặt vị trí tuyệt đối */
  bottom: 20px; /* Cách dưới 20px từ dưới */
  left: 50%; /* Căn giữa theo chiều ngang */
  transform: translateX(-50%); /* Đưa nó về giữa */
  display: flex; /* Sử dụng flexbox để căn giữa */
  gap: 10px; /* Khoảng cách giữa các chỉ số */
  z-index: 10; /* Đảm bảo nó hiển thị trên ảnh */
}

.indicator-tintuc {
  display: inline-block;
  width: 12px; /* Tăng kích thước */
  height: 12px;
  background-color: #ccc; 
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s; /* Hiệu ứng chuyển màu */
}

.indicator-tintuc:hover {
  background-color: #f97316; /* Màu hover */
}

.indicator-tintuc.active {
  background-color: #f97316; /* Màu nền cho chỉ số đang hoạt động */
}

/* Các kiểu dáng cho nội dung chính */
.main-content-tintuc {
  color: #333333; /* Màu chữ tối hơn */
  padding: 2rem 0; /* Thêm khoảng cách trên và dưới */
}

/* Container cho nội dung */
.content-container-tintuc {
  max-width: 1350px;
  margin: 0 auto;
  padding: 2rem; /* Thêm padding cho nội dung */
}

/* Bố cục lưới */
.grid-container-tintuc {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
}

@media (min-width: 768px) {
  .grid-container-tintuc {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Các kiểu dáng cho card */
.card-tintuc {
  background: white; /* Màu nền trắng cho card */
  border-radius: 8px; /* Bo góc cho card */
  padding: 1.5rem; /* Thêm padding cho card */
  transition: transform 0.3s, box-shadow 0.3s; /* Hiệu ứng chuyển động */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Đổ bóng cho card */
}

.card-tintuc:hover {
  transform: translateY(-5px); /* Nâng card lên khi hover */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* Đổ bóng mạnh hơn khi hover */
}

/* Tiêu đề danh mục */
.category-title-tintuc {
  font-size: 30px; /* Tăng kích thước chữ */
  font-weight: 700; /* Độ đậm của chữ */
  color: #f97316; /* Màu sắc của chữ */
  margin-bottom: 1rem; /* Khoảng cách dưới */
  position: relative; /* Đặt vị trí tương đối */
  padding-left: 1rem; /* Khoảng cách bên trái */
  border-left: 4px solid #f97316; /* Thanh dọc bên trái */
  padding-left: 1.5rem; /* Thêm khoảng cách bên trái */
}

/* Hình ảnh nổi bật */
.feature-image-tintuc {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Đổ bóng cho hình ảnh nổi bật */
}

/* Văn bản nổi bật */
.feature-text-tintuc {
  display: block;
  font-size: 28px; /* Tăng kích thước chữ */
  font-weight: 600;
  color: #4b5563;
  margin-bottom: 1rem;
  transition: color 0.3s; /* Hiệu ứng chuyển màu */
}

.feature-text-tintuc:hover {
  color: #f97316; /* Đổi màu chữ khi hover */
  text-decoration: underline;
}

/* Danh sách sự kiện */
.event-list-tintuc {
  margin-bottom: 1rem;
}

.event-item-tintuc {
  display: flex;
  margin-bottom: 1.5rem;
}

.event-image-tintuc {
  width: 150px;
  height: 70px;
  object-fit: cover;
  border-radius: 0.5rem;
  margin: 0 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Đổ bóng cho hình ảnh sự kiện */
}

.event-title-tintuc {
  color: #4b5563;
  font-size: 20px;
  line-height: 1.5; /* Khoảng cách dòng */
  transition: color 0.3s; /* Hiệu ứng chuyển màu */
}

.event-title-tintuc:hover {
  color: #f97316; /* Đổi màu chữ khi hover */
  text-decoration: underline;
}

/* Liên kết xem thêm */
.view-more-tintuc {
  color: #2563eb;
  font-size: 16px; /* Tăng kích thước chữ */
  font-weight: 500; /* Tăng độ đậm */
  transition: color 0.3s; /* Hiệu ứng chuyển màu */
}

.view-more-tintuc:hover {
  color: #f97316; /* Đổi màu chữ khi hover */
  text-decoration: underline;
}
</style>