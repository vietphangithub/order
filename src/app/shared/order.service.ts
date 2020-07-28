import { Injectable } from '@angular/core';
import { Order } from '../shared/order'; // Student data type interface class
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from '@angular/fire/database'; // Firebase modules for Database, Data list and Single object

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  ordersRef: AngularFireList<any>; // Reference to Student data list, its an Observable
  orderRef: AngularFireObject<any>; // Reference to Student object, its an Observable too

  constructor(private db: AngularFireDatabase) {}

  AddOrder(order: Order) {
    this.ordersRef = this.db.list('/order');
    this.ordersRef.push({
      nameOrder: order.nameOrder,
      linkOrder: order.linkOrder,
      discount: order.discount,
      createdBy: order.createdBy,
      createdDate: order.createdDate
    });
  }

  GetListOrder() {
    this.ordersRef = this.db.list('order');
    return this.ordersRef;
  }

  // Fetch Single Student Object
  GetOrder(id: string) {
    this.orderRef = this.db.object('order/' + id);
    return this.orderRef;
  }

    // Delete Student Object
    DeleteStudent(id: string) { 
      this.orderRef = this.db.object('order/'+id);
      this.orderRef.remove();
    }

}
