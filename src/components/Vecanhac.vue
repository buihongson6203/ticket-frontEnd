<template>
    <div class="vecanhac">
    <HeaderComponents />
    <body>
    <div class="canhac-container">
        <ThanhToanModal :isOpen="isModalOpen" @close="closeModal" />
        <!-- Main Event -->
        <div class="canhac-main-event">
            <img src="https://storage.googleapis.com/a1aa/image/aoRhSGCRmbGR1OrWVP8HtEmg3_NlKMP2G-GvTu-yu84.jpg" alt="Main event image">
            <div class="canhac-main-event-content">
                <h2>"CHÀO SHOW" tại Sài Gòn: tôn vinh âm nhạc Việt Nam</h2>
                <div class="info">
                    <i class="fas fa-eye"></i> 501|
                    <i class="fas fa-map-marker-alt"></i> Hồ Chí Minh
                </div>
                <p class="price">VND 1.300.000 +</p>
                <p>[english below] 1. thông tin chi tiết về giá vé &amp; lịch biểu diễn - chào show - chương trình nghệ thuật đặc sắc mới tại sài gòn . thời gian: 19:00 - 21:00 từ thứ 3 đến chủ nhật hàng tuần - địa điểm: chào show tại số 6 nguyên siêu, phường bến nghé, q1, tphcm. + giá vé chào show: 1,300,000 vnd/giá đã bao gồm thuế, đồ ăn và nước uống, rượu +) hotline hỗ trợ mua vé chào show: 08 999 80 818 - 0243 788 00 99 chương trình nghệ thuật đặc sắc chào show tôn vinh âm nhạc việt nam qua 30 nhạc cụ dân tộc độc đáo, có thể nói là dân nhạc cụ độc đáo đầy đủ và độc lạ nhất hiện nay trong nước, mà c...</p>
            </div>
            <button class="buy-now" @click="openModal">ĐẶT VÉ NGAY</button>
        </div>
         <!-- Total Events -->
        <div class="total-events">
        <p>Tổng số : 7 sự kiện</p>
        </div>
        <!-- Events List -->
        <div class="canhac-events-list">
            <!-- Event Item -->
            <div class="canhac-event-item">
                <img src="https://storage.googleapis.com/a1aa/image/_URyMF1aFjrZZ-6h9HRXjTTnuPMc_5KC4J0iFx8-w3o.jpg" alt="Event image">
                <div class="canhac-event-item-content">
                    <div class="info">
                    </div>
                    <h3>LULULALA Show</h3>
                    <p class="price">VND 450.000 +</p>
                    <p>Liveshow MAI TIẾN DŨNG - VƯƠNG ANH TÚ tại Đà Lạt - Ngày</p>
                    <div class="info">
                        <i class="fas fa-eye"></i> 1.672 |
                        <i class="fas fa-map-marker-alt"></i> Lâm Đồng
                    </div>
                    <button class="book-btn" @click="openModal">ĐẶT VÉ NGAY</button>
                </div>
            </div>
            <!-- Event Item -->
            <div class="canhac-event-item">
                <img src="https://storage.googleapis.com/a1aa/image/_URyMF1aFjrZZ-6h9HRXjTTnuPMc_5KC4J0iFx8-w3o.jpg" alt="Event image">
                <div class="canhac-event-item-content">
                    <div class="info">
                    </div>
                    <h3>Chamber Music Concert "Mon Amour"</h3>
                    <p class="price">VND 350.000 +</p>
                    <p>Chamber Music Concert "Mon Amour" - Đêm nhạc thính</p>
                    <div class="info">
                        <i class="fas fa-eye"></i> 570 |
                        <i class="fas fa-map-marker-alt"></i> Hồ Chí Minh
                    </div>
                    <button class="book-btn" @click="openModal">ĐẶT VÉ NGAY</button>
                </div>
            </div>
            <!-- Event Item -->
            <div class="canhac-event-item">
                <img src="https://storage.googleapis.com/a1aa/image/_URyMF1aFjrZZ-6h9HRXjTTnuPMc_5KC4J0iFx8-w3o.jpg" alt="Event image">
                <div class="canhac-event-item-content">
                    <div class="info">
                    </div>
                    <h3>Đêm nhạc MỘT ĐÊM SAY CẢM XÚC TAN VÀO MEN NỒNG &amp;</h3>
                    <p class="price">VND 300.000 +</p>
                    <p>Đêm nhạc MỘT ĐÊM SAY CẢM XÚC TAN VÀO MEN NỒNG &amp;</p>
                    <div class="info">
                        <i class="fas fa-eye"></i> 1.045 |
                        <i class="fas fa-map-marker-alt"></i> Hồ Chí Minh
                    </div>
                    <button class="book-btn" @click="openModal">ĐẶT VÉ NGAY</button>
                </div>
            </div>
            <!-- Event Item -->
            <div class="canhac-event-item">
                <img src="https://storage.googleapis.com/a1aa/image/_URyMF1aFjrZZ-6h9HRXjTTnuPMc_5KC4J0iFx8-w3o.jpg" alt="Event image">
                <div class="canhac-event-item-content">
                    <div class="info">
                    </div>
                    <h3>ĐÊM NHẠC TRỊNH CÔNG SƠN - BIỂN NHỚ tại SAX'N'ART CLUB</h3>
                    <p class="price">VND 300.000 +</p>
                    <p>ĐÊM NHẠC TRỊNH CÔNG SƠN - BIỂN NHỚ tại SAX'N'ART CLUB</p>
                    <div class="info">
                        <i class="fas fa-eye"></i> 901 |
                        <i class="fas fa-map-marker-alt"></i> Hồ Chí Minh
                    </div>
                    <button class="book-btn" @click="openModal">ĐẶT VÉ NGAY</button>
                </div>
            </div>
            <!-- Event Item -->
            <div class="canhac-event-item">
                <img src="https://storage.googleapis.com/a1aa/image/_URyMF1aFjrZZ-6h9HRXjTTnuPMc_5KC4J0iFx8-w3o.jpg" alt="Event image">
                <div class="canhac-event-item-content">
                    <div class="info">
                    </div>
                    <h3>LULULALA Show</h3>
                    <p class="price">VND 500.000 +</p>
                    <p>Liveshow TRUNG QUÂN - ĐÊN LÚC THẤY ĐỎI RỒI tại Đà Lạt -</p>
                    <div class="info">
                        <i class="fas fa-eye"></i> 1.745 |
                        <i class="fas fa-map-marker-alt"></i> Lâm Đồng
                    </div>
                    <button class="book-btn" @click="openModal">ĐẶT VÉ NGAY</button>
                </div>
            </div>
            <!-- Event Item -->
            <div class="canhac-event-item">
                <img src="https://storage.googleapis.com/a1aa/image/_URyMF1aFjrZZ-6h9HRXjTTnuPMc_5KC4J0iFx8-w3o.jpg" alt="Event image">
                <div class="canhac-event-item-content">
                    <div class="info">
                    </div>
                    <h3>LULULALA Show</h3>
                    <p class="price">VND 450.000 +</p>
                    <p>Liveshow VĂN MAI HƯƠNG - CẦU VỒNG LẤP LÁNH tại Đà Lạt -</p>
                    <div class="info">
                        <i class="fas fa-eye"></i> 1.686 |
                        <i class="fas fa-map-marker-alt"></i> Lâm Đồng
                    </div>
                    <button class="book-btn" @click="openModal">ĐẶT VÉ NGAY</button>
                </div>
            </div>
        </div>
    </div>
     <!-- Popup thanh toán -->
     <div v-if="showPopup" class="popup-overlay">
                <div class="popup">
                    <h2>Thanh toán vé</h2>
                    <p>Sự kiện: {{ selectedEvent.name }}</p>
                    <p>Giá vé: VND {{ selectedEvent.price }}</p>
                    <button @click="closePopup" class="btn-close">Đóng</button>
                </div>
            </div>
