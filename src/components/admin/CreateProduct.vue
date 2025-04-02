<template>
    <SidebarAdmin />
    <section id="content">
        <NavbarAdmin />
        <main>
            <div class="head-title">
                <div class="left">
                    <h1>Create Product</h1>
                    <ul class="breadcrumb">
                        <li>/</li>
                        <li>
                            <router-link class="active" to="/admin/productmanage">Back to manage</router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="table-data">
                <div class="order">
                    <div class="head">
                        <h3>Create Event</h3>
                    </div>
                    <form @submit.prevent="onCreateClick">
                        <ul class="form-style-1">
                            <li>
                                <label>Product Event <span class="required">*</span></label>
                                <input type="text" class="field-long" placeholder="Product Name"
                                    v-model="currentProduct.title" />
                            </li>
                            <li>
                                <label>Image <span class="required">*</span></label>
                                <input type="file" class="field-long" @change="onFileChange"
                                    accept="image/png, image/jpeg" />
                            </li>
                            <li>
                                <label>Price <span class="required">*</span></label>
                                <input type="number" class="field-long" placeholder="Price"
                                    v-model="currentProduct.price" />
                            </li>
                            <li>
                                <label>Location <span class="required">*</span></label>
                                <input type="text" class="field-long" placeholder="Location"
                                    v-model="currentProduct.location" />
                            </li>
                            <li>
                                <label>Start Time <span class="required">*</span></label>
                                <VueDatePicker v-model="currentProduct.startTime" :enable-time-picker="true"
                                    format="yyyy-MM-dd HH:mm" />
                            </li>
                            <li>
                                <label>End Time <span class="required">*</span></label>
                                <VueDatePicker v-model="currentProduct.endTime" :enable-time-picker="true"
                                    format="yyyy-MM-dd HH:mm" />
                            </li>
                            <li>
                                <label>Description <span class="required">*</span></label>
                                <textarea class="field-long field-textarea"
                                    v-model="currentProduct.description"></textarea>
                            </li>
                            <li>
                                <label>Total Tickets <span class="required">*</span></label>
                                <input type="number" class="field-long" placeholder="Total Tickets"
                                    v-model="currentProduct.totalTickets" />
                            </li>
                            <li>
                                <label>Category</label>
                                <select v-model="currentProduct.categoryId" class="field-select">
                                    <option disabled value="">Select Category</option>
                                    <option v-for="category in categories" :key="category.id" :value="category.id">
                                        {{ category.name }}
                                    </option>
                                </select>
                            </li>
                        </ul>
                        <button type="submit" class="button-submit-product">Submit</button>
                    </form>
                </div>
            </div>
        </main>
    </section>
</template>

<script>
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import router from '../../router.js';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import SidebarAdmin from './SidebarAdmin.vue';
import NavbarAdmin from './NavbarAdmin.vue';

export default {
    components: { SidebarAdmin, NavbarAdmin, VueDatePicker },
    data() {
        return {
            currentProduct: {
                title: "",
                image: null,
                price: "",
                description: "",
                totalTickets: "",
                categoryId: "",
                file: null,
                startTime: null,
                endTime: null,
                status: '',
                location: '',
            },
            categories: []
        }
    },
    methods: {
        async getCategories() {
            try {
                const response = await axios.get(`${process.env.VUE_APP_BASE_API_URL}/categories`);
                this.categories = response.data;
            } catch (error) {
                console.error(error.response);
            }
        },
        onFileChange(event) {
            const file = event.target.files[0];
            if (!file) return;
            const validExtensions = ['.png', '.jpg', '.jpeg'];
            const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
            if (!validExtensions.includes(fileExtension)) {
                alert('Please select an image file (.png, .jpg, .jpeg)!');
                return;
            }
            this.currentProduct.file = file;
        },
        onCreateClick() {
            if (!this.currentProduct.title || !this.currentProduct.price || !this.currentProduct.description ||
                !this.currentProduct.totalTickets || !this.currentProduct.categoryId || !this.currentProduct.startTime || !this.currentProduct.endTime) {
                alert('Please fill all required fields!');
                return;
            }

            const formData = new FormData();
            formData.append('file', this.currentProduct.file);
            formData.append('title', this.currentProduct.title);
            formData.append('description', this.currentProduct.description);
            formData.append('location', this.currentProduct.location);
            formData.append('startTime', new Date(this.currentProduct.startTime).getTime()); // Chuyển sang timestamp
            formData.append('endTime', new Date(this.currentProduct.endTime).getTime()); // Chuyển sang timestamp
            formData.append('totalTickets', +this.currentProduct.totalTickets);
            formData.append('price', this.currentProduct.price);
            formData.append('status', 'draft');
            formData.append('categoryId', this.currentProduct.categoryId);

            axios.post(process.env.VUE_APP_BASE_API_URL + '/events', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
                .then(response => {
                    console.log("Success:", response);
                    router.push({ name: 'ProductManageView' });
                })
                .catch(error => {
                    console.log('Error uploading image:', error);
                });
        }
    },
    mounted() {
        this.getCategories();
    }
};
</script>

<style scoped>
@import '@/assets/forminput.css';
@import '@/assets/style.css';
</style>