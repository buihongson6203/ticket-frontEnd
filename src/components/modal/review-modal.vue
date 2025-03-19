<template>
    <div v-if="isOpen" class="modal-overlay">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Gửi Đánh Giá</h2>
            </div>
            <form @submit.prevent="submitReview" class="modal-body">
                <label>Chọn Sự Kiện:</label>
                <select v-model="review.eventId">
                    <option value="" disabled>Chọn sự kiện</option>
                    <option v-for="event in events" :key="event.id" :value="event.id">
                        {{ event.title || "Không có tiêu đề" }}
                    </option>
                </select>

                <label>Rating:</label>
                <star-rating 
                    :rating="review.rating"
                    @update:rating="setRating"
                    :increment="1"
                    :max-rating="5"
                    :show-rating="true"
                    active-color="#ff9800"
                    inactive-color="#ddd"
                    class="star-rating"
                ></star-rating>

                <label>Comment:</label>
                <textarea v-model="review.comment" required></textarea>

                <label>Phone:</label>
                <input v-model="review.phone" type="text" required />

                <label>Email:</label>
                <input v-model="review.email" type="email" required />

                <div class="modal-footer">
                    <button type="submit" class="submit-btn">Gửi</button>
                    <button type="button" class="close-btn" @click="closeModal">Đóng</button>
                </div>
            </form>
        </div>
    </div>
</template>


<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";
import axios from "axios";
import StarRating from 'vue-star-rating'


const props = defineProps(["isOpen"]);
const emit = defineEmits(["close"]);

const review = ref({
    eventId: "",
    rating: 0, // ⚠️ Đảm bảo không null để tránh lỗi
    comment: "",
    phone: "",
    email: "",
});

const events = ref([]);
const baseApiUrl = "http://localhost:3000";

// ⭐ Hàm cập nhật rating khi chọn sao
const setRating = (value) => {
    review.value.rating = value;
};

const fetchEventsModal = async () => {
    try {
        const response = await axios.get(`${baseApiUrl}/events`);
        if (response.data && Array.isArray(response.data.data)) {
            events.value = response.data.data;
        } else {
            console.error("Lỗi: Dữ liệu sự kiện không hợp lệ", response.data);
        }
    } catch (error) {
        console.error("Lỗi khi lấy danh sách sự kiện:", error);
    }
};

const submitReview = async () => {
    try {
        await axios.post(`${baseApiUrl}/reviews`, review.value);
        alert("Gửi đánh giá thành công!");
        emit("close");
    } catch (error) {
        console.error("Lỗi khi gửi đánh giá:", error);
    }
};

const closeModal = () => {
    emit("close");
};

watch(
    () => props.isOpen,
    (newVal) => {
        if (newVal) {
            fetchEventsModal();
        }
    }
);
</script>

<style scoped>
/* Overlay nền tối */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

/* Nội dung modal */
.modal-content {
    background: white;
    width: 700px; /* 📌 Tăng kích thước modal */
    max-width: 95%;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    animation: fadeIn 0.3s ease-in-out;
}

/* Header với màu cam */
.modal-header {
    background: #ff7f00;
    color: white;
    padding: 20px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
}

/* Body của form */
.modal-body {
    padding: 30px;
    display: flex;
    flex-direction: column;
}

.modal-body label {
    font-weight: bold;
    margin: 14px 0 6px;
    font-size: 17px;
}

/* Điều chỉnh kích thước đánh giá sao */
.modal-body .star-rating {
    margin: 12px 0;
    font-size: 24px;
}

/* Input và textarea */
.modal-body input,
.modal-body select,
.modal-body textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 16px;
}

.modal-body textarea {
    height: 120px;
    resize: none;
}

/* Nút trong footer */
.modal-footer {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    background: #f5f5f5;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
}

/* Nút gửi */
.submit-btn {
    background: #28a745;
    color: white;
    padding: 14px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 18px;
    transition: 0.3s;
}

.submit-btn:hover {
    background: #218838;
    transform: scale(1.05);
}

/* Nút đóng */
.close-btn {
    background: #dc3545;
    color: white;
    padding: 14px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 18px;
    transition: 0.3s;
}

.close-btn:hover {
    background: #c82333;
    transform: scale(1.05);
}

/* Hiệu ứng xuất hiện modal */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}
</style>

