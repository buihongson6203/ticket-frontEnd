<template>
  <div v-if="isOpen" class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <button class="close-btn" @click="close">×</button>
      <h2>Thanh Toán Vé</h2>

      <div class="customer-info">
        <h3>THÔNG TIN KHÁCH HÀNG / CUSTOMER INFORMATION</h3>
        <input type="text" v-model="customer.name" placeholder="Họ tên / Fullname" />
        <input type="email" v-model="customer.email" placeholder="Email" />
        <input type="text" v-model="customer.address" placeholder="Địa chỉ / Address" />
      </div>

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

      <div class="total">
        <h3>Tổng cộng / Total: {{ totalPriceFormatted }} VND</h3>
      </div>

      <div class="confirm">
        <label>
          <input type="checkbox" v-model="agreeTerms" />
          Tôi đồng ý với các <a href="#">Điều khoản & Chính sách</a> của TicketProject
        </label>
        <button :disabled="!agreeTerms" @click="processPayment" class="confirm-btn">
          Tiếp tục thanh toán
        </button>
      </div>

      <div v-if="qrCodeUrl" class="qr-code">
        <h3>Mã QR Thanh Toán</h3>
        <img :src="qrCodeUrl" alt="QR Code" />
        <button @click="completePayment" class="complete-btn">
          Tôi đã hoàn tất thanh toán
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import toastr from 'toastr'; // 直接导入 toastr
import 'toastr/build/toastr.min.css'; // 导入 CSS

export default {
  name: 'PaymentModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    eventId: {
      type: Number,
      default: 2
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
      qrCodeUrl: null,
      isLoading: false
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
        toastr.error('Không thể tải danh sách vé: ' + (error.response?.data?.message || error.message));
      }
    },
    formatPrice(price) {
      return parseFloat(price).toLocaleString('vi-VN');
    },
    increaseQuantity(ticket) {
      if (ticket.quantitySelected < ticket.maxPerOrder && ticket.quantitySelected < ticket.quantity) {
        ticket.quantitySelected++;
      } else {
        toastr.warning(`Số lượng tối đa cho ${ticket.name} là ${ticket.maxPerOrder}`);
      }
    },
    decreaseQuantity(ticket) {
      if (ticket.quantitySelected > 0) {
        ticket.quantitySelected--;
      }
    },
    async processPayment() {
      if (!this.agreeTerms) {
        toastr.warning('Vui lòng đồng ý với điều khoản và chính sách');
        return;
      }

      if (!this.customer.email || !this.customer.name) {
        toastr.warning('Vui lòng điền đầy đủ họ tên và email');
        return;
      }

      const paymentData = {
        customer: this.customer,
        paymentMethod: this.selectedPayment,
        tickets: this.ticketTypes.filter(ticket => ticket.quantitySelected > 0),
        total: this.totalPrice
      };

      if (paymentData.tickets.length === 0) {
        toastr.warning('Vui lòng chọn ít nhất một vé');
        return;
      }

      this.isLoading = true;
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
            toastr.success('Tạo mã QR thành công');
          } else {
            toastr.error('Lỗi khi tạo mã QR: ' + response.data.desc);
          }
        } catch (error) {
          toastr.error('Lỗi khi gọi API VietQR: ' + (error.response?.data?.message || error.message));
        }
      } else if (this.selectedPayment === 'tindung') {
        toastr.info('Chức năng thanh toán thẻ tín dụng đang phát triển');
      }
      this.isLoading = false;
    },
    async completePayment() {
      const selectedTickets = this.ticketTypes.filter(ticket => ticket.quantitySelected > 0);

      const formData = new FormData();
      formData.append('email', this.customer.email);
      formData.append('name', this.customer.name);
      formData.append('eventId', this.eventId.toString());
      formData.append('totalPrice', this.totalPrice.toString());
      formData.append('status', 'pending');
      formData.append('orderItems', JSON.stringify(selectedTickets.map(ticket => ({
        ticketTypeId: ticket.id,
        quantity: ticket.quantitySelected,
        price: ticket.price
      }))));

      this.isLoading = true;
      try {
        const response = await axios.post(
          'http://localhost:3000/orders/create-order',
          formData,
          {
            headers: {
              'accept': '*/*',
              'Content-Type': 'multipart/form-data'
            }
          }
        );

        if (response.status === 201 || response.status === 200) {
          toastr.success('Đặt vé thành công! Vui lòng chờ admin phê duyệt,bạn sẽ nhận được email sau khi phê duyệt');
          this.close();
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        if (error.response?.data?.errors) {
          error.response.data.errors.forEach(err => {
            toastr.error(err.message || err);
          });
        } else {
          toastr.error('Lỗi khi tạo đơn hàng: ' + errorMessage);
        }
      }
      this.isLoading = false;
    },
    close() {
      this.qrCodeUrl = null;
      this.customer = { name: '', phone: '', email: '', address: '', date: '' };
      this.agreeTerms = false;
      this.ticketTypes.forEach(ticket => ticket.quantitySelected = 0);
      this.$emit('close');
    }
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.fetchEventTickets();
      }
    },
    eventId(newEventId) {
      if (this.isOpen) {
        this.fetchEventTickets();
      }
    }
  },
  mounted() {
    if (this.isOpen) {
      this.fetchEventTickets();
    }
    // Cấu hình toastr
    toastr.options = {
      positionClass: 'toast-top-right',
      timeOut: 5000,
      closeButton: true,
      progressBar: true
    };
  }
};
</script>
<style scoped>
@import "../../assets/modal/thanhtoan.css";

/* .complete-btn {
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.complete-btn:hover {
  background-color: #218838;
} */
</style>