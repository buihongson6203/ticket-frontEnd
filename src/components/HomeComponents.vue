<template>
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

      <!-- Danh sách sự kiện -->
      <section class="events">
        <div class="title-header">
          <p>Danh sách sự kiện</p>
          <section class="event-actions">
            <button class="event-button event-list-btn" @click="openWeeklyEvents">
              <span class="icon">📅</span> LỊCH SỰ KIỆN
            </button>

            <button class="event-button event-submit-btn">
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
    </main>
  </div>
  <FooterComponents />
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

const events = ref([]);
const banners = ref([]);
const baseApiUrl = process.env.VUE_APP_BASE_API_URL || "http://localhost:3000";
const defaultEventImage = "/images/default-event.jpg"; // Ảnh mặc định nếu không có
const router = useRouter();

const sortType = "DESC";
const size = 12;
const formatPrice = (price) => {
  return Number(price).toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};

const goToEventDetail = (eventId) => {
  router.push(`/event/${eventId}`);
};

const fetchEvents = async () => {
  try {
    const response = await fetch(`${baseApiUrl}/events?sortType=${sortType}&size=${size}`);
    const data = await response.json();
    events.value = data.data;
    banners.value = events.value.slice(0, 3).map((event) => `${baseApiUrl}${event.image}`);
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};
const getWeekRange = () => {
  const now = new Date();
  const dayOfWeek = now.getDay();

  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  console.log('=====from', startOfWeek.getTime());
  console.log('=====to', endOfWeek.getTime());

  return {
    from: startOfWeek.getTime(),
    to: endOfWeek.getTime(),
  };
};

const openWeeklyEvents = () => {
  const { from, to } = getWeekRange();
  router.push({ path: "/weekly-events", query: { from, to } });
};
onMounted(fetchEvents);
</script>

<style scoped>
@import "../assets/home.css";
</style>
