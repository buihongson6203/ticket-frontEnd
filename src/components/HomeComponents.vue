<template>
  <HeaderComponents />
  <div class="container-home">
    <main>
      <!-- Banner Slider -->
      <section class="banner">
        <swiper :modules="[Navigation, Pagination, Autoplay]" :slides-per-view="1" :loop="true"
          :autoplay="{ delay: 3000, disableOnInteraction: false }" :pagination="{ clickable: true }" class="my-swiper">
          <swiper-slide v-for="(image, index) in banners" :key="index">
            <img :src="image" alt="Banner Image" class="banner-image">
          </swiper-slide>
        </swiper>
      </section>
      <section class="events">
        <div class="title-header">
          <p>Danh sách sự kiện</p>
        </div>
        <div class="event-grid">
          <div v-for="event in events" :key="event.id" class="event-item" @click="goToEventDetail(event.id)"
            style="cursor: pointer;">
            <img :src="`${baseApiUrl}${event.image}`" alt="Event Image">
            <div class="p-4 border-b waper-event">
              <div class="content-home">
                <p class="text-xl font-semibold title-event">{{ event.title }}</p>
              </div>
              <div class="event-date">
                <p>{{ new Date(event.startTime).toLocaleDateString() }} - {{ new
                  Date(event.endTime).toLocaleDateString() }}</p>
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
import { useRouter } from "vue-router"; // ✅ Import useRouter

import HeaderComponents from './HeaderComponents.vue';
import FooterComponents from './FooterComponents.vue';

const events = ref([]);
const banners = ref([]);
const baseApiUrl = process.env.VUE_APP_BASE_API_URL || 'http://localhost:3000';
const router = useRouter();

const sortType = "DESC";
const size = 12;

const goToEventDetail = (eventId) => {
  router.push(`/event/${eventId}`);
};

const fetchEvents = async () => {
  try {
    const response = await fetch(`${baseApiUrl}/events?sortType=${sortType}&size=${size}`);
    const data = await response.json();
    events.value = data.data;
    banners.value = events.value.slice(0, 3).map(event => `${baseApiUrl}${event.image}`);
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
  }
};

onMounted(fetchEvents);
</script>
<style scoped>
@import '../assets/home.css';
</style>
