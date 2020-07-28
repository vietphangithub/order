import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr

import {OrderService} from '../../shared/order.service';    // CRUD services API

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  public orderForm: FormGroup;  // Define FormGroup to student's form

  constructor(
    public crudApi: OrderService,  // CRUD API services
    public fb: FormBuilder,       // Form Builder service for Reactive forms
    public toastr: ToastrService  // Toastr service for alert message
    ) 
    { }

  ngOnInit(): void {
    this.studenForm();
    console.warn(new Date());
  }
  studenForm() {
    var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
    this.orderForm = this.fb.group({
      nameOrder: ['', [Validators.required, Validators.minLength(2)]],
      linkOrder: [''],
      discount:  0,
      createdBy: 'viet phan',
      createdDate: dateTime
      
    })  
  }
  submitOrderData(){
    
    this.crudApi.AddOrder(this.orderForm.value);
    this.toastr.success(this.orderForm.controls['nameOrder'].value + ' successfully added!'); // Show success message when data is successfully submited
    this.orderForm.reset();  // Reset form when clicked on reset button

  }

}
