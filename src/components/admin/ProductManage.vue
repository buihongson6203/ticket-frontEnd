<template>
    <SidebarAdmin />
    <section id="content">
        <NavbarAdmin />
        <main>
            <div class="head-title">
                <div class="left">
                    <h1>Event Manage</h1>
                </div>
            </div>
            <div class="table-data">
                <div class="order">
                    <div class="head">
                        <h3>Event Manage</h3>
                        <router-link class="btn-create" to="/admin/create_product">Create</router-link>
                    </div>
                    <form @submit.prevent="onSearchClick">
                        <div class="form-input">
                            <input type="search" placeholder="Search..." v-model="searchKeyword">
                            <button type="submit" class="search-btn"><i class='fa fa-search'></i></button>
                        </div>
                    </form>
                    <table>
                        <thead>
                            <tr class="header-text">
                                <th>ID</th>
                                <th>Title</th>
                                <th>Image</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>Total Tickets</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="event in eventData" :key="event.id" style="text-align: center;">
                                <td>{{ event.id }}</td>
                                <td>{{ event.title }}</td>
                                <td>
                                    <img class="img-manage" :src="`${baseApiUrl}${event.image}`"
                                        style="width:90px; height: 60px; border-radius: 0;">
                                </td>
                                <td>{{ event.price }}</td>
                                <td>{{ event.description }}</td>
                                <td>{{ event.category.name }}</td>
                                <td>{{ event.amountTicket }}</td>
                                <td>
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        <button type="button" class="btn-update"
                                            @click="openUpdateModal(event)">Update</button>
                                        <button type="button" class="btn-delete"
                                            @click="onDeleteClick(event)">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="pagination_section" style="margin-top: 30px;">
                        <a href="#" style="font-weight: bold;" @click="previousPage">
                            << Previous</a>
                                <div class="a-number" v-for="page in Math.ceil(totalItems / pageSize)" :key="page">
                                    <a href="#" title="Algorithm" @click="changePage(page)">
                                        {{ page }}
                                    </a>
                                </div>
                                <a href="#" style="font-weight: bold;" @click="nextPage">Next >></a>
                    </div>
                </div>
            </div>
        </main>

        <!-- Modal for Update Event -->
        <div v-if="showUpdateModal" class="modal">
            <div class="modal-content">
                <span class="close" @click="closeUpdateModal">×</span>
                <h2>Update Event</h2>
                <form @submit.prevent="updateEvent">
                    <label for="title">Event Title <span class="required">*</span></label>
                    <input type="text" id="title" v-model="currentEvent.title" required>

                    <label for="price">Price <span class="required">*</span></label>
                    <input type="number" id="price" v-model="currentEvent.price" required>

                    <label for="amountTicket">Total Tickets <span class="required">*</span></label>
                    <input type="number" id="amountTicket" v-model="currentEvent.amountTicket" required>

                    <label for="startTime">Start Time <span class="required">*</span></label>
                    <input type="datetime-local" id="startTime" v-model="currentEvent.startTime" required>

                    <label for="endTime">End Time <span class="required">*</span></label>
                    <input type="datetime-local" id="endTime" v-model="currentEvent.endTime" required>

                    <label for="status">Status <span class="required">*</span></label>
                    <select id="status" v-model="currentEvent.status" required>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="cancelled">Cancelled</option>
                    </select>

                    <label for="location">Location <span class="required">*</span></label>
                    <input type="text" id="location" v-model="currentEvent.location" required>

                    <label for="description">Description <span class="required">*</span></label>
                    <textarea id="description" v-model="currentEvent.description" required></textarea>

                    <label for="categoryId">Category <span class="required">*</span></label>
                    <select id="categoryId" v-model="currentEvent.categoryId" required>
                        <option disabled value="">Select Category</option>
                        <option v-for="category in categories" :key="category.id" :value="category.id">
                            {{ category.name }}
                        </option>
                    </select>

                    <label for="imageEvent">Image</label>
                    <input type="file" id="imageEvent" @change="onFileChange">

                    <button type="submit" class="save-modal">Save</button>
                </form>
            </div>
        </div>
    </section>
</template>
<script>
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import SidebarAdmin from './SidebarAdmin.vue';
import NavbarAdmin from './NavbarAdmin.vue';

