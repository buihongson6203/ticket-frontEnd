<template>
  <div v-if="isOpen" class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <button class="close-btn" @click="close">&times;</button>
      <h2>Thanh Toán Vé</h2>

      <!-- Thông tin khách hàng -->
      <div class="customer-info">
        <h3>THÔNG TIN KHÁCH HÀNG / CUSTOMER INFORMATION</h3>
        <input type="text" placeholder="Họ tên / Fullname" />
        <input type="text" placeholder="Điện thoại / Phone" />
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="Địa chỉ / Address" />
        <input type="date" placeholder="Ngày xem show/sự kiện" />
      </div>

      <!-- Lựa chọn thanh toán -->
      <div class="payment-method">
        <h3>LỰA CHỌN THANH TOÁN / PAYMENT METHOD</h3>
        <label>
          <input type="radio" name="payment" value="vietqr" checked />
          Chuyển khoản VietQR / Bank transfer VietQR
        </label>
        <label>
        <input  type="radio" name="payment" value="tindung" checked />
        Thanh toán bằng thẻ tín dụng / Creadit Cards
      </label>
      </div>

      <!-- Giỏ hàng -->
      <div class="shopping-cart">
        <h3>GIỎ HÀNG CỦA BẠN / SHOPPING CART</h3>
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <span>{{ item.name }}</span>
          <div class="quantity">
            <button @click="decreaseQuantity(item)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="increaseQuantity(item)">+</button>
          </div>
          <span>{{ item.price }} VND</span>
        </div>
      </div>

      <!-- Tổng cộng -->
      <div class="total">
        <h3>Tổng cộng / Total: {{ totalPrice }} VND</h3>
      </div>

      <!-- Xác nhận thanh toán -->
      <div class="confirm">
        <label>
          <input type="checkbox" v-model="agreeTerms" />
          Tôi đồng ý với các <a href="#">Điều khoản & Chính sách</a> của TicketProject
        </label>
        <button :disabled="!agreeTerms" class="confirm-btn">
          Tiếp tục thanh toán
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: Boolean, // Nhận trạng thái mở modal từ component cha
  },
  data() {
    return {
      agreeTerms: false,
      cartItems: [
        { id: 1, name: "Vé Ngày Thứ 2-6 | Khách >140cm", price: 190000, quantity: 0 },
        { id: 2, name: "Vé Ngày Thứ 2-6 | Khách 80-140cm", price: 140000, quantity: 0 },
        { id: 3, name: "Vé Ngày Cuối Tuần | Khách >140cm", price: 250000, quantity: 0 },
        { id: 4, name: "Vé Ngày Cuối Tuần | Khách 80-140cm", price: 280000, quantity: 0 },
      ],
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
  },
  methods: {
    close() {
      this.$emit("close"); // Gửi sự kiện về component cha
    },
    increaseQuantity(item) {
      item.quantity++;
    },
    decreaseQuantity(item) {
      if (item.quantity > 0) item.quantity--;
    },
  },
};
</script>


<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Làm tối nền khi popup mở */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  animation: fadeIn 0.3s ease;
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

h2 {
  font-size: 15px; /* Giảm kích thước tiêu đề chính */
  font-weight: bold;
}
h3 {
  font-size: 15px; /* Giảm kích thước tiêu đề phụ */
  font-weight: bold;
}

input[type="text"],
input[type="email"],
input[type="date"],
label {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

input[type="radio"] {
  margin-right: 10px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0; /* Thêm khoảng cách giữa các mục */
}

.cart-item input {
  width: 40px; /* Cố định độ rộng input */
  height: 32px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}
.cart-item .quantity {
  display: flex;
  align-items: center;
  gap: 5px; /* Khoảng cách giữa các nút */
}

.cart-item .quantity button {
  width: 32px; /* Đồng bộ kích thước */
  height: 32px;
  background: darkorange; /* Giữ nguyên màu sắc */
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
  background: #d17a00; /* Màu hover nhẹ hơn */
}

.confirm-btn {
  background: orange;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  display: block;
  width: 100%;
  text-align: center;
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

/* Hiệu ứng mở popup */
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