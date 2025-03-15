<template>
    <HeaderComponents />
    <div class="weekly-events">
        <div class="breadcumd">
            <Breadcrumb pageTitle="Sự kiện trong tuần" />
        </div>
        <div v-if="events.length" class="weekly-events-grid">
            <div v-for="event in events" :key="event.id" class="weekly-events-item" @click="goToEventDetail(event.id)">
                <img :src="event.image ? `${baseApiUrl}${event.image}` : '/images/default-event.jpg'"
                    alt="Event Image" />
                <div class="weekly-events-content">
                    <p class="text-xl font-semibold title-event">
                        {{ event.title.length > 40 ? event.title.substring(0, 40) + "..." : event.title }}
                    </p>
                    <div class="p-4 border-b waper-event">
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
        </div>
        <p v-else class="weekly-events-empty">Không có sự kiện nào trong tuần này.</p>
    </div>
    <FooterComponents />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import HeaderComponents from "./HeaderComponents.vue";
import FooterComponents from "./FooterComponents.vue";
import Breadcrumb from "./Breadcrumb.vue";
import router from "@/router";
const formatPrice = (price) => {
  return Number(price).toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};
const events = ref([]);
const baseApiUrl = process.env.VUE_APP_BASE_API_URL || "http://localhost:3000";
const route = useRoute();
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
};
const fetchWeeklyEvents = async () => {
    const { from, to } = route.query;
    try {
        const response = await fetch(`${baseApiUrl}/events?from=${from}&to=${to}&sortType=DESC&size=20`);
        const data = await response.json();
        events.value = data.data;
    } catch (error) {
        console.error("Lỗi khi lấy sự kiện trong tuần:", error);
    }
};
const goToEventDetail = (eventId) => {
    router.push(`/event/${eventId}`);
};

onMounted(fetchWeeklyEvents);
</script>

<style scoped>
@import "../assets/weekly-events.css";
</style>