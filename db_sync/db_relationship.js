const Customer = require('../models/customer');
const Cart = require('../models/cart');
const Order = require('../models/order');
const Product = require('../models/product');
const CartItem = require('../models/cart_item');
const Category = require('../models/category');
const OrderItem = require('../models/order_item');

const ProductImage = require('../models/product_images');
const ProductReview = require('../models/product_review');
const ProductCategory = require('../models/product_category');
const PromoCode = require('../models/promoCode');
const Transaction = require('../models/transaction');
const Address = require('../models/address');
const Staff = require('../models/staff');
const Role = require('../models/role');
const RolePermission = require('../models/role_permission');
const Vendor = require('../models/vendor');

const syncDb = () => {
  // Define Customer Associations
  Customer.hasMany(Order);
  Order.belongsTo(Customer);
  Customer.hasMany(Cart);
  Cart.belongsTo(Customer);
  Customer.hasMany(Transaction);
  Transaction.belongsTo(Customer);
  Customer.hasMany(ProductReview);
  ProductReview.belongsTo(Customer);
  Customer.belongsTo(Role);

  // Define Vendor asssociation
  Vendor.hasMany(Product);
  Vendor.hasMany(Staff);
  Vendor.hasMany(Order);
  Vendor.hasMany(Transaction);
  Vendor.hasMany(ProductReview);

  // Define Promo code association
  PromoCode.hasMany(Order);

  // Define order associations
  Order.belongsToMany(Product, { through: OrderItem });
  Order.hasMany(Transaction);
  Order.belongsTo(PromoCode);

  // Define Transaction associations
  Transaction.belongsTo(Order);

  // Define Product associations
  Product.belongsToMany(Order, { through: OrderItem });
  Product.belongsToMany(Cart, { through: CartItem });
  Product.belongsToMany(Category, { through: ProductCategory });
  Product.belongsTo(Vendor);

  Product.hasMany(ProductReview);
  ProductReview.belongsTo(Product);

  Product.hasMany(ProductImage);
  ProductImage.belongsTo(Product);

  Category.belongsToMany(Product, { through: ProductCategory });

  // Define Cart Association
  Cart.belongsToMany(Product, { through: CartItem });

  // Define Address Association
  Customer.hasMany(Address);
  Address.belongsTo(Customer);

  // Define Staff Association
  Staff.belongsTo(Role);

  // Define role association
  Role.hasOne(Staff);
  Role.hasOne(Customer, { foreignKey: { name: 'RoleId', defaultValue: 1 } });
  Role.hasMany(RolePermission);
  Role.hasOne(Vendor, { foreignKey: { name: 'RoleId', defaultValue: 2 } });
};

module.exports = syncDb;
