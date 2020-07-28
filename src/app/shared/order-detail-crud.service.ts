import { Injectable } from '@angular/core';
import { OrderDetail } from '../shared/order-detail';  // Order detail data type interface class
import { CrudService } from '../shared/crud.service';  // Order detail data type interface class
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object

import { AngularFirestore } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class OrderDetailCRUDService {
  orderDetailsRef: AngularFireList<any>; 
  orderDetailRef: AngularFireObject<any>;   // Reference to Student object, its an Observable too

 
  customersRef: AngularFireList<OrderDetail> = null;

  // Inject AngularFireDatabase Dependency in Constructor
  constructor(
    private db: AngularFireDatabase,
    private firestore: AngularFirestore
    ) {
     

     }

  AddOrderDetail(orderDetail: OrderDetail) {
    this.orderDetailsRef = this.db.list('/orderDetails/' + orderDetail.orderID + '/');
 
    this.orderDetailsRef.push({
      userName: orderDetail.userName,
      foodName: orderDetail.foodName,
      price: orderDetail.price
    });
    
  }
  private handleError(error) {
    console.log(error);
  }

  
  UpdateOrderDetail(orderDetail: OrderDetail)
  {
    this.db.object('/orderDetails/'+ orderDetail.orderID+ '/'+ orderDetail.$key).update({
      userName: orderDetail.userName,
      foodName: orderDetail.foodName,
      price: orderDetail.price
    })
  }

  DeleteOrderDetail(orderDetail: OrderDetail)
  {
    this.db.object('/orderDetails/'+ orderDetail.orderID+ '/'+ orderDetail.$key).remove();
  }

  GetOrderDetailList() {
    this.orderDetailsRef = this.db.list('orderDetails');
    return this.orderDetailsRef;
  }
  GetOrderDetail(orderID: string) {
    this.orderDetailsRef = this.db.list('/orderDetails/' + orderID);
    return this.orderDetailsRef;
  }



}
