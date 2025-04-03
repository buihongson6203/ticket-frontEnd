<template>
    <SidebarAdmin />
    <section id="content">
        <NavbarAdmin />
        <main>
            <div class="head-title">
                <div class="left">
                    <h1>Tickets Manage</h1>
                </div>
            </div>

            <div class="table-data">
                <div class="order">
                    <div class="head">
                        <h3>Ticket Types</h3>
                        <router-link class="btn-create" to="/admin/create_ticket">Create</router-link>
                    </div>
                    <form @submit.prevent="onSearchClick">
                        <div class="form-input">
                            <input type="search" placeholder="Search by Name..." v-model="searchKeyword">
                            <button type="submit" class="search-btn"><i class='fa fa-search'></i></button>
                        </div>
                    </form>
                    <table>
                        <thead>
                            <tr class="header-text">
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Event</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="ticket in ticketData" :key="ticket.id" style="text-align: center;">
                                <td>{{ ticket.id }}</td>
                                <td>{{ ticket.name }}</td>
                                <td>{{ ticket.price }}</td>
                                <td>{{ ticket.quantity }}</td>
                                <td>{{ ticket.event.title }}</td>
                                <td>
                                    <button class="btn-update" @click="openUpdateModal(ticket)">Update</button>
                                    <button class="btn-delete" @click="onDeleteClick(ticket.id)">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Modal cập nhật ticket -->
            <div v-if="showUpdateModal" class="modal">
                <div class="modal-content">
                    <span class="close" @click="closeUpdateModal">×</span>
                    <h2>Update Ticket</h2>
                    <form @submit.prevent="updateTicket">
                        <label for="event">Event <span class="required">*</span></label>
                        <select id="event" v-model="currentTicket.eventId" required>
                            <option value="" disabled>Chọn sự kiện</option>
                            <option v-for="event in events" :key="event.id" :value="event.id">
                                {{ event.title }}
                            </option>
                        </select>

                        <label for="name">Ticket Name <span class="required">*</span></label>
                        <input type="text" id="name" v-model="currentTicket.name" required>

                        <label for="price">Price <span class="required">*</span></label>
                        <input type="number" id="price" v-model="currentTicket.price" min="0" required>

                        <label for="quantity">Quantity <span class="required">*</span></label>
                        <input type="number" id="quantity" v-model="currentTicket.quantity" min="1" required>

                        <label for="maxPerOrder">Max Per Order <span class="required">*</span></label>
                        <input type="number" id="maxPerOrder" v-model="currentTicket.maxPerOrder" min="1" required>

                        <button type="submit" class="save-modal">Save</button>
                    </form>
                </div>
            </div>
        </main>
    </section>
</template>

<script>
import axios from 'axios';
import SidebarAdmin from './SidebarAdmin.vue';
import NavbarAdmin from './NavbarAdmin.vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    name: 'TicketsManage',
    components: {
        SidebarAdmin, NavbarAdmin
    },
    data() {
        return {
            ticketData: [],
            events: [], // Danh sách sự kiện
            searchKeyword: '',
            showUpdateModal: false, // Điều khiển hiển thị modal
            currentTicket: { // Dữ liệu ticket đang được chỉnh sửa
                id: null,
                eventId: '',
                name: '',
                price: '',
                quantity: '',
                maxPerOrder: ''
            }
        }
    },
    methods: {
        // Lấy danh sách ticket
        loadTicketData() {
            let url = `${process.env.VUE_APP_BASE_API_URL}/ticket-type/list-ticket-type`;
            axios.get(url).then(response => {
                this.ticketData = response.data.data;
            }).catch(error => {
                console.error("Error loading ticket data:", error);
            });
        },

        // Lấy danh sách sự kiện
        async fetchEvents() {
            try {
                const response = await axios.get(`${process.env.VUE_APP_BASE_API_URL}/events`);
                this.events = response.data.data;
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        },

        // Tìm kiếm ticket
        onSearchClick() {
            let url = `${process.env.VUE_APP_BASE_API_URL}/ticket-type/list-ticket-type?name=${encodeURIComponent(this.searchKeyword)}`;
            axios.get(url).then(response => {
                this.ticketData = response.data.data;
            }).catch(error => {
                console.error("Error searching ticket:", error);
            });
        },

        // Mở modal cập nhật
        openUpdateModal(ticket) {
            this.currentTicket = {
                id: ticket.id,
                eventId: ticket.event.id, // Lấy eventId từ ticket.event
                name: ticket.name,
                price: ticket.price,
                quantity: ticket.quantity,
                maxPerOrder: ticket.maxPerOrder
            };
            this.showUpdateModal = true;
        },

        // Đóng modal
        closeUpdateModal() {
            this.showUpdateModal = false;
            this.currentTicket = {
                id: null,
                eventId: '',
                name: '',
                price: '',
                quantity: '',
                maxPerOrder: ''
            };
        },

        // Cập nhật ticket
        async updateTicket() {
            try {
                let formData = new FormData();
                formData.append('eventId', this.currentTicket.eventId);
                formData.append('name', this.currentTicket.name);
                formData.append('price', this.currentTicket.price);
                formData.append('quantity', this.currentTicket.quantity);
                formData.append('maxPerOrder', this.currentTicket.maxPerOrder);

                await axios.put(`${process.env.VUE_APP_BASE_API_URL}/ticket-type/${this.currentTicket.id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                // Hiển thị thông báo thành công
                toast.success("Cập nhật vé thành công!", {
                    position: "top-right",
                    duration: 3000,
                    onClose: () => {
                        // Đóng modal và làm mới danh sách sau khi thông báo đóng
                        this.closeUpdateModal();
                        this.loadTicketData();
                    }
                });
            } catch (error) {
                console.error("Error updating ticket:", error);
                toast.error("Đã có lỗi xảy ra khi cập nhật vé!", {
                    position: "top-right",
                    duration: 3000
                });
            }
        },

        // Xóa ticket
        onDeleteClick(ticketId) {
            if (confirm("Are you sure you want to delete this ticket?")) {
                let url = `${process.env.VUE_APP_BASE_API_URL}/ticket-type/${ticketId}`;
                axios.delete(url).then(() => {
                    toast.success("Deleted successfully!", {
                        position: "top-right",
                        duration: 3000,
                        onClose: () => {
                            this.loadTicketData();
                        }
                    });
                }).catch(error => {
                    console.error("Error deleting ticket:", error);
                    toast.error("Error deleting ticket. Please try again later.", {
                        position: "top-right",
                        duration: 3000
                    });
                });
            }
        }
    },
    mounted() {
        this.loadTicketData();
        this.fetchEvents(); // Lấy danh sách sự kiện khi component được mount
    }
}
</script>

<style scoped>
@import '@/assets/style.css';

/* CSS cho modal */
.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    width: 500px;
    max-width: 90%;
    position: relative;
}

.close {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 24px;
    cursor: pointer;
}

.modal-content h2 {
    margin-bottom: 20px;
    text-align: center;
}

.modal-content form {
    display: flex;
    flex-direction: column;
}

.modal-content label {
    margin-bottom: 5px;
    font-weight: bold;
}

.modal-content input,
.modal-content select {
    margin-bottom: 15px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
}

.save-modal {
    background-color: #4CAF50;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

.save-modal:hover {
    background-color: #45a049;
}

.required {
    color: red;
}
</style>