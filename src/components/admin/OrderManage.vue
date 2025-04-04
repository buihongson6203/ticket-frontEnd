<template>
    <SidebarAdmin />
    <section id="content">
        <NavbarAdmin />
        <main>
            <div class="head-title">
                <div class="left">
                    <h1>Order Manage</h1>
                </div>
            </div>

            <div class="table-data">
                <div class="order">
                    <div class="head">
                        <h3>Order Manage</h3>
                    </div>
                    <form @submit.prevent="onSearchClick" class="search-form">
                        <div class="form-input">
                            <input type="text" placeholder="User Name" v-model="searchParams.userName">
                            <input type="text" placeholder="Email" v-model="searchParams.email">
                            <input type="text" placeholder="Event Name" v-model="searchParams.eventName">
                            <select v-model="searchParams.status">
                                <option value="">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                            <select v-model="searchParams.sortType">
                                <option value="ASC">Sort ASC</option>
                                <option value="DESC">Sort DESC</option>
                            </select>
                            <button type="submit" class="search-btn"><i class='fa fa-search'></i></button>
                        </div>
                    </form>
                    <table>
                        <thead>
                            <tr class="header-text">
                                <th>Date</th>
                                <th>Email</th>
                                <th>Event</th>
                                <th>Total Price</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="o in orderData" :key="o.id" style="text-align: center;">
                                <td>{{ formatDate(o.createdAt) }}</td>
                                <td>{{ o.user?.name }}</td>
                                <td>{{ o.user?.email }}</td>
                                <td>{{ o.event?.title }}</td>
                                <td>{{ o.totalPrice }}</td>
                                <td>{{ o.payments?.[0]?.status || 'N/A' }}</td>
                                <td>
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        <button type="button" class="btn-update" @click="viewDetails(o.id)">View Details</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="pagination_section" style="margin-top: 30px;">
                        <a href="#" style="font-weight: bold;" @click="previousPage">
                            << Previous </a>
                                <div class="a-number" v-for="page in totalPages" :key="page">
                                    <a href="#" :class="{ active: page === currentPage }" @click="changePage(page)">
                                        {{ page }}
                                    </a>
                                </div>
                                <a href="#" style="font-weight: bold;" @click="nextPage">
                                    Next >>
                                </a>
                    </div>
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
    name: 'OrderManage',
    components: {
        SidebarAdmin, NavbarAdmin
    },
    data() {
        return {
            orderData: [],
            searchParams: {
                userName: '',
                email: '',
                eventName: '',
                status: '',
                sortType: 'ASC'
            },
            pageSize: 10,
            currentPage: 1,
            totalPages: 0,
            totalItems: 0
        };
    },
    setup() {
        const success = () => {
            toast("Success!", {
                autoClose: 1000,
                type: "success"
            });
        };
        return { success };
    },
    methods: {
        async loadOrderData() {
            try {
                const params = {
                    sortType: this.searchParams.sortType,
                    userName: this.searchParams.userName,
                    email: this.searchParams.email,
                    eventName: this.searchParams.eventName,
                    status: this.searchParams.status,
                    page: this.currentPage,
                    size: this.pageSize
                };

                const response = await axios.get('http://localhost:3000/orders/list-order', {
                    params,
                    headers: { 'accept': '*/*' }
                });

                this.orderData = response.data.data;
                this.totalItems = response.data.total;
                this.totalPages = Math.ceil(this.totalItems / this.pageSize);
            } catch (error) {
                toast.error('Error loading orders: ' + (error.response?.data?.message || error.message), {
                    autoClose: 3000
                });
            }
        },
        onSearchClick() {
            this.currentPage = 1;
            this.loadOrderData();
        },
        changePage(page) {
            this.currentPage = page;
            this.loadOrderData();
        },
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.loadOrderData();
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.loadOrderData();
            }
        },
        viewDetails(orderId) {
            this.$router.push({ name: 'OrderDetailsManageView', params: { billId: orderId } });
        },
        formatDate(dateString) {
            return new Date(dateString).toLocaleDateString('vi-VN');
        }
    },
    mounted() {
        this.loadOrderData();
        import('../../assets/script');
    }
};
</script>

<style scoped>
@import '@/assets/style.css';
@import '@/assets/pagination.css';

.search-form .form-input {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}

.search-form input,
.search-form select {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    flex: 1;
    min-width: 150px;
}

.search-form .search-btn {
    padding: 8px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.search-form .search-btn:hover {
    background-color: #0056b3;
}

.pagination_section .a-number a.active {
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    padding: 2px 8px;
}
</style>