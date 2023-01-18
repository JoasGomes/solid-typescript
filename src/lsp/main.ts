import { Messaging } from './services/messaging';
import { Order } from './entities/order';
import { Persistency } from './services/persistency';
import { Product } from './entities/product';
import { ShoppingCart } from './entities/shopping-cart';
import {
  FiftyPercentDiscount,
  NoPercentDiscount,
  TenPercentDiscount,
} from './entities/discount';

const fiftyPercentDiscount = new FiftyPercentDiscount();
const noDiscount = new NoPercentDiscount();
const tenPercentDiscount = new TenPercentDiscount();
const shoppingCart = new ShoppingCart(tenPercentDiscount);
const messaging = new Messaging();
const persistency = new Persistency();
const order = new Order(shoppingCart, messaging, persistency);
shoppingCart.addItem(new Product('camisa', 49.9));
shoppingCart.addItem(new Product('caderno', 19.9));
shoppingCart.addItem(new Product('lápis', 3.9));

console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(shoppingCart.totalWithDiscount());
console.log(order.orderStatus);
order.checkout();
console.log(order.orderStatus);
