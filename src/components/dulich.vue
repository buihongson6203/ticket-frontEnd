<template>
    <HeaderComponents />

    <div class="container">
        <!-- Sự kiện nổi bật -->
        <div class="breadcumd">
            <Breadcrumb pageTitle="Du lịch" />
        </div>

        <div class="main-event" v-if="featuredEvent" @click="goToEventDetail(featuredEvent.id)" style="cursor: pointer;">
            <div>
                <img 
                    :src="featuredEvent.image ? `${baseApiUrl}${featuredEvent.image}` : 'https://via.placeholder.com/800x400'"
                    alt="Featured Event Image" />
            </div>

            <!-- Modal thanh toán -->
            <ThanhToanModal :isOpen="isModalOpen" :eventId="selectedEventId" @close="closeModal" />

            <div class="main-event-details">
                <h2>{{ featuredEvent.title }}</h2>
                <div class="info">
                    <i class="fas fa-eye"></i> {{ featuredEvent.totalTickets }}
                    <span>|</span>
                    <i class="fas fa-map-marker-alt"></i> {{ featuredEvent.location }}
                </div>
                <div class="price">VND {{ featuredEvent.price.toLocaleString() }} +</div>
            </div>

            <div class="price">VND 50.000 +</div>
            <p>Thông tin chi tiết về sự kiện...</p>
            <button class="buy-now" @click.stop="openModal(featuredEvent.id)">ĐẶT VÉ NGAY</button>
        </div>

        <!-- Danh sách sự kiện -->
        <div class="events-list">
            <h3 v-if="events.length > 0">Tổng số: {{ events.length }} Sự kiện</h3>
            <h3 v-else>Không có sự kiện nào!</h3>

            <div class="events-grid">
                <div v-for="event in events" :key="event.id" class="event-card" @click="goToEventDetail(event.id)" style="cursor: pointer;">
                    <img 
                        :src="event.image ? `${baseApiUrl}${event.image}` : 'https://via.placeholder.com/400x250'"
                        alt="Event Image" class="event-image" />
                    <div class="vanhoa-content">
                        <div class="date">
                            <div class="price">VND {{ event.price.toLocaleString() }} +</div>
                        </div>
                        <h4>{{ event.title }}</h4>
                        <div class="info">
                            <i class="fas fa-eye"></i> {{ event.totalTickets }}
                            <span>|</span>
                            <i class="fas fa-map-marker-alt"></i> {{ event.location }}
                        </div>
                        <button class="book-btn" @click.stop="openModal(event.id)">ĐẶT VÉ NGAY</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <FooterComponents />
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import HeaderComponents from "./HeaderComponents";
import FooterComponents from "./FooterComponents";
import ThanhToanModal from "./modal/thanhtoan-modal.vue";
import Breadcrumb from "./Breadcrumb.vue";

export default {
    name: "dulich",
    components: {
        HeaderComponents,
        FooterComponents,
        ThanhToanModal,
        Breadcrumb,
    },

    setup() {
        const router = useRouter();
        const isModalOpen = ref(false);
        const selectedEventId = ref(null); // Lưu ID của sự kiện khi mở modal
        const events = ref([]);
        const featuredEvent = ref(null);
        const baseApiUrl = process.env.VUE_APP_BASE_API_URL || "http://localhost:3000";

        // Hàm mở modal và gán eventId
        const openModal = (eventId) => {
            console.log("Mở modal với eventId:", eventId);
            selectedEventId.value = eventId;
            isModalOpen.value = true;
        };

        const closeModal = () => {
            console.log("Đóng modal");
            isModalOpen.value = false;
            selectedEventId.value = null;
        };

        


        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${baseApiUrl}/categories/list?bundleName=dulich`);
                const fetchedEvents = response.data.data?.[0]?.events ?? [];
                events.value = fetchedEvents;

                if (fetchedEvents.length > 0) {
                    featuredEvent.value = fetchedEvents[0]; // Chọn sự kiện đầu tiên làm nổi bật
                }

                console.log("Sự kiện nổi bật:", featuredEvent.value);
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
            }
        };
        const goToEventDetail = (eventId) => {
            router.push(`/event/${eventId}`);
        };

        onMounted(fetchEvents);

        return {
            isModalOpen,
            selectedEventId,
            openModal,
            closeModal,
            events,
            featuredEvent,
            baseApiUrl,
            goToEventDetail,
        };
    },
};
</script>

<style scoped>
@import '/src/assets/vanhoa.css';
</style>
