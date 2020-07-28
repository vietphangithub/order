import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms'; // Reactive form services
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr
import { ActivatedRoute, Router } from '@angular/router'; // ActivatedRoue is used to get the current associated components information.

import { GroupService } from '../../shared/group/group.service'; // CRUD services API
import { AccountService } from '../../shared/account/account.service'; // CRUD services API
import { Group } from './../../shared/group/group';

@Component({
  selector: 'app-acount-detail',
  templateUrl: './acount-detail.component.html',
  styleUrls: ['./acount-detail.component.css']
})
export class AcountDetailComponent implements OnInit {
  accountForm: FormGroup;
  Groups: Group[];
  isAdd: boolean;

  constructor(
    public groupService: GroupService, // CRUD API services
    public accountService: AccountService, // CRUD API services
    public fb: FormBuilder, // Form Builder service for Reactive forms
    public toastr: ToastrService, // Toastr service for alert message

    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.studenForm();
    this.GetListGroup();
  }

  studenForm() {
    var today = new Date();
    var date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    var time =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    var dateTime = date + ' ' + time;
    this.accountForm = this.fb.group({
      $key: [''],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: [''],
      phone: [''],
      groupID: [''],
      groupName: [''],
      roleID: 'admin',
      userName: [''],
      password: [''],
      createdBy: 'viet phan',
      createdDate: dateTime
    });
    this.isAdd = true;
  }

  GetListGroup() {
    let s = this.groupService.GetListGroup();
    console.warn('s = ', s);
    s.snapshotChanges().subscribe(data => {
      // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Groups = [];
      data.forEach(item => {
        let a = item.payload.toJSON();

        console.warn('a = ', a);
        a['$key'] = item.key;
        this.Groups.push(a as Group);
        console.warn('Groups = ', this.Groups);
      });
    });
  }

  submitForm() {
    let groupID = this.accountForm.controls['groupID'].value;
    let groupName = this.getGroupName(groupID);

    this.accountForm.controls['groupName'].setValue(groupName);
    this.accountForm.controls['roleID'].setValue('admin');
    console.warn('add acount: ', this.accountForm.value);
    this.accountService.AddGroup(this.accountForm.value);
    this.toastr.success(
      this.accountForm.controls['firstName'].value +
        '' +
        this.accountForm.controls['lastName'].value +
        ' successfully added!'
    ); // Show success message when data is successfully submited
    this.ResetForm(); // Reset form when clicked on reset button
  }

  GetAccount($event) {
    let account = $event;
    console.log('Data Receive = ', account);
    this.accountForm.setValue(account);
    this.isAdd = false;
  }

  ResetForm() {
    this.accountForm.reset();
    this.isAdd = true;
  }

  UpdateAccount() {
    let groupID = this.accountForm.controls['groupID'].value;
    let groupName = this.getGroupName(groupID);

    this.accountForm.controls['groupName'].setValue(groupName);
    this.accountService.UpdateAccount(this.accountForm.value);
    this.toastr.success(
      this.accountForm.controls['firstName'].value +
        '' +
        this.accountForm.controls['lastName'].value +
        ' updated successfully!'
    ); // Show success message when data is successfully submited
    this.ResetForm(); // Reset form when clicked on reset button
  }

  getGroupName(id: string) {
    let groupName = '';
    this.Groups.forEach(function(x) {
      if (x.$key == id) return (groupName = x.groupName);
    });
    return groupName;
  }
}
