<template>
  <HeaderComponents />
  <div class="container">
    <main>
      <section class="banner">
        <img src="https://storage.googleapis.com/a1aa/image/OOcopDQjrvUZ6Ndj5w063h4CoyjpggMAdAG0srV0lHA.jpg" alt="GO - VCHESS 2025">
      </section>
      <section class="events">
        <div class="event-grid">
          <div v-for="event in events" :key="event.id" class="event-item">
            <img :src="`${baseApiUrl}${event.image}`" alt="Image">
            <div class="p-4 border-b">
              <div class="content-home">
                <h3 class="text-xl font-semibold title-event">{{ event.title }}</h3>
              </div>
              <div class="event-date">
                <p>{{ new Date(event.startTime).toLocaleString() }} - {{ new Date(event.endTime).toLocaleString() }}</p>
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
import HeaderComponents from './HeaderComponents.vue';
import FooterComponents from './FooterComponents.vue';

const events = ref([]);
const baseApiUrl = process.env.VUE_APP_BASE_API_URL || 'http://localhost:3000';

// Khai báo biến cho tham số API
const sortType = "DESC";
const size = 20;

const fetchEvents = async () => {
  try {
    const response = await fetch(`${baseApiUrl}/events?sortType=${sortType}&size=${size}`);
    const data = await response.json();
    events.value = data.data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
  }
};

onMounted(fetchEvents);
</script>

<style scoped>
@import '../assets/home.css';
</style>
