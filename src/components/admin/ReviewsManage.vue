<template>
    <SidebarAdmin />
    <section id="content">
        <NavbarAdmin />
        <main>
            <div class="head-title">
                <div class="left">
                    <h1>Reviews Manage</h1>
                </div>
            </div>
            <form @submit.prevent="onSearchClick" class="search-form-reviews">
                <div class="form-input-review">
                    <div class="input-group-reviews">
                        <input type="search" placeholder="Search by event name..." v-model="searchKeyword">
                    </div>
                    <div class="input-group-reviews">
                        <input type="date" v-model="dateFrom" placeholder="From Date">
                    </div>
                    <div class="button-group-reviews">
                        <button type="submit" class="search-btn-reviews">Tìm kiếm</button>
                        <button type="button" class="clear-btn-reviews" @click="clearSearch"><i class="fa fa-times"></i>
                            Clear</button>
                    </div>
                </div>
            </form>

            <div class="table-data">
                <div class="order">
                    <table>
                        <thead>
                            <tr class="header-text">
                                <th>Rating</th>
                                <th>Comment</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Event Name</th>
                                <th>Review Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="review in reviewsData" :key="review.reviewDate" style="text-align: center;">
                                <td>{{ review.rating }}</td>
                                <td>{{ review.comment }}</td>
                                <td>{{ review.phone }}</td>
                                <td>{{ review.email }}</td>
                                <td>{{ review.eventName }}</td>
                                <td>{{ formatDate(review.reviewDate) }}</td>
                                <td>
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        <button type="button" class="btn-update"
                                            @click="openUpdateModal(review)">Update</button>
                                        <button type="button" class="btn-delete"
                                            @click="onDeleteClick(review.reviewDate)">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="pagination_section" style="margin-top: 30px;">
                        <a href="#" style="font-weight: bold;" @click="previousPage">&laquo; Previous</a>
                        <div class="a-number" v-for="page in totalPages" :key="page">
                            <a href="#" title="Page" @click="changePage(page)">{{ page }}</a>
                        </div>
                        <a href="#" style="font-weight: bold;" @click="nextPage">Next &raquo;</a>
                    </div>
                </div>
            </div>
        </main>

        <!-- Modal for Update Review -->
        <div v-if="showUpdateModal" class="modal">
            <div class="modal-content">
                <span class="close" @click="closeUpdateModal">×</span>
                <h2>Update Review</h2>
                <form @submit.prevent="updateReview">
                    <label for="rating">Rating</label>
                    <input type="number" id="rating" v-model="currentReview.rating" min="1" max="5" required>

                    <label for="comment">Comment</label>
                    <input type="text" id="comment" v-model="currentReview.comment" required>

                    <label for="phone">Phone</label>
                    <input type="text" id="phone" v-model="currentReview.phone" required>

                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="currentReview.email" required>

                    <label for="eventName">Event Name</label>
                    <input type="text" id="eventName" v-model="currentReview.eventName" required>

                    <button type="submit" class="save-modal">Save</button>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import SidebarAdmin from './SidebarAdmin.vue';
import NavbarAdmin from './NavbarAdmin.vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    name: 'ReviewsManage',
    components: { SidebarAdmin, NavbarAdmin },
    data() {
        return {
            reviewsData: [],
            searchKeyword: '',
            dateFrom: '',
            dateTo: '',
            pageSize: 10,
            currentPage: 1,
            totalPages: 0,
            totalItems: 0,
            showUpdateModal: false,
            currentReview: { rating: null, comment: '', phone: '', email: '', eventName: '', reviewDate: '' }
        };
    },
    setup() {
        return { success: () => toast("Success!", { autoClose: 1000, type: "success" }) };
    },
    methods: {
        async loadReviewsData() {
            try {
                let url = `${process.env.VUE_APP_BASE_API_URL}/reviews?page=${this.currentPage}&size=${this.pageSize}&sortType=DESC`;
                if (this.dateFrom) url += `&from=${new Date(this.dateFrom).getTime()}`;
                if (this.dateTo) url += `&to=${new Date(this.dateTo).getTime()}`;
                if (this.searchKeyword) url += `&eventName=${encodeURIComponent(this.searchKeyword)}`;

                const response = await axios.get(url);
                this.reviewsData = response.data.data;
                this.totalItems = response.data.total;
                this.totalPages = Math.ceil(this.totalItems / this.pageSize);
            } catch (error) {
                console.error('Error loading reviews:', error);
            }
        },

        async onSearchClick() {
            this.currentPage = 1; // Reset về trang đầu tiên khi tìm kiếm
            await this.loadReviewsData();
        },

        async clearSearch() {
            this.searchKeyword = '';
            this.dateFrom = '';
            this.dateTo = '';
            this.currentPage = 1;
            await this.loadReviewsData();
        },

        changePage(page) {
            this.currentPage = page;
            this.loadReviewsData();
        },

        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.loadReviewsData();
            }
        },

        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.loadReviewsData();
            }
        },

        formatDate(dateString) {
            return new Date(dateString).toLocaleString();
        },

        openUpdateModal(review) {
            this.currentReview = { ...review };
            this.showUpdateModal = true;
        },

        closeUpdateModal() {
            this.showUpdateModal = false;
        },

        async updateReview() {
            try {
                const url = `${process.env.VUE_APP_BASE_API_URL}/reviews/${this.currentReview.reviewDate}`;
                await axios.patch(url, this.currentReview);
                this.showUpdateModal = false;
                this.success();
                await this.loadReviewsData();
            } catch (error) {
                toast.error("Error updating review. Please try again.");
            }
        },

        async onDeleteClick(reviewDate) {
            if (confirm("Are you sure you want to delete this review?")) {
                try {
                    await axios.delete(`${process.env.VUE_APP_BASE_API_URL}/reviews/${reviewDate}`);
                    this.success();
                    await this.loadReviewsData();
                } catch (error) {
                    toast.error("Error deleting review. Please try again later.");
                }
            }
        }
    },
    mounted() {
        this.loadReviewsData();
    }
};
</script>

<style scoped>
@import '@/assets/style.css';
@import '@/assets/pagination.css';

/* Định dạng chung cho form tìm kiếm */
.search-form-reviews {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 8px;

}

/* Chỉnh sửa input container */
.form-input-review {
    display: flex;
    align-items: center;
    gap: 12px;
}

/* Input tìm kiếm */
.input-group-reviews input[type="search"],
.input-group-reviews input[type="date"] {
    width: 220px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.3s;
}

.input-group input[type="search"]:focus,
.input-group-reviews input[type="date"]:focus {
    border-color: #007bff;
}

/* Nhóm button */
.button-group-reviews {
    display: flex;
    gap: 8px;
}

/* Nút tìm kiếm */
.search-btn-reviews {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s;
    font-size: 14px;
}

.search-btn-reviews:hover {
    background-color: #0056b3;
}

/* Nút clear */
.clear-btn-reviews {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s;
    font-size: 14px;
}

.clear-btn-reviews:hover {
    background-color: #c82333;
}

/* Responsive */
@media (max-width: 768px) {
    .search-form-reviews {
        flex-direction: column;
        align-items: stretch;
    }

    .form-input-review {
        flex-direction: column;
        gap: 10px;
    }

    .button-group-reviews {
        justify-content: center;
    }
}
</style>