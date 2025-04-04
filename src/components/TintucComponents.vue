<template>
  <div>
    <HeaderComponents />

    <!-- Swiper Slider -->
    <div class="swiper-container-tintuc">
      <swiper :options="swiperOptions" @slideChange="onSlideChange">
        <swiper-slide v-for="(item, index) in items" :key="index">
          <img :src="item.src" :alt="item.alt" />
          <p class="caption-tintuc">{{ item.caption }}</p> 
        </swiper-slide>
      </swiper>
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

    <!-- Nội dung chính -->
    <div class="main-content-tintuc">
      <div class="content-container-tintuc">
        <div class="grid-container-tintuc">
          <div class="card-tintuc" v-for="(category, catIndex) in categories" :key="catIndex">
            <h2 class="category-title-tintuc">{{ category.name }}</h2>
            
            <!-- Ảnh nổi bật -->
            <img 
              v-if="category.events.length > 0" 
              :alt="category.events[0].title" 
              class="feature-image-tintuc" 
              :src="getImageUrl(category.events[0].image)" 
              @click="goToEventDetail(category.events[0].id)"
              style="cursor: pointer;"
            />

            <!-- Tiêu đề nổi bật -->
            <a 
              v-if="category.events.length > 0" 
              class="feature-text-tintuc" 
              @click.prevent="goToEventDetail(category.events[0].id)" 
              style="text-decoration: none; cursor: pointer;"
            >
              {{ truncateTitle(category.events[0].title) }}
            </a>
           
            <!-- Danh sách sự kiện -->
            <div class="event-list-tintuc">
              <div 
                class="event-item-tintuc" 
                v-for="(event, eventIndex) in category.events.slice(1)" 
                :key="eventIndex"
              >
                <img 
                  :alt="event.title" 
                  class="event-image-tintuc" 
                  :src="getImageUrl(event.image)" 
                  @click="goToEventDetail(event.id)" 
                  style="cursor: pointer;"
                />
                <a 
                  class="event-title-tintuc" 
                  @click.prevent="goToEventDetail(event.id)" 
                  style="text-decoration: none; cursor: pointer;"
                >
                  {{ truncateTitle(event.title) }}
                </a>
              </div>
            </div>

            <!-- Nút xem thêm -->
            <a class="view-more-tintuc" href="#">Xem thêm</a>
          </div>
        </div>
      </div>
    </div>

    <FooterComponents />
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import HeaderComponents from './HeaderComponents.vue';
import FooterComponents from './FooterComponents.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

const router = useRouter();

const swiperOptions = {
  loop: true, 
  autoplay: {
    delay: 3000, 
    disableOnInteraction: false,
  },
};

const items = ref([]); 
const realIndex = ref(0); 
const categories = ref([]);

const jumpToSlide = (index) => {
  realIndex.value = index;
};

const onSlideChange = (swiper) => {
  realIndex.value = swiper.activeIndex;
};

const goToEventDetail = (eventId) => {
  if (eventId) {
    router.push(`/event/${eventId}`); 
  }
};

const getImageUrl = (imagePath) => {
  return imagePath ? `http://localhost:3000${imagePath}` : 'https://via.placeholder.com/600x300'; 
};

const truncateTitle = (title) => {
  return title.length > 40 ? title.slice(0, 40) + '...' : title; 
};

const fetchCategories = async () => {
  try {
    const response = await fetch('http://localhost:3000/categories/list');
    const result = await response.json();
    categories.value = result.data.filter((cat) => cat.events.length > 0);

    const allEvents = categories.value.flatMap((category) => category.events);

    items.value = allEvents.map((event) => ({
      src: getImageUrl(event.image),
      alt: event.title,
      caption: event.title,
    }));
  } catch (error) {
    console.error('Lỗi khi tải dữ liệu:', error);
  }
};

onMounted(() => {
  fetchCategories();
});
</script>

