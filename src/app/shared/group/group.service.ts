import { Injectable } from '@angular/core';
import {Group} from './group';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from '@angular/fire/database'; // Firebase modules for Database, Data list and Single object


@Injectable({
  providedIn: 'root'
})
export class GroupService {
  listGroup: AngularFireList<any>; // Reference to Student data list, its an Observable
  group: AngularFireObject<any>; // Reference to Student object, its an Observable too

  constructor(private db: AngularFireDatabase) { }

  AddGroup(group: Group) {
    this.listGroup = this.db.list('/group');
    this.listGroup.push({
      groupName : group.groupName,
      email : group.email,
      phone : group.phone,
      address : group.address,
      createdBy : group.createdBy,
      createdDate : group.createdDate,

    });
  }
  GetListGroup() {
    this.listGroup = this.db.list('group');
    return this.listGroup;
  }
  GetGroup(key: string) {
    this.group = this.db.object('/group/' + key);
    return this.group;
  }
  UpdateOrderDetail(group: Group)
  {
    console.log(group);
    this.group.update({
      groupName : group.groupName,
      email : group.email,
      phone : group.phone,
      address : group.address,
      createdBy : group.createdBy,
      createdDate : group.createdDate,
    })
  }
    // Delete Student Object
    DeleteGroup(id: string) { 
      this.group = this.db.object('group/'+id);
      this.group.remove();
    }
}
