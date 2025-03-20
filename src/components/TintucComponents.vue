<template>
    <div>
      <!-- Component Header -->
      <HeaderComponents />
  
      <!-- Phần Carousel (Slider) -->
      <!-- Container sử dụng class "container" giống như trên trang ticketgo.vn/blog -->
      <div class="carousel-container container">
        <!-- Sử dụng các class của Owl Carousel để tạo giao diện giống -->
        <div
          class="slideshows-news owl-carousel owl-theme owl-loaded owl-drag carousel"
          :style="{
            transform: `translateX(${-currentIndex * (itemWidth + gap) + dragOffset}px)`,
            transition: transitioning ? 'transform 0.5s ease-in-out' : 'none'
          }"
          @mousedown="startDrag"
          @mousemove="onDrag"
          @mouseup="endDrag"
          @mouseleave="endDrag"
          @touchstart="startDrag"
          @touchmove="onDrag"
          @touchend="endDrag"
          @transitionend="handleTransitionEnd"
        >
          <!-- Lặp qua mảng carouselItems, mảng này bao gồm clone của phần tử cuối vào đầu và phần tử đầu vào cuối -->
          <div class="carousel-item" v-for="(item, index) in carouselItems" :key="index">
            <img :src="item.src" :alt="item.alt" />
            <p class="caption">{{ item.caption }}</p>
          </div>
        </div>
        <!-- Indicators hiển thị bên dưới slider -->
        <div class="indicators">
          <!-- Sử dụng mảng items gốc để hiển thị indicator. Khi nhấp, chuyển đến slide tương ứng. -->
          <span
            class="indicator"
            :class="{ active: realIndex === index }"
            v-for="(item, index) in items"
            :key="index"
            @click="jumpToSlide(index + 1)"
          ></span>
        </div>
      </div>
  
      <!-- Phần Nội Dung Chính (Ví dụ) -->
      <div class="bg-white text-gray-800">
        <div class="container mx-auto px-4 py-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Phần Hội Chợ & Triển Lãm -->
            <div class="card">
              <h2 class="text-xl font-bold text-orange-600 mb-4">
                HỘI CHỢ &amp; TRIỂN LÃM
              </h2>
              <img
                alt="Colorful illustration of people dancing and celebrating with text 'Liên kết đào tạo Việt Nam - Hoa Kỳ'"
                class="w-full mb-4 rounded-lg shadow-lg"
                height="300"
                src="https://storage.googleapis.com/a1aa/image/XnB6xyHCXu26Hy5sQKZeCPx24NIc5wXlOn0rEgTTUrs.jpg"
                width="600"
              />
              <!-- Sử dụng class feature-text để tăng kích thước chữ và đứng dòng riêng -->
              <a href="#" class="feature-text clickable-text">
                Triển lãm các Chương trình Liên kết Đào tạo Việt Nam - Hoa Kỳ 2025.
              </a>
              <div class="mb-4">
                <!-- Mỗi dòng có ảnh nhỏ và link mô tả -->
                <div class="flex items-start mb-2">
                  <img
                    alt="Exhibition poster with text 'Triển lãm Mê man'"
                    class="w-24 h-16 mr-4 rounded-lg object-cover"
                    height="60"
                    src="https://storage.googleapis.com/a1aa/image/P8BzlfhIwTb4J0t_BfuU9wBFEHB8Xg9mVYgTPzuv09Q.jpg"
                    width="100"
                  />
                  <a href="#" class="clickable-text">
                    Triển lãm Mê man
                  </a>
                </div>
                <div class="flex items-start mb-2">
                  <img
                    alt="Exhibition poster with text 'The world as a draft'"
                    class="w-24 h-16 mr-4 rounded-lg object-cover"
                    height="60"
                    src="https://storage.googleapis.com/a1aa/image/d6dfhZLl5f17BYCOwWUKnKmRs5IcaAP3hlcvhyf3P08.jpg"
                    width="100"
                  />
                  <a href="#" class="clickable-text">
                    Triển lãm THẾ GIỚI NHƯ LÀ BẢN NHÁP - Đỗ Thanh Lãng &amp; Nguyễn Đức Đạt
                  </a>
                </div>
                <div class="flex items-start mb-2">
                  <img
                    alt="Exhibition poster with text 'Retro Rewind'"
                    class="w-24 h-16 mr-4 rounded-lg object-cover"
                    height="60"
                    src="https://storage.googleapis.com/a1aa/image/UZ1IteGN_Vb0N2T8LEYVkro2cAWQEZLC8bNOcMSA8W8.jpg"
                    width="100"
                  />
                  <a href="#" class="clickable-text">
                    Hội chợ rong chơi vol 13: Retro Rewind
                  </a>
                </div>
                <div class="flex items-start mb-2">
                  <img
                    alt="Exhibition poster with text 'Xuân an lành - Chơi vui khỏe'"
                    class="w-24 h-16 mr-4 rounded-lg object-cover"
                    height="60"
                    src="https://i.ex-cdn.com/vntravellive.com/files/news/2019/05/02/the-gioi-den-long-ruc-ro-o-hoi-an-161742.jpg"
                    width="100"
                  />
                  <a href="#" class="clickable-text">
                    Hội chợ 2025: Xuân an lành - Chơi vui khỏe
                  </a>
                </div>
              </div>
              <a class="text-blue-600 hover:underline" href="#">
                Xem thêm
              </a>
            </div>
            <!-- Phần Âm Nhạc - Music Shows -->
            <div class="card">
              <h2 class="text-xl font-bold text-orange-600 mb-4">
                ÂM NHẠC - MUSIC SHOWS
              </h2>
              <img
                alt="Poster of a music show with a woman in a red dress and text 'HLALAH Xóm Nhạc'"
                class="w-full mb-4 rounded-lg shadow-lg"
                height="300"
                src="https://storage.googleapis.com/a1aa/image/H5yubsxsakUQfs5o7OeyT92QkbhSOP90BFHw__NnjnA.jpg"
                width="600"
              />
              <a href="#" class="feature-text clickable-text">
                Đêm nhạc Halah - Xóm Nhạc - Ngày 20.03.2025
              </a>
              <div class="mb-4">
                <div class="flex items-start mb-2">
                  <img
                    alt="Concert poster with text 'Rock Trống Taiko'"
                    class="w-24 h-16 mr-4 rounded-lg object-cover"
                    height="60"
                    src="https://file3.qdnd.vn/data/images/0/2022/10/24/vuhuyen/nhac-vien.jpg?dpi=150&quality=100&w=870"
                    width="100"
                  />
                  <a href="#" class="clickable-text">
                    Hòa nhạc Rock Trống Taiko đến từ Nhật Bản cùng BATI-HOLIC tại Hà Nội và Hồ Chí Minh 2025
                  </a>
                </div>
                <div class="flex items-start mb-2">
                  <img
                    alt="Concert poster with text 'MÙA XUÂN ĐẦU TIÊN'"
                    class="w-24 h-16 mr-4 rounded-lg object-cover"
                    height="60"
                    src="https://storage.googleapis.com/a1aa/image/94Urb7UifENDYEK1zDDcfy7Ca7uMnjCcb4vuveA8x-0.jpg"
                    width="100"
                  />
                  <a href="#" class="clickable-text">
                    Salon Âm nhạc thính phòng tháng 3.2025 Chủ đề: MÙA XUÂN ĐẦU TIÊN
                  </a>
                </div>
                <div class="flex items-start mb-2">
                  <img
                    alt="Concert poster with text 'Linkin Park Cover Show'"
                    class="w-24 h-16 mr-4 rounded-lg object-cover"
                    height="60"
                    src="https://storage.googleapis.com/a1aa/image/PdhAmQ3NFJAQ0sd7_ysX6-uNhNUl6UZdbVfxhCiqI2g.jpg"
                    width="100"
                  />
                  <a href="#" class="clickable-text">
                    Đêm nhạc Linkin Park Cover Show - A place for our heads
                  </a>
                </div>
                <div class="flex items-start mb-2">
                  <img
                    alt="Concert poster with text 'Women of Rock'"
                    class="w-24 h-16 mr-4 rounded-lg object-cover"
                    height="60"
                    src="https://wallpapercave.com/wp/wp9264044.jpg"
                    width="100"
                  />
                  <a href="#" class="clickable-text">
                    Women of Rock - Đêm nhạc tôn vinh những nữ rocker huyền thoại | Avril Lavigne - Paramore - The Pretty Reckless
                  </a>
                </div>
              </div>
              <a class="text-blue-600 hover:underline" href="#">
                Xem thêm
              </a>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Component Footer -->
      <FooterComponents />
    </div>
  </template>
  
  <script>
  // Import các component Header và Footer
  import HeaderComponents from './HeaderComponents'
  import FooterComponents from './FooterComponents'
  
  export default {
    name: "TintucComponents",
    components: {
      HeaderComponents,
      FooterComponents
    },
    data() {
      return {
        // Mảng gốc các item carousel
        items: [
          {
            src: 'https://placehold.co/400x300?text=Item+1',
            alt: 'Poster cho Item 1',
            caption: 'Item 1'
          },
          {
            src: 'https://placehold.co/400x300?text=Item+2',
            alt: 'Poster cho Item 2',
            caption: 'Item 2'
          },
          {
            src: 'https://placehold.co/400x300?text=Item+3',
            alt: 'Poster cho Item 3',
            caption: 'Item 3'
          },
          {
            src: 'https://placehold.co/400x300?text=Item+4',
            alt: 'Poster cho Item 4',
            caption: 'Item 4'
          },
          {
            src: 'https://placehold.co/400x300?text=Item+5',
            alt: 'Poster cho Item 5',
            caption: 'Item 5'
          }
        ],
        // Khởi tạo currentIndex bằng 1 vì phần tử đầu tiên trong carouselItems là phần tử thật (với clone ở đầu)
        currentIndex: 1,
        gap: 20,
        itemWidth: 300,
        dragOffset: 0,
        dragging: false,
        autoSlideInterval: null,
        transitioning: true
      }
    },
    computed: {
      // Tạo mảng carouselItems bằng cách clone phần tử cuối vào đầu và phần tử đầu vào cuối
      carouselItems() {
        const items = this.items;
        if (items.length > 0) {
          return [items[items.length - 1], ...items, items[0]];
        }
        return [];
      },
      // Tính chỉ số thật của slide (không tính clone)
      realIndex() {
        let index = this.currentIndex - 1;
        if (index < 0) index = this.items.length - 1;
        if (index >= this.items.length) index = 0;
        return index;
      }
    },
    methods: {
      // Chuyển đến slide theo index
      showSlide(index) {
        this.transitioning = true;
        this.currentIndex = index;
      },
      // Chuyển sang slide tiếp theo
      nextSlide() {
        this.transitioning = true;
        this.currentIndex++;
      },
      // Chuyển sang slide trước đó
      prevSlide() {
        this.transitioning = true;
        this.currentIndex--;
      },
      // Xử lý sự kiện kéo (drag) bắt đầu
      startDrag(e) {
        this.dragging = true;
        this.dragStartX = e.clientX || e.touches[0].clientX;
      },
      // Xử lý khi đang kéo
      onDrag(e) {
        if (!this.dragging) return;
        const currentX = e.clientX || e.touches[0].clientX;
        this.dragOffset = currentX - this.dragStartX;
      },
      // Xử lý khi kết thúc kéo
      endDrag() {
        if (!this.dragging) return;
        if (this.dragOffset > 50) {
          this.prevSlide();
        } else if (this.dragOffset < -50) {
          this.nextSlide();
        }
        this.dragging = false;
        this.dragOffset = 0;
      },
      // Xử lý khi transition kết thúc
      handleTransitionEnd() {
        this.transitioning = false;
        // Nếu currentIndex là 0 (clone của phần tử cuối), reset về phần tử cuối thật
        if (this.currentIndex === 0) {
          this.currentIndex = this.items.length;
        }
        // Nếu currentIndex là items.length + 1 (clone của phần tử đầu), reset về phần tử đầu thật
        if (this.currentIndex === this.items.length + 1) {
          this.currentIndex = 1;
        }
        // Ép reflow để reset transition
        void this.$el.offsetWidth;
        this.transitioning = true;
      },
      // Hàm tự động chuyển slide
      startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
          this.nextSlide();
        }, 3000);
      },
      // Dừng tự động chuyển slide
      stopAutoSlide() {
        clearInterval(this.autoSlideInterval);
        this.autoSlideInterval = null;
      },
      // Nhảy trực tiếp đến slide khi nhấn vào indicator
      jumpToSlide(index) {
        this.showSlide(index);
      }
    },
    mounted() {
      this.startAutoSlide();
    },
    beforeDestroy() {
      this.stopAutoSlide();
    }
  }
  </script>
  
  <style scoped>
  /* Reset & cơ bản */
  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    background-color: #f8f9fa;
    color: #333;
  }
  
  /* Container chung */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  /* Style cho Carousel Container */
  .carousel-container {
    position: relative;
    overflow: hidden;
    margin: 0 auto 40px;
    max-width: 100%;
    cursor: grab;
    user-select: none;
  }
  
  /* Style cho Carousel (sử dụng các class của Owl Carousel) */
  .carousel {
    display: flex;
    transition: transform 0.5s ease-in-out;
    will-change: transform;
  }
  
  /* Style cho từng Carousel Item */
  .carousel-item {
    min-width: 300px;
    margin-right: 20px;
  }
  .carousel-item img {
    width: 100%;
    height: auto;
  }
  .caption {
    text-align: center;
    color: #2d3748;
    margin-top: 0.5rem;
  }
  
  /* Style cho Indicators */
  .indicators {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .indicator {
    width: 10px;
    height: 10px;
    background-color: #cbd5e0;
    border-radius: 50%;
    margin: 0 5px;
    cursor: pointer;
  }
  .indicator.active {
    background-color: #2d3748;
  }
  
  /* Style cho Grid (nội dung phía dưới slider) */
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }
  
  /* Style cho Card */
  .card {
    background: #fff;
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
  }
  .card:hover {
    transform: translateY(-5px);
  }
  .card img {
    width: 100%;
    border-radius: 8px;
  }
  
  /* Style cho các link (clickable-text) */
  .clickable-text {
    font-size: 1.125em;
    margin-bottom: 10px;
    color: inherit;
    text-decoration: none;
    transition: color 0.2s ease-in-out;
    display: block;
    font-weight: bold;
  }
  .clickable-text:hover {
    color: #0056b3;
    text-decoration: underline;
  }
  
  /* Style cho Feature Text (tăng kích thước chữ và đứng dòng riêng) */
  .feature-text {
    font-size: 1.25em;
    margin-top: 10px;
    margin-bottom: 20px;
    display: block;
    font-weight: bold;
  }
  
  /* Style cho Flex (ảnh nhỏ và text bên cạnh) */
  .flex {
    display: flex;
    align-items: flex-start;
    margin-bottom: 12px;
  }
  .flex img {
    width: 100px;
    height: 60px;
    border-radius: 6px;
    margin-right: 12px;
    object-fit: cover;
  }
  
  /* Style cho link "Xem thêm" */
  a.text-blue-600 {
    font-weight: bold;
    color: #007bff;
    text-decoration: none;
    transition: color 0.2s ease-in-out;
  }
  a.text-blue-600:hover {
    color: #0056b3;
    text-decoration: underline;
  }
  </style>
  