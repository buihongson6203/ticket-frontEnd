<template>
  <div v-if="isOpen" class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <button class="close-btn" @click="close">×</button>
      <h2>Thanh Toán Vé</h2>

      <!-- Thông tin khách hàng -->
      <div class="customer-info">
        <h3>THÔNG TIN KHÁCH HÀNG / CUSTOMER INFORMATION</h3>
        <input type="text" v-model="customer.name" placeholder="Họ tên / Fullname" />
        <input type="text" v-model="customer.phone" placeholder="Điện thoại / Phone" />
        <input type="email" v-model="customer.email" placeholder="Email" />
        <input type="text" v-model="customer.address" placeholder="Địa chỉ / Address" />
        <input type="date" v-model="customer.date" placeholder="Ngày xem show/sự kiện" />
      </div>

      <!-- Lựa chọn thanh toán -->
      <div class="payment-method">
        <h3>LỰA CHỌN THANH TOÁN / PAYMENT METHOD</h3>
        <label>
          <input type="radio" v-model="selectedPayment" value="vietqr" />
          Chuyển khoản VietQR / Bank transfer VietQR
        </label>
        <label>
          <input type="radio" v-model="selectedPayment" value="tindung" />
          Thanh toán bằng thẻ tín dụng / Credit Cards
        </label>
      </div>

      <!-- Giỏ hàng -->
      <div class="shopping-cart">
        <h3>GIỎ HÀNG CỦA BẠN / SHOPPING CART</h3>
        <div v-for="ticket in ticketTypes" :key="ticket.id" class="cart-item">
          <span>{{ ticket.name }}</span>
          <div class="quantity">
            <button @click="decreaseQuantity(ticket)">-</button>
            <span>{{ ticket.quantitySelected }}</span>
            <button @click="increaseQuantity(ticket)">+</button>
          </div>
          <span>{{ formatPrice(ticket.price) }} VND</span>
        </div>
      </div>

      <!-- Tổng cộng -->
      <div class="total">
        <h3>Tổng cộng / Total: {{ totalPriceFormatted }} VND</h3>
      </div>

      <!-- Xác nhận thanh toán -->
      <div class="confirm">
        <label>
          <input type="checkbox" v-model="agreeTerms" />
          Tôi đồng ý với các <a href="#">Điều khoản & Chính sách</a> của TicketProject
        </label>
        <button :disabled="!agreeTerms" @click="processPayment" class="confirm-btn">
          Tiếp tục thanh toán
        </button>
      </div>

      <!-- Hiển thị mã QR nếu có -->
      <div v-if="qrCodeUrl" class="qr-code">
        <h3>Mã QR Thanh Toán</h3>
        <img :src="qrCodeUrl" alt="QR Code" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PaymentModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    eventId: {
      type: Number,
      default: 1
    }
  },

  data() {
    return {
      customer: {
        name: '',
        phone: '',
        email: '',
        address: '',
        date: ''
      },
      selectedPayment: 'vietqr',
      ticketTypes: [],
      agreeTerms: false,
      qrCodeUrl: null
    };
  },
  computed: {
    totalPrice() {
      return this.ticketTypes.reduce((total, ticket) => {
        return total + (parseFloat(ticket.price) * (ticket.quantitySelected || 0));
      }, 0);
    },
    totalPriceFormatted() {
      return this.totalPrice.toLocaleString('vi-VN');
    }
  },
  methods: {
    generateRandomString(length = 8) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    },
    async fetchEventTickets() {
      try {
        const url = `${process.env.VUE_APP_BASE_API_URL}/events/events-tickets/${this.eventId}`;
        const response = await axios.get(url);

        this.ticketTypes = response.data.ticketTypes.map(ticket => ({
          ...ticket,
          quantitySelected: 0
        }));
      } catch (error) {
        console.error('Error fetching event tickets:', error);
      }
    },
    formatPrice(price) {
      return parseFloat(price).toLocaleString('vi-VN');
    },
    increaseQuantity(ticket) {
      if (ticket.quantitySelected < ticket.maxPerOrder && ticket.quantitySelected < ticket.quantity) {
        ticket.quantitySelected++;
      }
    },
    decreaseQuantity(ticket) {
      if (ticket.quantitySelected > 0) {
        ticket.quantitySelected--;
      }
    },

    async processPayment() {
      if (!this.agreeTerms) return;

      const paymentData = {
        customer: this.customer,
        paymentMethod: this.selectedPayment,
        tickets: this.ticketTypes.filter(ticket => ticket.quantitySelected > 0),
        total: this.totalPrice
      };

      if (this.selectedPayment === 'vietqr') {
        try {
          const response = await axios.post('https://api.vietqr.io/v2/generate', {
            accountNo: "1022465825",
            accountName: "BUI HONG SON",
            acqId: "970436",
            addInfo: this.generateRandomString(),
            amount: this.totalPrice.toString(),
            template: "compact"
          }, {
            headers: {
              'x-client-id': '<CLIENT_ID_HERE>',
              'x-api-key': '<API_KEY_HERE>',
              'Content-Type': 'application/json'
            }
          });

          if (response.data.code === "00") {
            this.qrCodeUrl = response.data.data.qrDataURL;
          } else {
            console.error('Error generating QR code:', response.data.desc);
            alert('Có lỗi khi tạo mã QR. Vui lòng thử lại.');
          }
        } catch (error) {
          console.error('Error calling VietQR API:', error);
          alert('Có lỗi khi gọi API VietQR. Vui lòng thử lại.');
        }
      } else if (this.selectedPayment === 'tindung') {
        console.log('Processing credit card payment:', paymentData);
        // Thêm logic xử lý thanh toán thẻ tín dụng ở đây
      }
    },
    close() {
      this.qrCodeUrl = null; // Reset mã QR khi đóng modal
      this.$emit('close');
    }
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.fetchEventTickets();
      }
    }
  },
  mounted() {
    if (this.isOpen) {
      this.fetchEventTickets();
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  border-radius: 8px;
  width: 80%;
  /* Mở rộng modal hơn để mọi thứ cân đối */
  max-width: 1000px;
  /* Đảm bảo modal không quá rộng */
  padding: 35px;
  /* Tăng padding để nội dung thoáng hơn */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  animation: fadeIn 0.3s ease;
}

.modal-body {
  display: flex;
  gap: 30px;
}


.left-section,
.right-section {
  flex: 1;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.customer-info,
.payment-method,
.shopping-cart,
.total,
.confirm {
  margin-bottom: 20px;
}

.h2 {
  font-size: 22px;
  /* Tăng kích thước để nổi bật hơn */
  font-weight: bold;
  text-align: center;
  /* Căn giữa tiêu đề */
  letter-spacing: 1px;
  /* Làm tiêu đề rõ ràng hơn */
  text-transform: uppercase;
  /* Viết hoa để nổi bật */
}

.h3 {
  font-size: 13px;
  font-weight: bold;
  color: #333;
}

input[type="text"],
input[type="email"],
input[type="date"] {
  display: block;
  width: 100%;
  /* Input full width trong cột */
  margin: 10px 0;
  /* Canh lề đẹp hơn */
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

input[type="radio"] {
  margin-right: 10px;
}

.payment-method label {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  /* Tăng kích thước chữ để dễ đọc hơn */
}

.cart-item {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  /* Cân chỉnh lại bố cục để tránh mất cân đối */
  align-items: center;
  padding: 12px 0;
}

.cart-item input {
  width: 50px;
  text-align: center;
}

.cart-item .quantity {
  display: flex;
  align-items: center;
  gap: 5px;
}

.cart-item .quantity button {
  width: 32px;
  height: 32px;
  background: #ff7f00;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background 0.3s;
}

.cart-item .quantity button:hover {
  background: #d17a00;
}


.confirm-btn {
  background: orange;
  color: #fff;
  border: none;
  padding: 14px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 18px;
  /* Tăng kích thước nút để dễ thao tác hơn */
  display: block;
  width: 100%;
  text-align: center;
  transition: background 0.3s ease;
  /* Thêm hiệu ứng hover */
}


.confirm-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.confirm a {
  color: #007bff;
  text-decoration: none;
}

.confirm a:hover {
  text-decoration: underline;
}

.confirm-btn:hover {
  background: #d17a00;
}

.qr-code {
  text-align: center;
}

.qr-code img {
  max-width: 100%;
  height: auto;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>