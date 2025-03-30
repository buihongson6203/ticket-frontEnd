<template>
    <HeaderComponents />
  
    <div class="container">
        <!-- Sự kiện nổi bật -->
        <div class="breadcumd">
            <Breadcrumb pageTitle="Văn hóa nghệ thuật" />
        </div>
        <div class="main-event" v-if="featuredEvent" @click="goToEventDetail(featuredEvent.id)"
            style="cursor: pointer;">
            <div>
                <img :src="featuredEvent.image ? `${baseApiUrl}${featuredEvent.image}` : 'https://via.placeholder.com/800x400'"
                    alt="Featured Event Image" />
            </div>
            <ThanhToanModal :isOpen="isModalOpen" @close="closeModal" />
            <div class="main-event-details">
                <h2>{{ featuredEvent.title }}</h2>
                <div class="info">
                    <i class="fas fa-eye"></i> {{ featuredEvent.totalTickets }}
                    <span>|</span>
                    <i class="fas fa-map-marker-alt"></i> {{ featuredEvent.location }}
                </div>
                <div class="price">VND {{ featuredEvent.price.toLocaleString() }} +</div>
                <button class="buy-now" @click.stop="openModal">ĐẶT VÉ NGAY</button>
            </div>
            <div class="price">VND 50.000 +</div>
            <p>i. thông tin chi tiết về madame de đà lạt thời gian: 07h30 - 17h30 tất cả các ngày trong tuần • khu một: 08h - 11h30, 13h30 - 16h30 tất cả các ngày trong tuần • khu biệt điện trần lệ xuân: 7h30 - 17h30 tất cả các ngày trong tuần • madame show: 18h30 - 19h30, thứ bảy hàng tuần địa điểm: madame de đà lạt, số 02 yết kiêu, phường 5, thành phố đà lạt, tỉnh lâm đồng sơ đồ tham quan chính: giá vé: gói lam ngọc • người lớn: 178.000vnd • trẻ em: 50.000vnd • người lớn khi đi kèm trẻ em: 100.000vnd • tham quan khu biệt điện trần lệ xuân • tham quan khu biệt thự trần lệ xuân • miễn phí...</p>
            <button class="buy-now" @click="openModal">ĐẶT VÉ NGAY</button>

        </div>

        <!-- Danh sách sự kiện -->
        <div class="events-list">
            <h3 v-if="events.length > 0">Tổng số: {{ events.length }} Sự kiện</h3>
            <h3 v-else>Không có sự kiện nào!</h3>
            <div class="events-grid">
                <div v-for="event in events" :key="event.id" class="event-card" @click="goToEventDetail(event.id)"
                    style="cursor: pointer;">
                    <img :src="event.image ? `${baseApiUrl}${event.image}` : 'https://via.placeholder.com/400x250'"
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
                        <button class="book-btn" @click.stop="openModal">ĐẶT VÉ NGAY</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <FooterComponents />
</template>


<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router"; // ✅ Import Vue Router
import axios from "axios";
import HeaderComponents from "./HeaderComponents";
import FooterComponents from "./FooterComponents";
import ThanhToanModal from "./modal/thanhtoan-modal.vue";
import Breadcrumb from "./Breadcrumb.vue";


export default {
    name: "van-hoanghethuat",
    components: {
        HeaderComponents,
        FooterComponents,
        ThanhToanModal,
        Breadcrumb,
    },

    setup() {
        const router = useRouter(); // ✅ Khởi tạo Vue Router
        const isModalOpen = ref(false);
        const events = ref([]);
        const featuredEvent = ref(null);
        const baseApiUrl = process.env.VUE_APP_BASE_API_URL || "http://localhost:3000";

        // Hàm mở modal
        const openModal = () => {
            console.log("Mở modal");
            isModalOpen.value = true;
        };

        // Hàm đóng modal
        const closeModal = () => {
            console.log("Đóng modal");
            isModalOpen.value = false;
        };

        // Hàm chuyển hướng đến trang chi tiết sự kiện
        const goToEventDetail = (eventId) => {
            router.push(`/event/${eventId}`); // ✅ Điều hướng khi bấm vào sự kiện
        };

        // Hàm lấy sự kiện từ API
        const fetchEvents = async () => {
            try {
                const response = await axios.get(
                    `${baseApiUrl}/categories/list?categoryName=vanhoa`
                );

                const fetchedEvents = response.data.data?.[0]?.events ?? [];
                events.value = fetchedEvents;

                if (fetchedEvents.length > 0) {
                    featuredEvent.value = fetchedEvents[0]; // Chọn sự kiện đầu tiên làm sự kiện nổi bật
                }

                console.log("Sự kiện nổi bật:", featuredEvent.value);
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
            }
        };

        onMounted(fetchEvents);

        return {
            isModalOpen,
            openModal,
            closeModal,
            events,
            featuredEvent,
            baseApiUrl,
            goToEventDetail, // ✅ Trả về hàm điều hướng
        };
    },
};
</script>



<style scoped>
@import '/src/assets/vanhoa.css';
</style>