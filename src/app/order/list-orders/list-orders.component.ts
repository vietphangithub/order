import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms'; // Reactive form services
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr

import { OrderService } from '../../shared/order.service'; // CRUD services API
import { Order } from '../../shared/order';
@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent implements OnInit {
  orders: Order[];
  constructor(
    public OrderService: OrderService, // CRUD API services
    public fb: FormBuilder, // Form Builder service for Reactive forms
    public toastr: ToastrService // Toastr service for alert message
  ) {}

  ngOnInit() {
    let s = this.OrderService.GetListOrder();
    s.snapshotChanges().subscribe(data => {
      // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.orders = [];
      data.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.orders.unshift(a as Order);
      });
    });

    console.warn(11, this.orders);
  }

  deleteOrder(order: Order) {
    if (window.confirm('Are sure you want to delete this student ?')) {
      // Asking from user before Deleting student data.
      this.OrderService.DeleteStudent(order.$key); // Using Delete student API to delete student.
      this.toastr.success(order.nameOrder + ' successfully deleted!'); // Alert message will show up when student successfully deleted.
    }
  }
}