<style scoped>
.swiper-container-tintuc {
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.swiper-container-tintuc img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  transition: transform 0.5s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.swiper-container-tintuc img:hover {
  transform: scale(1.05);
}

.caption-tintuc {
  display: none;
}

/* Chỉ số điều hướng */
.indicators-tintuc {
  position: absolute;
  /* Đặt vị trí tuyệt đối */
  bottom: 20px;
  /* Cách dưới 20px từ dưới */
  left: 50%;
  /* Căn giữa theo chiều ngang */
  transform: translateX(-50%);
  /* Đưa nó về giữa */
  display: flex;
  /* Sử dụng flexbox để căn giữa */
  gap: 10px;
  /* Khoảng cách giữa các chỉ số */
  z-index: 10;
  /* Đảm bảo nó hiển thị trên ảnh */
}

.indicator-tintuc {
  display: inline-block;
  width: 12px;
  /* Tăng kích thước */
  height: 12px;
  background-color: #ccc;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
  /* Hiệu ứng chuyển màu */
}

.indicator-tintuc:hover {
  background-color: #f97316;
  /* Màu hover */
}

.indicator-tintuc.active {
  background-color: #f97316;
  /* Màu nền cho chỉ số đang hoạt động */
}

/* Các kiểu dáng cho nội dung chính */
.main-content-tintuc {
  color: #333333;
  /* Màu chữ tối hơn */
  padding: 2rem 0;
  /* Thêm khoảng cách trên và dưới */
}

/* Container cho nội dung */
.content-container-tintuc {
  max-width: 1350px;
  margin: 0 auto;
  padding: 2rem;
  /* Thêm padding cho nội dung */
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
  background: white;
  /* Màu nền trắng cho card */
  border-radius: 8px;
  /* Bo góc cho card */
  padding: 1.5rem;
  /* Thêm padding cho card */
  transition: transform 0.3s, box-shadow 0.3s;
  /* Hiệu ứng chuyển động */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  /* Đổ bóng cho card */
}

.card-tintuc:hover {
  transform: translateY(-5px);
  /* Nâng card lên khi hover */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  /* Đổ bóng mạnh hơn khi hover */
}

/* Tiêu đề danh mục */
.category-title-tintuc {
  font-size: 30px;
  /* Tăng kích thước chữ */
  font-weight: 700;
  /* Độ đậm của chữ */
  color: #f97316;
  /* Màu sắc của chữ */
  margin-bottom: 1rem;
  /* Khoảng cách dưới */
  position: relative;
  /* Đặt vị trí tương đối */
  padding-left: 1rem;
  /* Khoảng cách bên trái */
  border-left: 4px solid #f97316;
  /* Thanh dọc bên trái */
  padding-left: 1.5rem;
  /* Thêm khoảng cách bên trái */
}

/* Hình ảnh nổi bật */
.feature-image-tintuc {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  /* Đổ bóng cho hình ảnh nổi bật */
}

/* Văn bản nổi bật */
.feature-text-tintuc {
  display: block;
  font-size: 28px;
  /* Tăng kích thước chữ */
  font-weight: 600;
  color: #4b5563;
  margin-bottom: 1rem;
  transition: color 0.3s;
  /* Hiệu ứng chuyển màu */
}

.feature-text-tintuc:hover {
  color: #f97316;
  /* Đổi màu chữ khi hover */
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
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  /* Đổ bóng cho hình ảnh sự kiện */
}

.event-title-tintuc {
  color: #4b5563;
  font-size: 20px;
  line-height: 1.5;
  /* Khoảng cách dòng */
  transition: color 0.3s;
  /* Hiệu ứng chuyển màu */
}

.event-title-tintuc:hover {
  color: #f97316;
  /* Đổi màu chữ khi hover */
  text-decoration: underline;
}

/* Liên kết xem thêm */
.view-more-tintuc {
  color: #2563eb;
  font-size: 16px;
  /* Tăng kích thước chữ */
  font-weight: 500;
  /* Tăng độ đậm */
  transition: color 0.3s;
  /* Hiệu ứng chuyển màu */
}

.view-more-tintuc:hover {
  color: #f97316;
  /* Đổi màu chữ khi hover */
  text-decoration: underline;
}
</style>