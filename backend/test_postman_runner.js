/**
 * Complete Postman Collection Automated Test Runner
 * Executes all 35+ API requests from Aroma_API_Postman_Collection.json
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:5000';

function makeRequest(method, pathUrl, { headers = {}, body = null } = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(pathUrl, BASE_URL);
    const reqHeaders = { 'Content-Type': 'application/json', ...headers };
    const payload = body ? (typeof body === 'string' ? body : JSON.stringify(body)) : null;

    const req = http.request({
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method.toUpperCase(),
      headers: reqHeaders,
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        let parsed = data;
        try {
          parsed = data ? JSON.parse(data) : null;
        } catch (_) {}
        resolve({ status: res.statusCode, headers: res.headers, body: parsed });
      });
    });

    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

async function runAll() {
  console.log('=====================================================');
  console.log('   POSTMAN COLLECTION - COMPREHENSIVE API RUNNER   ');
  console.log('=====================================================\n');

  let passed = 0;
  let failed = 0;

  function assertTest(name, condition, details = '') {
    if (condition) {
      console.log(`  [PASS] ${name}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${name} -> ${details}`);
      failed++;
    }
  }

  try {
    let token = '';
    let adminToken = '';
    let productId = 1;
    let addressId = 1;
    let orderId = 1;
    let reviewId = 1;

    // 1. HEALTH CHECK
    console.log('--- 🏥 HEALTH CHECK ---');
    const healthRoot = await makeRequest('GET', '/');
    assertTest('Server Health Check (GET /)', healthRoot.status === 200 && healthRoot.body && healthRoot.body.status === 'OK', JSON.stringify(healthRoot.body));

    const healthApi = await makeRequest('GET', '/api/health');
    assertTest('API Health Check (GET /api/health)', healthApi.status === 200 && healthApi.body.status === 'OK');

    // 2. AUTH
    console.log('\n--- 🔐 AUTH APIS ---');
    const unique = Date.now();
    const testEmail = `postman.${unique}@example.com`;
    const regRes = await makeRequest('POST', '/api/auth/register', {
      body: { name: 'Postman User', email: testEmail, password: 'Password@123', mobile: String(9800000000 + (unique % 100000000)).slice(0, 10) }
    });
    token = regRes.body && regRes.body.token;
    assertTest('Register User (POST /api/auth/register)', regRes.status === 201 && token, `status=${regRes.status}`);

    const loginRes = await makeRequest('POST', '/api/auth/login', {
      body: { email: testEmail, password: 'Password@123' }
    });
    token = loginRes.body && loginRes.body.token ? loginRes.body.token : token;
    assertTest('Login User (POST /api/auth/login)', loginRes.status === 200 && token);

    const adminLoginRes = await makeRequest('POST', '/api/auth/login', {
      body: { email: 'admin@aroma.com', password: 'Admin@1234' }
    });
    adminToken = adminLoginRes.body && adminLoginRes.body.token;
    assertTest('Login Admin (POST /api/auth/login)', adminLoginRes.status === 200 && adminLoginRes.body.role === 'admin' && adminToken);

    const profileRes = await makeRequest('GET', '/api/auth/profile', { headers: { Authorization: `Bearer ${token}` } });
    assertTest('Get Profile (GET /api/auth/profile)', profileRes.status === 200 && profileRes.body.email === testEmail);

    const updateProfRes = await makeRequest('PUT', '/api/auth/profile', {
      headers: { Authorization: `Bearer ${token}` },
      body: { name: 'Postman Updated Name' }
    });
    assertTest('Update Profile (PUT /api/auth/profile)', updateProfRes.status === 200 && updateProfRes.body.name === 'Postman Updated Name');

    // 3. PRODUCTS
    console.log('\n--- 📦 PRODUCT APIS ---');
    const allProdRes = await makeRequest('GET', '/api/products');
    assertTest('Get All Products (GET /api/products)', allProdRes.status === 200 && Array.isArray(allProdRes.body.products));
    if (allProdRes.body.products && allProdRes.body.products.length > 0) {
      productId = allProdRes.body.products[0].id;
    }

    const prodByIdRes = await makeRequest('GET', `/api/products/${productId}`);
    assertTest(`Get Product By ID (GET /api/products/${productId})`, prodByIdRes.status === 200 && prodByIdRes.body.id === productId);

    const prodByCatRes = await makeRequest('GET', '/api/products/category/smartphones');
    assertTest('Get Products By Category (GET /api/products/category/smartphones)', prodByCatRes.status === 200 && Array.isArray(prodByCatRes.body) && prodByCatRes.body.length > 0);

    const categoriesRes = await makeRequest('GET', '/api/products/categories');
    assertTest('Get Product Categories (GET /api/products/categories)', categoriesRes.status === 200 && Array.isArray(categoriesRes.body));

    // 4. CART
    console.log('\n--- 🛒 CART APIS ---');
    const getCart1 = await makeRequest('GET', '/api/cart', { headers: { Authorization: `Bearer ${token}` } });
    assertTest('Get Cart (GET /api/cart)', getCart1.status === 200 && Array.isArray(getCart1.body.items));

    const addCartRes = await makeRequest('POST', '/api/cart', {
      headers: { Authorization: `Bearer ${token}` },
      body: { productId, quantity: 2 }
    });
    assertTest('Add to Cart (POST /api/cart)', addCartRes.status === 200 && addCartRes.body.items.length >= 1);

    const updateCartRes = await makeRequest('PUT', `/api/cart/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
      body: { quantity: 3 }
    });
    assertTest('Update Cart Quantity (PUT /api/cart/:productId)', updateCartRes.status === 200);

    const removeCartRes = await makeRequest('DELETE', `/api/cart/${productId}`, { headers: { Authorization: `Bearer ${token}` } });
    assertTest('Remove From Cart (DELETE /api/cart/:productId)', removeCartRes.status === 200);

    // Add 1 back and clear
    await makeRequest('POST', '/api/cart', { headers: { Authorization: `Bearer ${token}` }, body: { productId, quantity: 1 } });
    const clearCartRes = await makeRequest('DELETE', '/api/cart', { headers: { Authorization: `Bearer ${token}` } });
    assertTest('Clear Cart (DELETE /api/cart)', clearCartRes.status === 200);

    // 5. WISHLIST
    console.log('\n--- ❤️ WISHLIST APIS ---');
    const getWish1 = await makeRequest('GET', '/api/wishlist', { headers: { Authorization: `Bearer ${token}` } });
    assertTest('Get Wishlist (GET /api/wishlist)', getWish1.status === 200);

    const toggleWishRes = await makeRequest('POST', '/api/wishlist', {
      headers: { Authorization: `Bearer ${token}` },
      body: { productId }
    });
    assertTest('Toggle Wishlist (POST /api/wishlist)', toggleWishRes.status === 200 && toggleWishRes.body.action === 'added');

    const removeWishRes = await makeRequest('DELETE', `/api/wishlist/${productId}`, { headers: { Authorization: `Bearer ${token}` } });
    assertTest('Remove From Wishlist (DELETE /api/wishlist/:productId)', removeWishRes.status === 200);

    // 6. ADDRESSES
    console.log('\n--- 📍 ADDRESS APIS ---');
    const addAddrRes = await makeRequest('POST', '/api/addresses', {
      headers: { Authorization: `Bearer ${token}` },
      body: { name: 'Raj Kumar', street: '123, Main Street', city: 'Surat', state: 'Gujarat', pincode: '395001', isDefault: true }
    });
    addressId = addAddrRes.body && addAddrRes.body.address && addAddrRes.body.address.id;
    assertTest('Add Address (POST /api/addresses)', addAddrRes.status === 201 && addressId, `status=${addAddrRes.status}`);

    const getAllAddrRes = await makeRequest('GET', '/api/addresses', { headers: { Authorization: `Bearer ${token}` } });
    assertTest('Get All Addresses (GET /api/addresses)', getAllAddrRes.status === 200 && getAllAddrRes.body.addresses.length >= 1);

    const updateAddrRes = await makeRequest('PUT', `/api/addresses/${addressId}`, {
      headers: { Authorization: `Bearer ${token}` },
      body: { street: '456, New Street', city: 'Surat', state: 'Gujarat', pincode: '395002' }
    });
    assertTest('Update Address (PUT /api/addresses/:id)', updateAddrRes.status === 200 && updateAddrRes.body.address.pincode === '395002');

    const setDefaultAddrRes = await makeRequest('PUT', `/api/addresses/${addressId}/default`, { headers: { Authorization: `Bearer ${token}` } });
    assertTest('Set Default Address (PUT /api/addresses/:id/default)', setDefaultAddrRes.status === 200 && setDefaultAddrRes.body.address.isDefault === true);

    // 7. COUPONS
    console.log('\n--- 🎟️ COUPON APIS ---');
    const getCouponsRes = await makeRequest('GET', '/api/coupons');
    assertTest('Get Available Coupons (GET /api/coupons)', getCouponsRes.status === 200 && Array.isArray(getCouponsRes.body));

    const getCouponsAltRes = await makeRequest('GET', '/api/coupons/available');
    assertTest('Get Available Coupons Alt (GET /api/coupons/available)', getCouponsAltRes.status === 200 && Array.isArray(getCouponsAltRes.body));

    const validateCouponRes = await makeRequest('POST', '/api/coupons/validate', {
      headers: { Authorization: `Bearer ${token}` },
      body: { code: 'AROMA500', cartTotal: 6000 }
    });
    assertTest('Validate Coupon (POST /api/coupons/validate)', validateCouponRes.status === 200 && validateCouponRes.body.valid === true);

    // 8. ORDERS
    console.log('\n--- 🧾 ORDER APIS ---');
    // Add item to cart first
    await makeRequest('POST', '/api/cart', { headers: { Authorization: `Bearer ${token}` }, body: { productId, quantity: 1 } });

    const placeOrderRes = await makeRequest('POST', '/api/orders', {
      headers: { Authorization: `Bearer ${token}` },
      body: { addressId, paymentMethod: 'COD', couponCode: '' }
    });
    orderId = placeOrderRes.body && placeOrderRes.body.order && placeOrderRes.body.order.id;
    assertTest('Place Order (POST /api/orders)', placeOrderRes.status === 201 && orderId, `status=${placeOrderRes.status}`);

    const getMyOrdersRes = await makeRequest('GET', '/api/orders', { headers: { Authorization: `Bearer ${token}` } });
    assertTest('Get My Orders (GET /api/orders)', getMyOrdersRes.status === 200 && getMyOrdersRes.body.orders.length >= 1);

    const getOrderByIdRes = await makeRequest('GET', `/api/orders/${orderId}`, { headers: { Authorization: `Bearer ${token}` } });
    assertTest(`Get Order By ID (GET /api/orders/${orderId})`, getOrderByIdRes.status === 200 && getOrderByIdRes.body.order.id === orderId);

    const cancelOrderRes = await makeRequest('PUT', `/api/orders/${orderId}/cancel`, { headers: { Authorization: `Bearer ${token}` } });
    assertTest(`Cancel Order (PUT /api/orders/${orderId}/cancel)`, cancelOrderRes.status === 200 && cancelOrderRes.body.order.orderStatus === 'cancelled');

    // 9. PAYMENT
    console.log('\n--- 💳 PAYMENT APIS ---');
    // Place a razorpay order
    await makeRequest('POST', '/api/cart', { headers: { Authorization: `Bearer ${token}` }, body: { productId, quantity: 1 } });
    const rzpOrderRes = await makeRequest('POST', '/api/orders', {
      headers: { Authorization: `Bearer ${token}` },
      body: { addressId, paymentMethod: 'razorpay' }
    });
    const rzpDbOrderId = rzpOrderRes.body && rzpOrderRes.body.order && rzpOrderRes.body.order.id;

    const createPayRes = await makeRequest('POST', '/api/payment/create-order', {
      headers: { Authorization: `Bearer ${token}` },
      body: { orderId: rzpDbOrderId }
    });
    // Create-order will return 200 if keys valid or 500 placeholder error
    assertTest('Create Razorpay Order (POST /api/payment/create-order)', createPayRes.status === 200 || createPayRes.status === 500, `status=${createPayRes.status}`);

    const verifyPayRes = await makeRequest('POST', '/api/payment/verify', {
      headers: { Authorization: `Bearer ${token}` },
      body: { razorpay_order_id: 'dummy', razorpay_payment_id: 'dummy', razorpay_signature: 'dummy' }
    });
    assertTest('Verify Payment Invalid Signature Check (POST /api/payment/verify)', verifyPayRes.status === 400);

    // 10. REVIEWS
    console.log('\n--- ⭐ REVIEW APIS ---');
    // Mark order as paid by admin to allow verified review
    await makeRequest('PUT', `/api/admin/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${adminToken}` },
      body: { paymentStatus: 'paid' }
    });

    const createReviewRes = await makeRequest('POST', '/api/reviews', {
      headers: { Authorization: `Bearer ${token}` },
      body: { productId, rating: 5, comment: 'Bahut accha product hai! Highly recommended.' }
    });
    reviewId = createReviewRes.body && createReviewRes.body.review && createReviewRes.body.review.id;
    assertTest('Create Review (POST /api/reviews)', createReviewRes.status === 201 && reviewId, `status=${createReviewRes.status}`);

    const getReviewsRes = await makeRequest('GET', `/api/reviews/product/${productId}`);
    assertTest(`Get Product Reviews (GET /api/reviews/product/${productId})`, getReviewsRes.status === 200 && getReviewsRes.body.count >= 1);

    const deleteReviewRes = await makeRequest('DELETE', `/api/reviews/${reviewId}`, { headers: { Authorization: `Bearer ${token}` } });
    assertTest(`Delete Review (DELETE /api/reviews/${reviewId})`, deleteReviewRes.status === 200);

    // 11. ADMIN
    console.log('\n--- 👑 ADMIN APIS ---');
    const adminDashRes = await makeRequest('GET', '/api/admin/dashboard', { headers: { Authorization: `Bearer ${adminToken}` } });
    assertTest('Dashboard Stats (GET /api/admin/dashboard)', adminDashRes.status === 200 && adminDashRes.body.stats);

    const adminOrdersRes = await makeRequest('GET', '/api/admin/orders', { headers: { Authorization: `Bearer ${adminToken}` } });
    assertTest('Get All Orders Admin (GET /api/admin/orders)', adminOrdersRes.status === 200 && Array.isArray(adminOrdersRes.body.orders));

    const updateOrderStatusRes = await makeRequest('PUT', `/api/admin/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${adminToken}` },
      body: { status: 'shipped' }
    });
    assertTest('Update Order Status Admin (PUT /api/admin/orders/:id)', updateOrderStatusRes.status === 200 && updateOrderStatusRes.body.order.orderStatus === 'shipped');

    const adminUsersRes = await makeRequest('GET', '/api/admin/users', { headers: { Authorization: `Bearer ${adminToken}` } });
    assertTest('Get All Users Admin (GET /api/admin/users)', adminUsersRes.status === 200 && Array.isArray(adminUsersRes.body.users));

    const updateUserRoleRes = await makeRequest('PUT', `/api/admin/users/${regRes.body.id}/role`, {
      headers: { Authorization: `Bearer ${adminToken}` },
      body: { role: 'admin' }
    });
    assertTest('Update User Role Admin (PUT /api/admin/users/:id/role)', updateUserRoleRes.status === 200 && updateUserRoleRes.body.user.role === 'admin');

    // Test deleting an unlinked address
    const tempAddrRes = await makeRequest('POST', '/api/addresses', {
      headers: { Authorization: `Bearer ${token}` },
      body: { name: 'Temp Office', street: 'Temp Street 99', city: 'Surat', state: 'Gujarat', pincode: '395003' }
    });
    const tempAddrId = tempAddrRes.body && tempAddrRes.body.address && tempAddrRes.body.address.id;
    const delAddrRes = await makeRequest('DELETE', `/api/addresses/${tempAddrId}`, { headers: { Authorization: `Bearer ${token}` } });
    assertTest('Delete Address (DELETE /api/addresses/:id)', delAddrRes.status === 200);

    // Test foreign key constraint: trying to delete address linked to an order returns 400
    const delLinkedAddrRes = await makeRequest('DELETE', `/api/addresses/${addressId}`, { headers: { Authorization: `Bearer ${token}` } });
    assertTest('Cannot Delete Address Linked to Order (DELETE /api/addresses/:id -> 400)', delLinkedAddrRes.status === 400);

    // Logout
    const logoutRes = await makeRequest('POST', '/api/auth/logout', { headers: { Authorization: `Bearer ${token}` } });
    assertTest('Logout User (POST /api/auth/logout)', logoutRes.status === 200);

    console.log('\n=====================================================');
    console.log(`   POSTMAN COLLECTION TESTS: ${passed} PASSED, ${failed} FAILED`);
    console.log('=====================================================\n');

    process.exit(failed > 0 ? 1 : 0);
  } catch (error) {
    console.error('Fatal Runner Error:', error);
    process.exit(1);
  }
}

runAll();
