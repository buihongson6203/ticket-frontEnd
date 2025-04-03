<template>
    <SidebarAdmin />
    <section id="content">
        <NavbarAdmin />
        <main>
            <div class="head-title">
                <div class="left">
                    <h1>Tạo vé</h1>
                    <ul class="breadcrumb">
                        <li>/</li>
                        <li>
                            <router-link class="active" to="/admin/tickets">Quay lại quản lý</router-link>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="table-data">
                <div class="order">
                    <div class="head">
                        <h3>Tạo vé</h3>
                    </div>
                    <form @submit.prevent="onCreateClick">
                        <ul class="form-style-1">
                            <li>
                                <label>Sự kiện <span class="required">*</span></label>
                                <select v-model="ticketData.eventId" required v-if="events.length > 0">
                                    <option value="" disabled>Chọn sự kiện</option>
                                    <option v-for="event in events" :key="event.id" :value="event.id">
                                        {{ event.title }}
                                    </option>
                                </select>
                                <span v-else>Đang tải danh sách sự kiện...</span>
                            </li>
                            <li>
                                <label>Tên vé <span class="required">*</span></label>
                                <input type="text" v-model="ticketData.name" class="field-long" placeholder="Tên vé" required />
                            </li>
                            <li>
                                <label>Giá <span class="required">*</span></label>
                                <input type="number" v-model="ticketData.price" class="field-long" placeholder="Giá" required />
                            </li>
                            <li>
                                <label>Số lượng <span class="required">*</span></label>
                                <input type="number" v-model="ticketData.quantity" class="field-long" placeholder="Số lượng" required />
                            </li>
                            <li>
                                <label>Số lượng tối đa mỗi đơn <span class="required">*</span></label>
                                <input type="number" v-model="ticketData.maxPerOrder" class="field-long" placeholder="Số lượng tối đa mỗi đơn" required />
                            </li>
                        </ul>
                        <button type="submit" class="button-submit-category">Gửi</button>
                    </form>
                </div>
            </div>
        </main>
    </section>
</template>

<script>
import axios from 'axios';
import router from '../../router.js';
import SidebarAdmin from './SidebarAdmin.vue';
import NavbarAdmin from './NavbarAdmin.vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    name: 'CreateTicket',
    components: {
        SidebarAdmin, NavbarAdmin
    },
    data() {
        return {
            events: [],
            ticketData: {
                eventId: '',
                name: '',
                price: '',
                quantity: '',
                maxPerOrder: ''
            }
        }
    },
    methods: {
        async fetchEvents() {
            try {
                const response = await axios.get(`${process.env.VUE_APP_BASE_API_URL}/events`);
                console.log('Dữ liệu thô từ API:', response.data);
                this.events = response.data.data;
                console.log('Danh sách sự kiện đã xử lý:', this.events);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách sự kiện:", error);
            }
        },
        async onCreateClick() {
            try {
                let formData = new FormData();
                Object.keys(this.ticketData).forEach(key => {
                    formData.append(key, this.ticketData[key]);
                });
                await axios.post(`${process.env.VUE_APP_BASE_API_URL}/ticket-type`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                // Hiển thị thông báo thành công với vue3-toastify
                toast.success("Tạo vé thành công!", {
                    position: "top-right",
                    duration: 3000, // Hiển thị trong 3 giây
                    onClose: () => {
                        // Chuyển hướng sau khi thông báo đóng
                        router.push({ path: '/admin/tickets' });
                    }
                });
            } catch (error) {
                console.error("Lỗi khi tạo vé:", error);

                // Hiển thị thông báo lỗi với vue3-toastify
                toast.error("Đã có lỗi xảy ra khi tạo vé!", {
                    position: "top-right",
                    duration: 1000,
                    onClose: () => {
                        // Có thể thêm logic sau khi thông báo lỗi đóng, nếu cần
                    }
                });
            }
        }
    },
    mounted() {
        this.fetchEvents();
    }
}
</script>

<style scoped>
@import '@/assets/forminput.css';
@import '@/assets/style.css';
</style>