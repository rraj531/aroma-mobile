/* =====================================================
   AROMA MOBILE & ELECTRONICS - FRONTEND API CLIENT MODULE
   Base URL: https://rxxr.store/api
===================================================== */

const API_BASE_URL = "https://rxxr.store/api";

class ApiClient {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  getToken() {
    return localStorage.getItem("aroma_token");
  }

  setToken(token) {
    if (token) {
      localStorage.setItem("aroma_token", token);
    } else {
      localStorage.removeItem("aroma_token");
    }
  }

  async request(endpoint, options = {}) {
    const token = this.getToken();
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const config = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, config);
      const text = await response.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error(`Server returned HTML instead of JSON. Check if backend is running. Response: ${text.substring(0, 100)}...`);
      }

      if (!response.ok) {
        throw new Error(
          data.message || "An error occurred while calling the API",
        );
      }

      return data;
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error.message);
      throw error;
    }
  }

  // --- Auth APIs ---
  auth = {
    register: (userData) =>
      this.request("/auth/register", {
        method: "POST",
        body: JSON.stringify(userData),
      }),
    login: async (credentials) => {
      const res = await this.request("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });
      if (res.token) this.setToken(res.token);
      return res;
    },
    logout: () => {
      this.setToken(null);
      return Promise.resolve({ success: true });
    },
    getProfile: () => this.request("/auth/profile"),
    updateProfile: (data) =>
      this.request("/auth/profile", {
        method: "PUT",
        body: JSON.stringify(data),
      }),
  };

  // --- Product APIs ---
  products = {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return this.request(`/products${query ? `?${query}` : ""}`);
    },
    getById: (id) => this.request(`/products/${id}`),
    getCategories: () => this.request("/products/categories"),
  };

  // --- Cart APIs ---
  cart = {
    get: () => this.request("/cart"),
    add: (productId, quantity = 1) =>
      this.request("/cart", {
        method: "POST",
        body: JSON.stringify({ productId, quantity }),
      }),
    update: (id, quantity) =>
      this.request(`/cart/${id}`, {
        method: "PUT",
        body: JSON.stringify({ quantity }),
      }),
    remove: (id) => this.request(`/cart/${id}`, { method: "DELETE" }),
    clear: () => this.request("/cart", { method: "DELETE" }),
  };

  // --- Wishlist APIs ---
  wishlist = {
    get: () => this.request("/wishlist"),
    toggle: (productId) =>
      this.request("/wishlist", {
        method: "POST",
        body: JSON.stringify({ productId }),
      }),
    remove: (productId) =>
      this.request(`/wishlist/${productId}`, { method: "DELETE" }),
  };

  // --- Address APIs ---
  addresses = {
    getAll: () => this.request("/addresses"),
    add: (addressData) =>
      this.request("/addresses", {
        method: "POST",
        body: JSON.stringify(addressData),
      }),
    update: (id, addressData) =>
      this.request(`/addresses/${id}`, {
        method: "PUT",
        body: JSON.stringify(addressData),
      }),
    delete: (id) => this.request(`/addresses/${id}`, { method: "DELETE" }),
  };

  // --- Order APIs ---
  orders = {
    create: (orderData) =>
      this.request("/orders", {
        method: "POST",
        body: JSON.stringify(orderData),
      }),
    getAll: () => this.request("/orders"),
    getById: (id) => this.request(`/orders/${id}`),
    cancel: (id) => this.request(`/orders/${id}/cancel`, { method: "PUT" }),
  };

  // --- Coupon APIs ---
  coupons = {
    validate: (code, cartTotal) =>
      this.request("/coupons/validate", {
        method: "POST",
        body: JSON.stringify({ code, cartTotal }),
      }),
    getAvailable: () => this.request("/coupons"),
  };

  // --- Payment APIs ---
  payment = {
    createRazorpayOrder: (orderId) =>
      this.request("/payment/create-razorpay-order", {
        method: "POST",
        body: JSON.stringify({ orderId }),
      }),
    verify: (paymentData) =>
      this.request("/payment/verify-payment", {
        method: "POST",
        body: JSON.stringify(paymentData),
      }),
  };

  // --- Review APIs ---
  reviews = {
    getByProduct: (productId) => this.request(`/reviews/product/${productId}`),
    create: (reviewData) =>
      this.request("/reviews", {
        method: "POST",
        body: JSON.stringify(reviewData),
      }),
    delete: (id) => this.request(`/reviews/${id}`, { method: "DELETE" }),
  };

  // --- Admin APIs ---
  admin = {
    getStats: () => this.request("/admin/dashboard"),
    getOrders: (query = "") =>
      this.request(`/admin/orders${query ? `?${query}` : ""}`),
    updateOrderStatus: (orderId, data) =>
      this.request(`/admin/orders/${orderId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    getUsers: () => this.request("/admin/users"),
    updateRole: (userId, role) =>
      this.request(`/admin/users/${userId}/role`, {
        method: "PUT",
        body: JSON.stringify({ role }),
      }),
  };
}

window.AromaAPI = new ApiClient();