<template>
  <div>
    <!-- Component Header -->
    <HeaderComponents />

    <div class="container-home">
      <main>
        <!-- Banner Slider -->
        <section class="banner">
          <swiper :modules="[Navigation, Pagination, Autoplay]" :slides-per-view="1" :loop="true"
            :autoplay="{ delay: 3000, disableOnInteraction: false }" :pagination="{ clickable: true }" class="my-swiper">
            <swiper-slide v-for="(image, index) in banners" :key="index">
              <img :src="image" alt="Banner Image" class="banner-image" />
            </swiper-slide>
          </swiper>
        </section>
        <ReviewModal :isOpen="isReviewModalOpen" @close="closeReviewModal" />

        <!-- Danh sách sự kiện -->
        <section class="events" v-if="events && events.length">
          <div class="title-header">
            <p>Danh sách sự kiện</p>
            <section class="event-actions">
              <button class="event-button event-list-btn" @click="openWeeklyEvents">
                <span class="icon">📅</span> LỊCH SỰ KIỆN
              </button>
              <button class="event-button event-submit-btn" @click="openReviewModal">
                <span class="icon">➕</span> GỬI SỰ KIỆN
              </button>
            </section>
          </div>
          <div class="event-grid">
            <div v-for="event in events" :key="event.id" class="event-item" @click="goToEventDetail(event.id)"
              style="cursor: pointer">
              <img :src="event.image ? `${baseApiUrl}${event.image}` : defaultEventImage" alt="Event Image"
                class="event-image" />
              <div class="p-4 border-b waper-event">
                <div class="content-home" :title="event.title">
                  <p class="text-xl font-semibold title-event">
                    {{ event.title.length > 40 ? event.title.substring(0, 40) + "..." : event.title }}
                  </p>
                </div>
                <div class="event-info">
                  <div class="event-top">
                    <div class="event-date">
                      <i class="fas fa-calendar-alt"></i>
                      <p>{{ formatDate(event.startTime) }}</p>
                    </div>
                    <div class="event-location">
                      <i class="fas fa-map-marker-alt"></i>
                      <p>{{ event.location }}</p>
                    </div>
                  </div>
                  <div class="event-price">
                    <i class="fas fa-money-bill-wave"></i>
                    <p>{{ formatPrice(event.price) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Danh sách danh mục -->
        <template v-for="category in categories" :key="category?.id">
          <section class="events" v-if="category && category.events && category.events.length">
            <div class="title-header">
              <p>{{ category.name }}</p>
            </div>
            <div class="event-grid">
              <div v-for="event in category.events.slice(0, visibleEventsCount[category.id] || 4)" :key="event.id"
                class="event-item" @click="goToEventDetail(event.id)" style="cursor: pointer">
                <img :src="event.image ? `${baseApiUrl}${event.image}` : defaultCategoryImage" alt="Event Image"
                  class="event-image" />
                <div class="p-4 border-b waper-event">
                  <div class="content-home" :title="event.title">
                    <p class="text-xl font-semibold title-event">
                      {{ event.title.length > 40 ? event.title.substring(0, 40) + "..." : event.title }}
                    </p>
                  </div>
                  <div class="event-info">
                    <div class="event-top">
                      <div class="event-date">
                        <i class="fas fa-calendar-alt"></i>
                        <p>{{ formatDate(event.startTime) }}</p>
                      </div>
                      <div class="event-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <p>{{ event.location || 'Không xác định' }}</p>
                      </div>
                    </div>
                    <div class="event-price">
                      <i class="fas fa-money-bill-wave"></i>
                      <p>{{ formatPrice(event.price) }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Nút "Xem thêm" -->
            <div class="view-more text-center mt-4" v-if="category.events.length > (visibleEventsCount[category.id] || 4)">
              <button class="event-button view-more-btn" @click="loadMoreEvents(category.id)">
                Xem thêm
              </button>
            </div>
          </section>
        </template>
      </main>
    </div>

    <!-- Component Footer -->
    <FooterComponents />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useRouter } from "vue-router";

import HeaderComponents from "./HeaderComponents.vue";
import FooterComponents from "./FooterComponents.vue";
import ReviewModal from "./modal/review-modal.vue";

const events = ref([]); // Khởi tạo events là mảng rỗng
const categories = ref([]); // Khởi tạo categories là mảng rỗng
const banners = ref([]);
const baseApiUrl = process.env.VUE_APP_BASE_API_URL || "http://localhost:3000";
const defaultEventImage = "/images/default-event.jpg"; // Ảnh mặc định nếu không có
const defaultCategoryImage = "https://via.placeholder.com/300x200"; // Ảnh mặc định cho danh mục
const router = useRouter();

const sortType = "DESC";
const size = 12;

// State cho modal
const isReviewModalOpen = ref(false);

// State để theo dõi số lượng sự kiện hiển thị cho mỗi danh mục
const visibleEventsCount = ref({}); // Object lưu số lượng sự kiện hiển thị, key là category.id

// Hàm định dạng giá
const formatPrice = (price) => {
  if (!price) return 'Miễn phí';
  return Number(price).toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};

// Hàm định dạng ngày
const formatDate = (dateString) => {
  if (!dateString) return 'Không xác định';
  return new Date(dateString).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

// Hàm lấy danh sách sự kiện
const fetchEvents = async () => {
  try {
    const response = await fetch(`${baseApiUrl}/events?sortType=${sortType}&size=${size}`);
    if (!response.ok) {
      throw new Error('Không thể lấy danh sách sự kiện');
    }
    const data = await response.json();
    events.value = Array.isArray(data.data) ? data.data : [];
    banners.value = events.value.slice(0, 3).map((event) => `${baseApiUrl}${event.image}`);
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu sự kiện:", error);
    events.value = [];
  }
};

// Hàm lấy danh sách danh mục
const fetchCategories = async () => {
  try {
    const response = await fetch(`${baseApiUrl}/categories/list`);
    if (!response.ok) {
      throw new Error('Không thể lấy danh sách danh mục');
    }
    const data = await response.json();
    console.log('Categories data:', data);
    const fetchedCategories = Array.isArray(data.data) ? data.data : [];
    categories.value = fetchedCategories.filter(category => category && typeof category === 'object' && category.id);
    console.log('Categories value:', categories.value);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách danh mục:', error);
    categories.value = [];
  }
};

// Hàm load thêm sự kiện cho một danh mục
const loadMoreEvents = (categoryId) => {
  const currentCount = visibleEventsCount.value[categoryId] || 4;
  visibleEventsCount.value[categoryId] = currentCount + 4;
};

// Chuyển hướng đến chi tiết sự kiện
const goToEventDetail = (eventId) => {
  router.push(`/event/${eventId}`);
};

// Chuyển hướng đến chi tiết danh mục
const goToCategoryDetail = (categoryId) => {
  router.push(`/category/${categoryId}`);
};

// Hàm lấy khoảng thời gian trong tuần
const getWeekRange = () => {
  const now = new Date();
  const dayOfWeek = now.getDay();

  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  return {
    from: startOfWeek.getTime(),
    to: endOfWeek.getTime(),
  };
};

// Mở trang lịch sự kiện
const openWeeklyEvents = () => {
  const { from, to } = getWeekRange();
  router.push({ path: "/weekly-events", query: { from, to } });
};

// Mở modal gửi sự kiện/danh mục
const openReviewModal = () => {
  isReviewModalOpen.value = true;
};

// Đóng modal
const closeReviewModal = () => {
  isReviewModalOpen.value = false;
};

// Gọi API khi component được mounted
onMounted(() => {
  fetchEvents();
  fetchCategories();
});
</script>

<style scoped>
@import "../assets/home.css";


</style>