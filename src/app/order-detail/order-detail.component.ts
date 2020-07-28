import { Component, OnInit } from '@angular/core';
import { OrderDetailCRUDService } from '../shared/order-detail-crud.service'; // CRUD services API
import { OrderService } from '../shared/order.service';
import * as _ from 'lodash';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms'; // Reactive form services
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr
import { OrderDetail } from '../shared/order-detail';

import { GroupOrder } from '../shared/group-order';
import { Order } from '../shared/order';
import { ActivatedRoute, Router } from '@angular/router'; // ActivatedRoue is used to get the current associated components information.

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  orderDetailForm: FormGroup;
  private actRoute: ActivatedRoute; // Activated route to get the current component's inforamation
  orderID: string = '';
  OrderDetails: OrderDetail[];
  groupOrders: GroupOrder[];
  groupOrder: GroupOrder;

  order: Order;
  urlOrder: string;
  isAdd: boolean;
  total: number = 0;
  pay: number = 0;
  discount: number = 0;

  constructor(
    public crudApi: OrderDetailCRUDService, // CRUD API services
    public fb: FormBuilder, // Form Builder service for Reactive forms
    public toastr: ToastrService, // Toastr service for alert message
    private route: ActivatedRoute,
    private crudOrder: OrderService
  ) {}

  ngOnInit(): void {
    this.groupOrders = [];
    this.route.paramMap.subscribe(params => {
      console.log(params.get('id'));
      this.orderID = params.get('id');
      this.crudOrder
        .GetOrder(this.orderID)
        .valueChanges()
        .subscribe(data => {
          this.order = data; // Using SetValue() method, It's a ReactiveForm's API to store intial value of reactive form
          this.urlOrder = this.order.linkOrder;
        });
    });

    this.orderFormValidate();

    let test = this.crudApi.GetOrderDetail(this.orderID);
    test.snapshotChanges().subscribe(data => {
      // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.OrderDetails = [];
      this.groupOrders = [];
      this.total = 0;
      this.pay = 0;
      this.discount = 0;

      data.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        a['orderID'] = this.orderID;

        this.OrderDetails.unshift(a as OrderDetail);
        this.total = this.total + a['price'];
      });

      console.log('unshift: ', this.OrderDetails);
      this.discount = (this.total * this.order.discount) / 100;
      this.pay = this.total - this.discount;
      console.warn(this.pay, this.total, this.discount);

      var grouped = _.groupBy(this.OrderDetails, function(order) {
        return order.foodName;
      });

      var groupOrders = new Array();
      this.OrderDetails.forEach(function(x) {
        var groupOrder = new GroupOrder();
        groupOrder.foodName = x.foodName;
        groupOrder.count = grouped[x.foodName].length;
        var index = groupOrders.findIndex(
          order => order.foodName == x.foodName
        );
        if (index < 0) {
          groupOrders.push(groupOrder as GroupOrder);
        }
      });
      for (var i = 0; i < groupOrders.length; i++) {
        this.groupOrders.push(groupOrders[i]);
      }
    });
  }

  //
  orderFormValidate() {
    this.orderDetailForm = this.fb.group({
      orderID: this.orderID,
      userName: ['', [Validators.required, Validators.minLength(2)]],
      foodName: [''],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      $key: ['']
    });
  }

  submitOrderDetailData() {
    console.warn(this.orderDetailForm.value);
    this.crudApi.AddOrderDetail(this.orderDetailForm.value); // Submit student data using CRUD API
    this.toastr.success(
      this.orderDetailForm.controls['userName'].value + ' successfully added!'
    ); // Show success message when data is successfully submited
    this.ResetForm();
  }

  ResetForm() {
    this.orderDetailForm.reset();
    this.orderDetailForm.controls['orderID'].setValue(this.orderID);
    this.isAdd = true;
  }

  onSelectOrder(order: OrderDetail) {
    console.warn(order);
    console.warn(this.orderDetailForm.controls['orderID'].value);
    this.orderDetailForm.controls['orderID'].setValue(this.orderID);
    this.orderDetailForm.controls['userName'].setValue(order.userName);
    this.orderDetailForm.controls['foodName'].setValue(order.foodName);
    this.orderDetailForm.controls['price'].setValue(order.price);
    this.orderDetailForm.controls['$key'].setValue(order.$key);
    this.isAdd = false;
  }

  UpdateOrderDetail() {
    // this.crudApi.UpdateOrderDetail(this.orderDetailForm.value);
    this.crudApi.UpdateOrderDetail(this.orderDetailForm.value);
    this.toastr.success(
      this.orderDetailForm.controls['userName'].value + ' successfully updated!'
    ); // Show success message when data is successfully submited
    this.ResetForm();
  }
  onDeleteOrder(orderDetail: OrderDetail) {
    this.crudApi.DeleteOrderDetail(orderDetail);
    this.toastr.success('deleted successfully!'); // Show success message when data is successfully submited
  }
}
