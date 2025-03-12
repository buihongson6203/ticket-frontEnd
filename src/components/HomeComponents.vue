<template>
  <HeaderComponents />
  <div class="container">
        <main>
            <section class="banner">
                <img src="https://storage.googleapis.com/a1aa/image/OOcopDQjrvUZ6Ndj5w063h4CoyjpggMAdAG0srV0lHA.jpg" alt="GO - VCHESS 2025">
            </section>
            <section class="events">
                <div class="event-grid">
                    <div class="event-item">
                        <img src="https://storage.googleapis.com/a1aa/image/cvuRQt76yVMoCEJk-Z1vAL-Zsl8PDXSEW2S6xEaozgA.jpg" alt="Benares Heritage">
                    </div>
                    <div class="event-item">
                        <img src="https://storage.googleapis.com/a1aa/image/t-JhNzI57DTJhD89dc97xuwRzmK3arihU4ZG8M2-QI4.jpg" alt="Thùy Chi">
                    </div>
                    <div class="event-item">
                        <img src="https://storage.googleapis.com/a1aa/image/ufRQwVxFfkHRllB894INmgBxnOjJitxXffj5vcAF1a0.jpg" alt="Phương Linh">
                    </div>
                    <div class="event-item">
                        <img src="https://storage.googleapis.com/a1aa/image/0sin6BcL4vfdY0C0FEwAA4FkeCv1bIRoUM54Kia1cPY.jpg" alt="Mini Show">
                    </div>
                </div>
            </section>
        </main>
    </div>
  <FooterComponents/>
</template>
<script>
import FooterComponents from './FooterComponents.vue';
import HeaderComponents from './HeaderComponents.vue';
export default {
  name: "HomePage",
  props: {
    msg: String
  },
  components: {
    HeaderComponents,
    FooterComponents
  },
}
</script>
<style scoped>
@import '../assets/home.css';
</style>