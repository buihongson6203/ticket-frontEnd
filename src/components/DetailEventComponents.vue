<template>
    <HeaderComponents />
  
    <div class="container-detail">
      <div v-if="event" class="event-content">
        <img :src="`${baseApiUrl}${event.image}`" alt="Event Image" class="event-image">
        <h1 class="event-title">{{ event.title }}</h1>
        <p class="event-date">
          Ngày: {{ new Date(event.startTime).toLocaleDateString() }} - {{ new Date(event.endTime).toLocaleDateString() }}
        </p>
        <p class="event-description">{{ event.description }}</p>
      </div>
      <div v-else class="loading">
        <p>Đang tải thông tin sự kiện...</p>
      </div>
    </div>
  
    <FooterComponents />
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import HeaderComponents from "@/components/HeaderComponents.vue";
  import FooterComponents from "@/components/FooterComponents.vue";
  
  const route = useRoute();
  const event = ref(null);
  const baseApiUrl = process.env.VUE_APP_BASE_API_URL || "http://localhost:3000";
  
  const fetchEventDetail = async () => {
    try {
      const eventId = route.params.id;
      const response = await fetch(`${baseApiUrl}/events/${eventId}`);
      const data = await response.json();
      event.value = data;
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết sự kiện:", error);
    }
  };
  
  onMounted(fetchEventDetail);
  </script>
  
  <style scoped>
  @import '../assets/event-detail.css';
  </style>
  