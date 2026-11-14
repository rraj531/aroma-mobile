process.env.NODE_ENV = "test";
const express = require("express");
const http = require("http");

const {
  sequelize,
  User,
  Product,
  CartItem,
  WishlistItem,
  Address,
  Order,
  OrderItem,
  Coupon,
  CouponUsage,
  Review,
} = require("./models");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const addressRoutes = require("./routes/addressRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const couponRoutes = require("./routes/couponRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { errorHandler } = require("./middleware/errorHandler");

const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes);

app.use(errorHandler);

let server;
let port;
let token;
let adminToken;
let createdProductId;
let createdAddressId;
let createdOrderId;
let createdCouponId;

function request(method, path, body = null, authToken = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(`http://localhost:${port}${path}`);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method.toUpperCase(),
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (authToken) {
      options.headers["Authorization"] = `Bearer ${authToken}`;
    }

    const req = http.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          resolve({ status: res.statusCode, body: json });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on("error", reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function runTests() {
  console.log("=====================================================");
  console.log("   AROMA MOBILE & ELECTRONICS - PHASE-WISE TEST SUITE");
  console.log("=====================================================\n");

  try {
    // Sync models with in-memory DB
    await User.sequelize.sync({ force: true });
    console.log("✅ DB Models Synced Successfully\n");

    server = app.listen(0, async () => {
      port = server.address().port;
      console.log(`🚀 Test Server Running on Port ${port}\n`);

      let passCount = 0;
      let failCount = 0;

      function assert(condition, testName) {
        if (condition) {
          console.log(`  [PASS] ${testName}`);
          passCount++;
        } else {
          console.error(`  [FAIL] ${testName}`);
          failCount++;
        }
      }

      // --- PHASE 1: Auth & Products System ---
      console.log("--- PHASE 1: Auth & Products System ---");

      // 1. Register Customer
      const regRes = await request("POST", "/api/auth/register", {
        name: "Rahul Sharma",
        email: "rahul@example.com",
        password: "Password123!",
        mobile: "9876543210",
      });
      assert(
        regRes.status === 201 && regRes.body.token,
        "1.1 Customer Registration & Token Generation",
      );
      token = regRes.body.token;

      const duplicateRegRes = await request("POST", "/api/auth/register", {
        name: "Rahul Sharma",
        email: "rahul@example.com",
        password: "Password123!",
      });
      assert(
        duplicateRegRes.status === 409 &&
          duplicateRegRes.body.message.includes("already registered"),
        "1.1b Duplicate Registration Returns Conflict",
      );

      // 2. Register Admin User
      const adminReg = await request("POST", "/api/auth/register", {
        name: "Admin Aroma",
        email: "admin@aroma.com",
        password: "AdminPassword123!",
        mobile: "9000000000",
      });
      // Promote admin in DB directly for testing
      const adminUser = await User.findOne({
        where: { email: "admin@aroma.com" },
      });
      adminUser.role = "admin";
      await adminUser.save();

      const adminLogin = await request("POST", "/api/auth/login", {
        email: "admin@aroma.com",
        password: "AdminPassword123!",
      });
      assert(
        adminLogin.status === 200 && adminLogin.body.role === "admin",
        "1.2 Admin Registration & Login",
      );
      adminToken = adminLogin.body.token;

      // 3. User Profile
      const profRes = await request("GET", "/api/auth/profile", null, token);
      assert(
        profRes.status === 200 && profRes.body.email === "rahul@example.com",
        "1.3 Get User Profile",
      );

      // 4. Create Seed Product
      const product = await Product.create({
        name: "Samsung Galaxy S25",
        brand: "Samsung",
        category: "Mobile",
        price: 74999,
        mrp: 79999,
        rating: 4.5,
        stock: 10,
        image: "images/samsung-s25.jpg",
        description: "Latest Flagship Phone",
      });
      createdProductId = product.id;
      assert(createdProductId > 0, "1.4 Seed Product Creation");

      // 5. Get All Products
      const prodListRes = await request("GET", "/api/products");
      assert(
        prodListRes.status === 200 && prodListRes.body.products.length > 0,
        "1.5 Fetch All Products API",
      );

      // --- PHASE 2: Cart, Wishlist & Address System ---
      console.log("\n--- PHASE 2: Cart, Wishlist & Address System ---");

      // 1. Add to Cart
      const cartAddRes = await request(
        "POST",
        "/api/cart",
        { productId: createdProductId, quantity: 2 },
        token,
      );
      assert(
        (cartAddRes.status === 200 || cartAddRes.status === 201) &&
          cartAddRes.body.items.length > 0,
        "2.1 Add Product to Cart",
      );

      // 2. Get Cart
      const cartGetRes = await request("GET", "/api/cart", null, token);
      assert(
        cartGetRes.status === 200 && cartGetRes.body.items.length === 1,
        "2.2 Get User Cart",
      );

      // 3. Toggle Wishlist
      const wishRes = await request(
        "POST",
        "/api/wishlist",
        { productId: createdProductId },
        token,
      );
      assert(
        wishRes.status === 200 && wishRes.body.action === "added",
        "2.3 Add Item to Wishlist",
      );

      // 4. Add Address
      const addrAddRes = await request(
        "POST",
        "/api/addresses",
        {
          label: "Home",
          fullAddress: "20 Deepak Nagar, Navagam, Dindoli",
          city: "Surat",
          state: "Gujarat",
          pincode: "394210",
        },
        token,
      );
      assert(
        addrAddRes.status === 201 && addrAddRes.body.address.id,
        "2.4 Save Delivery Address",
      );
      createdAddressId = addrAddRes.body.address.id;

      // --- PHASE 3: Payments & Coupon System ---
      console.log("\n--- PHASE 3: Payments & Coupon System ---");

      // 1. Create Coupon
      const coupon = await Coupon.create({
        code: "AROMA500",
        discountType: "fixed",
        discountValue: 500,
        minOrderAmount: 1000,
        isActive: true,
      });
      createdCouponId = coupon.id;
      assert(coupon.id > 0, "3.1 Seed Discount Coupon");

      // 2. Validate Coupon
      const couponValRes = await request(
        "POST",
        "/api/coupons/validate",
        { code: "AROMA500", cartTotal: 74999 },
        token,
      );
      assert(
        couponValRes.status === 200 && couponValRes.body.discount === 500,
        "3.2 Validate Coupon API",
      );

      // --- PHASE 4: Order System & Reviews ---
      console.log("\n--- PHASE 4: Order System & Reviews ---");

      // 1. Create Order
      const orderCreateRes = await request(
        "POST",
        "/api/orders",
        {
          addressId: createdAddressId,
          items: [{ productId: createdProductId, quantity: 1, price: 74999 }],
          couponCode: "AROMA500",
          paymentMethod: "cod",
        },
        token,
      );
      assert(
        orderCreateRes.status === 201 && orderCreateRes.body.order.orderNumber,
        "4.1 Place New Order",
      );
      createdOrderId = orderCreateRes.body.order.id;

      const customerLogin = await request("POST", "/api/auth/login", {
        email: "rahul@example.com",
        password: "Password123!",
      });
      const secondCustomerReg = await request("POST", "/api/auth/register", {
        name: "Second Customer",
        email: "second-customer@example.com",
        password: "Password123!",
      });
      const secondCustomerLogin = await request("POST", "/api/auth/login", {
        email: "second-customer@example.com",
        password: "Password123!",
      });
      const secondCustomerOrder = await Order.create({
        userId: secondCustomerReg.body.id,
        orderNumber: "ISOLATION-SECOND-CUSTOMER",
        subtotal: 1234,
        totalAmount: 1234,
        paymentMethod: "cod",
      });
      const customerOrders = await request(
        "GET",
        "/api/orders",
        null,
        customerLogin.body.token,
      );
      const secondCustomerOrders = await request(
        "GET",
        "/api/orders",
        null,
        secondCustomerLogin.body.token,
      );
      assert(
        customerLogin.status === 200 &&
          secondCustomerLogin.status === 200 &&
          customerOrders.body.orders.length === 1 &&
          customerOrders.body.orders[0].id === createdOrderId &&
          secondCustomerOrders.body.orders.length === 1 &&
          secondCustomerOrders.body.orders[0].id === secondCustomerOrder.id,
        "4.1b Signed-in customers only see their own orders",
      );
      const otherCustomerOrder = await request(
        "GET",
        `/api/orders/${createdOrderId}`,
        null,
        secondCustomerLogin.body.token,
      );
      assert(
        otherCustomerOrder.status === 404,
        "4.1c Customers cannot open another user's order",
      );

      // 2. Update Order Payment Status to paid (for verified purchase test)
      const orderInst = await Order.findByPk(createdOrderId);
      orderInst.paymentStatus = "paid";
      await orderInst.save();

      // 3. Post Product Review
      const revRes = await request(
        "POST",
        "/api/reviews",
        {
          productId: createdProductId,
          rating: 5,
          title: "Amazing Phone!",
          comment: "Super fast delivery and great performance.",
        },
        token,
      );
      assert(
        revRes.status === 201 && revRes.body.review.verifiedPurchase === true,
        "4.2 Add Product Review (Verified Purchase)",
      );

      // 4. Get Product Reviews
      const revGetRes = await request(
        "GET",
        `/api/reviews/product/${createdProductId}`,
      );
      assert(
        revGetRes.status === 200 && revGetRes.body.reviews.length === 1,
        "4.3 Get Product Reviews List",
      );

      // --- PHASE 5: Admin Dashboard & Analytics ---
      console.log("\n--- PHASE 5: Admin Dashboard & Analytics ---");

      // 1. Admin Dashboard Stats
      const statsRes = await request(
        "GET",
        "/api/admin/dashboard",
        null,
        adminToken,
      );
      assert(
        statsRes.status === 200 && statsRes.body.stats.totalOrders >= 1,
        "5.1 Admin Dashboard Analytics",
      );

      // 2. Admin Update Order Status
      const updateOrderRes = await request(
        "PUT",
        `/api/admin/orders/${createdOrderId}`,
        { orderStatus: "delivered" },
        adminToken,
      );
      assert(
        updateOrderRes.status === 200 &&
          updateOrderRes.body.order.orderStatus === "delivered",
        "5.2 Admin Order Status Update",
      );

      console.log("\n=====================================================");
      console.log(`   TEST RESULTS: ${passCount} PASSED, ${failCount} FAILED`);
      console.log("=====================================================\n");

      server.close(() => process.exit(failCount > 0 ? 1 : 0));
    });
  } catch (err) {
    console.error("Fatal Test Error:", err);
    if (server) server.close();
    process.exit(1);
  }
}

runTests();
