import { Injectable } from '@angular/core';
import {Account} from '../account/account';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from '@angular/fire/database'; // Firebase modules for Database, Data list and Single object


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  listAccount: AngularFireList<any>; // Reference to Account data list, its an Observable
  account: AngularFireObject<any>; // Reference to Account object, its an Observable too\

  constructor(private db: AngularFireDatabase) { }

  AddGroup(account: Account) {
    this.listAccount = this.db.list('/account');
    this.listAccount.push({
      firstName : account.firstName,
      lastName : account.lastName,
      email : account.email,
      phone : account.phone,
      groupID : account.groupID,
      groupName : account.groupName,
      roleID : account.roleID,
      createdBy : account.createdBy,
      createdDate : account.createdDate,
      userName: account.userName,
      password: account.password,

    });
  }

  UpdateAccount(account: Account){
    this.account = this.db.object('/account/' + account.$key);
    this.account.update({
      firstName : account.firstName,
      lastName : account.lastName,
      email : account.email,
      phone : account.phone,
      groupID : account.groupID,
      groupName : account.groupName,
      roleID : account.roleID,
      userName: account.userName,
      password: account.password,
    });


  }

  DeleteAccount(account: Account){
    this.account = this.db.object('/account/' + account.$key);
    this.account.remove();
  }

  GetListAccount() {
    this.listAccount = this.db.list('account');
    return this.listAccount;
  }


}
