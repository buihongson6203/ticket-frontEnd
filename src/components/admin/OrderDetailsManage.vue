<template>
    <SidebarAdmin />
    <section id="content">
        <NavbarAdmin />
        <main>
            <div class="head-title">
                <div class="left">
                    <h1>Order Details</h1>
                </div>
                <router-link to="/admin/orders" class="btn-back">Back to List</router-link>
            </div>

            <div class="order-details" v-if="order">
                <div class="detail-section">
                    <h3>Order Information</h3>
                    <div class="detail-row">
                        <span class="label">ID:</span>
                        <span>{{ order.id }}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Date:</span>
                        <span>{{ formatDate(order.createdAt) }}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Total Price:</span>
                        <span>{{ order.totalPrice }} VND</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Status:</span>
                        <select v-model="order.status" :disabled="isUpdating">
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                        <button class="btn-save" @click="updateStatus" :disabled="isUpdating">
                            {{ isUpdating ? 'Saving...' : 'Save' }}
                        </button>
                    </div>
                </div>

                <div class="detail-section">
                    <h3>Customer Information</h3>
                    <div class="detail-row">
                        <span class="label">Name:</span>
                        <span>{{ order.user.name }}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Email:</span>
                        <span>{{ order.user.email }}</span>
                    </div>
                </div>

                <div class="detail-section">
                    <h3>Event Information</h3>
                    <div class="detail-row">
                        <span class="label">Title:</span>
                        <span>{{ order.event.title }}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Location:</span>
                        <span>{{ order.event.location }}</span>
                    </div>
                </div>

                <div class="detail-section">
                    <h3>Ticket Items</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Ticket Type</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in order.items" :key="item.id">
                                <td>{{ item.ticketType.name }}</td>
                                <td>{{ item.quantity }}</td>
                                <td>{{ item.price }} VND</td>
                                <td>{{ (parseFloat(item.price) * item.quantity).toLocaleString('vi-VN') }} VND</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div v-else>
                <p>Loading order details...</p>
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
    name: 'OrderDetailsManageView',
    components: {
        SidebarAdmin,
        NavbarAdmin
    },
    data() {
        return {
            order: null,
            isUpdating: false
        };
    },
    methods: {
        async loadOrderDetails() {
            const billId = this.$route.params.billId;
            try {
                const response = await axios.get(`http://localhost:3000/orders/${billId}`, {
                    headers: { 'accept': '*/*' }
                });
                this.order = response.data.order;
            } catch (error) {
                toast.error('Error loading order details: ' + (error.response?.data?.message || error.message), {
                    autoClose: 3000
                });
            }
        },
        async updateStatus() {
            const paymentId = this.order.payments?.[0]?.id;

            this.isUpdating = true;

            try {
                await axios.put(
                    `http://localhost:3000/orders/update-order/${paymentId}`,
                    { status: this.order.status },
                    {
                        headers: {
                            'accept': '*/*',
                            'Content-Type': 'application/json'
                        }
                    }
                );
                toast.success('✅ Order status updated successfully!', {
                    autoClose: 2000,
                });
            } catch (error) {
                toast.error('❌ Error updating status: ' + (error.response?.data?.message || error.message), {
                    autoClose: 3000
                });
                // revert status if failed
                this.loadOrderDetails();
            }
            this.isUpdating = false;
        },
        formatDate(dateString) {
            return new Date(dateString).toLocaleDateString('vi-VN');
        }
    },
    mounted() {
        this.loadOrderDetails();
        import('../../assets/script');
    }
};
</script>

<style scoped>
@import '@/assets/style.css';

.btn-back {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    margin-left: 20px;
}

.btn-back:hover {
    background-color: #0056b3;
}

.btn-save {
    padding: 6px 12px;
    margin-left: 12px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.btn-save:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.btn-save:hover:not(:disabled) {
    background-color: #218838;
}

.order-details {
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.detail-section {
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid #eee;
    border-radius: 4px;
}

.detail-section h3 {
    margin-bottom: 15px;
    color: #444;
}

.detail-row {
    display: flex;
    margin-bottom: 10px;
    align-items: center;
}

.detail-row .label {
    font-weight: bold;
    width: 150px;
    color: #666;
}

.detail-row span:not(.label) {
    flex: 1;
}

.detail-row select {
    padding: 6px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 200px;
}

.detail-row select:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
}

.detail-section table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}

.detail-section th,
.detail-section td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: center;
}

.detail-section th {
    background-color: #f8f8f8;
    font-weight: bold;
}
</style>
