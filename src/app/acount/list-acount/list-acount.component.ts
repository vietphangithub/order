import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
import { Account } from './../../shared/account/account';

@Component({
  selector: 'app-list-acount',
  templateUrl: './list-acount.component.html',
  styleUrls: ['./list-acount.component.css']
})
export class ListAcountComponent implements OnInit {
  accounts: Account[];
  accountsDB: Account[];
  groupID: string;
  Groups: Group[];
  groupByGroupID : string = '0';

  constructor(
    public groupService: GroupService, // CRUD API services
    public accountService: AccountService, // CRUD API services
    public fb: FormBuilder, // Form Builder service for Reactive forms
    public toastr: ToastrService, // Toastr service for alert message

    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log(params.get('id'));
      this.groupID = params.get('id');
      console.log('groupID = ', this.groupID);
    });
    this.GetListAccount();
    this.GetListGroup();
  }

  GetListAccount() {
    let s = this.accountService.GetListAccount();
    console.warn('s = ', s);
    s.snapshotChanges().subscribe(data => {
      // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.accounts = [];
      this.accountsDB = [];
      data.forEach(item => {
        let a = item.payload.toJSON();

        console.warn('a = ', a);
        a['$key'] = item.key;

       
        this.accountsDB.push(a as Account);
        console.warn('Accounts = ', this.accounts);
        this.filterGroup(this.groupByGroupID);
      });
    });
  }

  @Output() messageEvent = new EventEmitter<Account>();
  onSelectAccount(account: Account) {
    console.log('account = ', account);
    this.messageEvent.emit(account);
  }

  onDeleteAccount(account: Account){
    this.accountService.DeleteAccount(account);
    this.toastr.success(account.firstName + '' +  account.lastName + ' deleted successfully!'); // Show success message when data is successfully submited
   

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

  filterGroup(filterVal: any) {
    console.log('this.groupByGroupID = ',this.groupByGroupID);
    if (filterVal == '0') {
      this.accounts = this.accountsDB;
    }
    else {
      this.accounts = this.accountsDB.filter(function(x) {
        return x.groupID == filterVal;
      });
    }
  }
}