export default {
    name: 'EventManage',
    components: {
        SidebarAdmin, NavbarAdmin
    },
    data() {
        return {
            baseApiUrl: process.env.VUE_APP_BASE_API_URL || "http://localhost:3000",
            eventData: [],
            searchKeyword: '',
            pageSize: 3,
            currentPage: 1,
            totalPages: 0,
            totalItems: 0,
            showUpdateModal: false,
            currentEvent: {
                id: null,
                title: "",
                image: null,
                price: "",
                amountTicket: "",
                startTime: "",
                endTime: "",
                status: "draft",
                location: "",
                description: "",
                categoryId: ""
            },
            categories: []
        }
    },
    setup() {
        const success = () => {
            toast("Success!", {
                autoClose: 1000,
                type: "success"
            });
        }
        return { success };
    },
    methods: {
        loadEventData() {
            const url = `${process.env.VUE_APP_BASE_API_URL}/events`;
            axios.get(url).then((response) => {
                this.totalItems = response.data.data.length;
                this.totalPages = Math.floor(this.totalItems / this.pageSize);
                if (this.totalItems % this.pageSize !== 0) {
                    this.totalPages++;
                }

                let startIndex = (this.currentPage - 1) * this.pageSize;
                let endIndex = this.currentPage * this.pageSize;

                this.eventData = response.data.data.slice(startIndex, endIndex).map(event => {
                    const category = this.categories.find(cat => cat.id === event.categoryId);
                    return {
                        ...event,
                        category: category ? { name: category.name } : { name: 'Unknown' }
                    };
                });
            }).catch((error) => {
                console.log(error.response);
            });
        },
        loadCategories() {
            const url = `${process.env.VUE_APP_BASE_API_URL}/categories`;
            return axios.get(url, {
                headers: {
                    'accept': '*/*'
                }
            }).then((response) => {
                this.categories = response.data; // Assuming response.data is an array of categories
                console.log("Categories loaded:", this.categories); // For debugging
            }).catch((error) => {
                console.error("Error loading categories:", error.response);
            });
        },
        onSearchClick() {
            if (this.searchKeyword.trim() === '') {
                this.loadEventData();
            } else {
                const url = `${process.env.VUE_APP_BASE_API_URL}/events`;
                const requestData = {
                    filterParams: [
                        {
                            colName: "title",
                            _operator: "like",
                            value: this.searchKeyword
                        }
                    ]
                };

                axios.post(url, requestData)
                    .then(response => {
                        this.eventData = response.data;
                        this.totalItems = this.eventData.length;
                        this.totalPages = Math.floor(this.totalItems / this.pageSize);
                        if (this.totalItems % this.pageSize !== 0) {
                            this.totalPages++;
                        }
                        this.currentPage = 1;
                    })
                    .catch(error => {
                        console.error('Error during search:', error);
                    });
            }
        },
        changePage(page) {
            this.currentPage = page;
            this.loadEventData();
        },
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.loadEventData();
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.loadEventData();
            }
        },
        openUpdateModal(event) {
            const startTime = event.startTime ? new Date(event.startTime).toISOString().slice(0, 16) : '';
            const endTime = event.endTime ? new Date(event.endTime).toISOString().slice(0, 16) : '';

            this.currentEvent = {
                id: event.id,
                title: event.title,
                image: event.image,
                price: event.price,
                amountTicket: event.amountTicket,
                startTime: startTime,
                endTime: endTime,
                status: event.status || 'draft',
                location: event.location,
                description: event.description,
                categoryId: event.categoryId
            };
            this.showUpdateModal = true;
        },
        closeUpdateModal() {
            this.showUpdateModal = false;
            this.currentEvent = {
                id: null,
                title: "",
                image: null,
                price: "",
                amountTicket: "",
                startTime: "",
                endTime: "",
                status: "draft",
                location: "",
                description: "",
                categoryId: ""
            };
        },
        async updateEvent() {
            try {
                const formData = new FormData();
                formData.append('title', this.currentEvent.title);
                formData.append('price', this.currentEvent.price);
                formData.append('amountTicket', this.currentEvent.amountTicket);
                formData.append('startTime', new Date(this.currentEvent.startTime).getTime());
                formData.append('endTime', new Date(this.currentEvent.endTime).getTime());
                formData.append('status', this.currentEvent.status);
                formData.append('location', this.currentEvent.location);
                formData.append('description', this.currentEvent.description);
                formData.append('categoryId', this.currentEvent.categoryId);
                if (this.currentEvent.image && typeof this.currentEvent.image === 'object') {
                    formData.append('file', this.currentEvent.image);
                }

                const url = `${process.env.VUE_APP_BASE_API_URL}/events/${this.currentEvent.id}`;
                await axios.put(url, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'accept': '*/*'
                    }
                });

                this.showUpdateModal = false;
                this.success();
                this.loadEventData();
            } catch (error) {
                console.error('Error updating event:', error);
                toast.error("Error updating event. Please try again later.");
            }
        },
        onFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.currentEvent.image = file;
            }
        },
        onDeleteClick(event) {
            if (confirm("Are you sure you want to delete this event?")) {
                const url = `${process.env.VUE_APP_BASE_API_URL}/events/${event.id}`;
                axios.delete(url)
                    .then(() => {
                        this.loadEventData();
                        this.success();
                    })
                    .catch(error => {
                        console.error("Error deleting event:", error);
                        toast.error("Error deleting event. Please try again later.");
                    });
            }
        }
    },
    mounted() {
        this.loadCategories().then(() => {
            this.loadEventData();
        });
    }
}
</script>
<style scoped>
@import '@/assets/style.css';
@import '@/assets/pagination.css';

/* Ensure modal is visible */
.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1000;
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
.modal-content textarea,
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