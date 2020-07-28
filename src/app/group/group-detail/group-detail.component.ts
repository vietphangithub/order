import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr
import { ActivatedRoute, Router } from '@angular/router'; // ActivatedRoue is used to get the current associated components information.

import {GroupService} from '../../shared/group/group.service';    // CRUD services API

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {

  public groupForm: FormGroup;  // Define FormGroup to student's form
  orderID: string = '';
  isAddGroup : boolean = true;

  constructor(
    public crudApi: GroupService,  // CRUD API services
    public fb: FormBuilder,       // Form Builder service for Reactive forms
    public toastr: ToastrService,  // Toastr service for alert message
   
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.studenForm();
    this.route.paramMap.subscribe(params => {
      console.log(params.get('id'));
      this.orderID = params.get('id');
      
    });
  }


  studenForm() {
    var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
    this.groupForm = this.fb.group({
      groupName: ['', [Validators.required, Validators.minLength(2)]],
      email: [''],
      phone:  [''],
      address:  [''],
      createdBy: 'viet phan',
      createdDate: dateTime
     
    })  
  }
  submitGroupData(){
    this.crudApi.AddGroup(this.groupForm.value);
    this.toastr.success(this.groupForm.controls['groupName'].value + ' successfully added!'); // Show success message when data is successfully submited
    this.groupForm.reset();  // Reset form when clicked on reset button

  }


  UpdateGroup(){
    // this.crudApi.UpdateOrderDetail(this.orderDetailForm.value);
    this.crudApi.UpdateOrderDetail(this.groupForm.value);
    this.toastr.success(
      this.groupForm.controls['groupName'].value + ' successfully updated!'
    ); // Show success message when data is successfully submited
    this.reset();
  }

  getGroup(key:string){
    let grouptmp  = this.crudApi.GetGroup(key);
    return grouptmp;

  }

  getGroupID($event) {
    console.log(222, $event);
    let groupID : string;
    groupID = $event;

    this.getGroup(groupID).valueChanges().subscribe(data => {
      console.warn(11,data);
      this.groupForm.setValue(data)  // Using SetValue() method, It's a ReactiveForm's API to store intial value of reactive form 
    });
     
    this.isAddGroup = false;

  }
  reset(){
    this.groupForm.reset();
    this.isAddGroup = true;
  }

 


}
