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
import { EnterpriseCustomer, IndividualCustumer } from './entities/customer';
import { MessagingProtocol } from './entities/interfaces/messaging-protocol';

const fiftyPercentDiscount = new FiftyPercentDiscount();
const noDiscount = new NoPercentDiscount();
const tenPercentDiscount = new TenPercentDiscount();
const shoppingCart = new ShoppingCart(tenPercentDiscount);
const messaging = new Messaging();
const persistency = new Persistency();
const individualCustomer = new IndividualCustumer(
  'joas',
  'vitor',
  '111.111.111-11',
);
const enterpriseCustomer = new EnterpriseCustomer('empresa', '2222222222222');

class MessagingMock implements MessagingProtocol {
  sendMessage(): void {
    console.log('a mensagem foi enviada pelo mock');
  }
}

const messaginMock = new MessagingMock();

const order = new Order(
  shoppingCart,
  messaginMock,
  persistency,
  enterpriseCustomer,
);
shoppingCart.addItem(new Product('camisa', 49.9));
shoppingCart.addItem(new Product('caderno', 19.9));
shoppingCart.addItem(new Product('lápis', 3.9));

console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(shoppingCart.totalWithDiscount());
console.log(order.orderStatus);
order.checkout();
console.log(order.orderStatus);
