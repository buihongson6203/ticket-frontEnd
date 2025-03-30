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
                <star-rating :rating="review.rating" @update:rating="setRating" :increment="1" :max-rating="5"
                    :show-rating="true" active-color="#ff9800" inactive-color="#ddd" class="star-rating"></star-rating>

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
import StarRating from "vue-star-rating";
import toastr from "toastr";

// Cấu hình toastr
toastr.options = {
    closeButton: true,
    progressBar: true,
    positionClass: "toast-top-right", // Thử đổi vị trí
    timeOut: 3000,
    extendedTimeOut: 1000,
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
    onShown: function () {
        document.querySelectorAll(".toast").forEach((toast) => {
            toast.style.zIndex = "99999";
        });
    },
};

const props = defineProps(["isOpen"]);
const emit = defineEmits(["close"]);

const review = ref({
    eventId: "",
    rating: 0,
    comment: "",
    phone: "",
    email: "",
});

const events = ref([]);
const baseApiUrl = "http://localhost:3000";

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
        console.log("Before toastr call");
        toastr.success("Gửi đánh giá thành công!");
        console.log("After toastr call");
        setTimeout(() => {
            emit("close"); // Đóng modal sau khi thông báo hiển thị
        }, 500); // Đợi 500ms để đảm bảo thông báo hiển thị
    } catch (error) {
        console.error("Lỗi khi gửi đánh giá:", error);
        toastr.error("Có lỗi xảy ra khi gửi đánh giá!");
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
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: #fff;
    border-radius: 8px;
    width: 90%;
    max-width: 600px;
    padding: 20px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-body {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
}

.submit-btn,
.close-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
}

.submit-btn {
    background-color: #ff9800;
    color: #fff;
}

.submit-btn:hover {
    background-color: #e68900;
    transform: scale(1.05);
}

.close-btn {
    background-color: #ccc;
    color: #333;
}

.close-btn:hover {
    background-color: #bbb;
    transform: scale(1.05);
}

:deep(.toast) {
    z-index: 99999 !important;
}
</style>