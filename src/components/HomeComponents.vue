<template>
  <HeaderComponents />
  <div id="app">
    <main class="main">
      <div>
        <img src="https://storage.googleapis.com/a1aa/image/OOcopDQjrvUZ6Ndj5w063h4CoyjpggMAdAG0srV0lHA.jpg"
          alt="Concert banner with artists and event details">
      </div>
      <div class="grid">
        <div>
          <img src="https://storage.googleapis.com/a1aa/image/cvuRQt76yVMoCEJk-Z1vAL-Zsl8PDXSEW2S6xEaozgA.jpg"
            alt="Event poster for Jimmi Nguyễn">
        </div>
        <div>
          <img src="https://storage.googleapis.com/a1aa/image/d2GBci6lH2TIrnmGR5uGFdh6TIPsAiHM0stPCNB0Qrk.jpg"
            alt="Event poster for Benares Heritage">
        </div>
        <div>
          <img src="https://storage.googleapis.com/a1aa/image/t-JhNzI57DTJhD89dc97xuwRzmK3arihU4ZG8M2-QI4.jpg"
            alt="Event poster for Thùy Chi">
        </div>
        <div>
          <img src="https://storage.googleapis.com/a1aa/image/ufRQwVxFfkHRllB894INmgBxnOjJitxXffj5vcAF1a0.jpg"
            alt="Event poster for Phương Linh">
        </div>
        <div>
          <img src="https://storage.googleapis.com/a1aa/image/0sin6BcL4vfdY0C0FEwAA4FkeCv1bIRoUM54Kia1cPY.jpg"
            alt="Event poster for Mini Show">
        </div>
      </div>
    </main>
    <div class="header">
      <h1>CA NHẠC</h1>
      <a href="#">Xem thêm</a>
    </div>
    <div class="grid">
      <div class="card">
        <img src="https://storage.googleapis.com/a1aa/image/6-MSWIUrQzlkcytD5G04XkKpsGLBcEpwFJ_zfPLTOUI.jpg"
          alt="Trung Quân event poster">
        <p>Liveshow TRUNG QUÂN tại Đà Lạt - Ngày 07.03.2025</p>
      </div>
      <div class="card">
        <img src="https://storage.googleapis.com/a1aa/image/ygjNyIRHHM5zToE2Fz_mFzYsFQDVDrRkzR_t_j1P1Bw.jpg"
          alt="Vũ Cát Tường event poster">
        <p>Liveshow VŨ CÁT TƯỜNG tại Đà Lạt - Ngày 26.04.2025</p>
      </div>
      <div class="card">
        <img src="https://storage.googleapis.com/a1aa/image/mVqbD_WrRScISe0qNhu0xFuP9tA1ppfFO7XFcqdafko.jpg"
          alt="Lân Nhã event poster">
        <p>Liveshow LÂN NHÃ - Dù Ta Vẫn Yêu tại Đà Lạt - Ngày 12.04.2025</p>
      </div>
      <div class="card">
        <img src="https://storage.googleapis.com/a1aa/image/Wd6LCtCMvRusw4da3L6Y-Q2c_NY2Q8X1ji-kWvx60i4.jpg"
          alt="Urban Ladies Night event poster">
        <p>URBAN LADIES NIGHT – BỮA TIỆC HOÀNH TRÁNG DÀNH CHO PHÁI ĐẸP</p>
      </div>
      <div class="card">
        <img src="https://storage.googleapis.com/a1aa/image/NnZwPQ7wvrjuAwY3xLFCxcq06-EOv4u_sYC4MeGTsxY.jpg"
          alt="Quang Vinh event poster">
        <p>Minishow QUANG VINH 08-03-2025 | Show mừng ngày quốc tế phụ nữ</p>
      </div>
      <div class="card">
        <img src="https://storage.googleapis.com/a1aa/image/R8fzVXsAUnwl8BmMMJNQk1f4vgvc7uZS9EnQJeddGEg.jpg"
          alt="Hiền Thục event poster">
        <p>Liveshow HIỀN THỤC - LÊ HIẾU tại Đà Lạt - Ngày 22/03/2025</p>
      </div>
      <div class="card">
        <img src="https://storage.googleapis.com/a1aa/image/kYJq7Hl-Cjh98vyJEJuMTm6VWajTdCEBKOQWX2NiXY8.jpg"
          alt="Jimmii Nguyễn event poster">
        <p>Minishow Jimmii Nguyễn 16.03.2025</p>
      </div>
      <div class="card">
        <img src="https://storage.googleapis.com/a1aa/image/3V_2SMiiDnHJIkIZRomf5N1xrPH1V2V8jswAU_o5Ea0.jpg"
          alt="Thùy Chi event poster">
        <p>Minishow THÙY CHI 21-03-2025</p>
      </div>
    </div>
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
@import '@/assets/home.css';
</style>