<template>
    <SidebarAdmin />
    <!-- CONTENT -->
    <section id="content">
        <NavbarAdmin />

        <!-- MAIN -->
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
                    <form>
                        <ul class="form-style-1">
                            <li>
                                <label>Product Event <span class="required">*</span></label>
                                <input type="text" name="field1" class="field-long" placeholder="Product Name"
                                    v-model="currentProduct.title" />
                            </li>
                            <li>
                                <label>Image <span class="required">*</span></label>
                                <input type="file" class="field-long" id="imageProduct" placeholder="First"
                                    @change="onFileChange" />
                            </li>
                            <li>
                                <label>Price <span class="required">*</span></label>
                                <input type="text" name="" class="field-long" placeholder="Price"
                                    v-model="currentProduct.price" />
                            </li>
                            <li>
                                <label>Location <span class="required">*</span></label>
                                <input type="text" name="location" class="field-long" placeholder="Location"
                                    v-model="currentProduct.location" />
                            </li>
                            <li>
                                <label>Start Time <span class="required">*</span></label>
                                <input type="text" name="startTime" class="field-long" placeholder="Start Time"
                                    v-model="currentProduct.startTime" />
                            </li>

                            <li>
                                <label>End Time <span class="required">*</span></label>
                                <input type="text" name="endTime" class="field-long" placeholder="End Time"
                                    v-model="currentProduct.endTime" />
                            </li>
                            <li>
                                <label>Description <span class="required">*</span></label>
                                    <textarea name="field5" id="field5" class="field-long field-textarea" v-model="currentProduct.description"></textarea>
                            </li>
                            <li>
                                <label>Total Tickets <span class="required">*</span></label>
                                <input type="text" name="" class="field-long" placeholder="Total Tickets"
                                    v-model="currentProduct.totalTickets" />
                            </li>
                            <li>
                                <label>Category</label>
                                <select v-model="currentProduct.categoryId" name="field4" class="field-select">
                                    <option disabled value="" selected>Select Category</option>
                                    <option v-for="category in categories" :key="category.id" :value="category.id">{{
                                        category.name }}</option>
                                </select>
                            </li>
                            <li>
                            </li>
                        </ul>
                    </form>
                    <button type="button" class="button-submit-product" @click="onCreateClick()">Submit</button>
                </div>
            </div>
        </main>
        <!-- MAIN -->
    </section>
    <!-- CONTENT -->
</template>

<script>
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import router from '../../router.js';

import SidebarAdmin from './SidebarAdmin.vue';
import NavbarAdmin from './NavbarAdmin.vue';

export default {
    name: '',
    components: {
        SidebarAdmin, NavbarAdmin
    },
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
                startTime: '',
                endTime: '',
                status: '',
                location: '',
                categoryId:''
            },
            categories: []
        }
    },
    setup() {
        const success = () => {
            toast("Success !", {
                autoClose: 1000,
                type: "success"
            });
        }
        return { success };
    },
    methods: {
        getCategories() {
            var url = process.env.VUE_APP_BASE_API_URL + `/categories`;
            axios.get(url).then((response) => {
                this.categories = response.data;
            }).catch((error) => {
                console.log(error.response);
            })
        },
        onFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                // Kiểm tra phần mở rộng của file
                const validExtensions = ['.png', '.jpg', '.jpeg'];
                const fileName = file.name;
                const fileExtension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();

                if (!validExtensions.includes(fileExtension)) {
                    alert('Vui lòng chọn một file ảnh có định dạng .png, .jpg hoặc .jpeg!');
                    return;
                }

                const formData = new FormData();
                formData.append('image', file);

                this.currentProduct.file = file

                // Gọi API để upload ảnh
                // axios.post(process.env.VUE_APP_BASE_API_URL + '/Products/UploadImage', formData, {
                //     headers: {
                //         'Content-Type': 'multipart/form-data',
                //     },
                // })
                //     .then(response => {
                //         // Lưu URL ảnh trả về từ API vào currentProduct.imageProduct
                //         this.currentProduct.imageProduct = response.data.imageUrl;
                //         console.log(this.currentProduct.imageProduct);
                //     })
                //     .catch(error => {
                //         console.log('Error uploading image:', error);
                //     });
            }
        },
        onCreateClick() {
            if (!this.currentProduct.title || !this.currentProduct.price || !this.currentProduct.description || !this.currentProduct.totalTickets || !this.currentProduct.categoryId) {
                alert('Please fill all required fields!');
                return;
            }


            const formData = new FormData();
            formData.append('file', this.currentProduct.file);
            formData.append('title', this.currentProduct.title)
            formData.append('description', this.currentProduct.description)
            formData.append('location', this.currentProduct.location)
            formData.append('startTime', this.currentProduct.startTime)
            formData.append('endTime', this.currentProduct.endTime)

            formData.append('totalTickets', +this.currentProduct.totalTickets)

            formData.append('price', this.currentProduct.price)
            formData.append('status', 'draft')
            formData.append('categoryId', this.currentProduct.categoryId)


            axios.post(process.env.VUE_APP_BASE_API_URL + '/events', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                    .then(response => {

                        console.log({response});
                        // Lưu URL ảnh trả về từ API vào currentProduct.imageProduct
                        // this.currentProduct.imageProduct = response.data.imageUrl;
                        // console.log(this.currentProduct.imageProduct);
                        router.push({ name: 'ProductManageView' });
                    })
                    .catch(error => {
                        console.log('Error uploading image:', error);
                    });

            
            // var url = process.env.VUE_APP_BASE_API_URL + `/events`
            
            // axios.post(url, this.currentProduct).then((respone) => {
            //     console.log(respone.data);
            //     router.push({ name: 'ProductManageView' });
            // }).catch((error) => {
            //     console.log(error)
            // })
        }
    },
    mounted() {
        this.getCategories();
        import('../../assets/script')
    }
}
</script>
<style scoped>
@import '@/assets/forminput.css';
@import '@/assets/style.css';
</style>