</body>
    <FooterComponents />
  </div>
</template>

<script>
import { ref } from "vue";
import FooterComponents from './FooterComponents.vue';
import HeaderComponents from './HeaderComponents.vue';
import ThanhToanModal from "./modal/thanhtoan-modal.vue";

export default {
  name: "ca-nhac",
  components: {
    HeaderComponents,
    FooterComponents,
    ThanhToanModal,
  },
  setup() {
    const isModalOpen = ref(false);

    // Mở modal
    const openModal = () => {
      console.log("Mở modal");
      isModalOpen.value = true;
    };

    // Đóng modal
    const closeModal = () => {
      console.log("Đóng modal");
      isModalOpen.value = false;
    };

    return {
      isModalOpen,
      openModal,
      closeModal,
    };
  },
};
</script>

<style scoped>
body {
    font-family: Arial, sans-serif;
    background-color: #f8f8f8;
    color: #333;
    margin: 0;
    padding: 0;
}

.canhac-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.canhac-main-event {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
    padding: 20px;
    background: white;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.canhac-main-event img {
    width: 300px;
    height: 300px;
    border-radius: 8px;
    object-fit: cover;
}

.canhac-main-event-content {
    flex: 1;
}

.canhac-main-event-content h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
}

.info {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
}

.price {
    color: red;
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 20px;
}

.buy-now, .book-btn {
    background-color: orange;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.buy-now:hover, .book-btn:hover {
    background-color: darkorange;
}

.total-events {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}

.canhac-events-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* Luôn có 3 mục mỗi hàng */
    gap: 20px;
}

.canhac-event-item {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.canhac-event-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.canhac-event-item img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.canhac-event-item-content {
    padding: 15px;
}

.canhac-event-item-content h3 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}

@media (max-width: 768px) {
    .canhac-main-event {
        flex-direction: column;
        align-items: flex-start;
    }

    .canhac-main-event img {
    margin-right: 20px; /* Thêm khoảng cách giữa ảnh và nội dung */
}

}

@media (max-width: 480px) {
    .canhac-events-list {
        grid-template-columns: 1fr; /* 1 mục mỗi hàng trên màn hình nhỏ */
    }
}



</style>