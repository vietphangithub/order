
import { Component,OnInit, Input, Output, EventEmitter } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms'; // Reactive form services
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr

import { GroupService } from '../../shared/group/group.service'; // CRUD services API
import { Group } from '../../shared/group/group';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.css']
})
export class ListGroupComponent implements OnInit {
  listGroup: Group[];
  message: string = "Hello Angular!";
  constructor(
    public GroupService: GroupService, // CRUD API services
    public fb: FormBuilder, // Form Builder service for Reactive forms
    public toastr: ToastrService // Toastr service for alert message

  ) { }

  ngOnInit(): void {
    let s = this.GroupService.GetListGroup();
    s.snapshotChanges().subscribe(data => {
      // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.listGroup = [];
      data.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.listGroup.push(a as Group);
      });
    });

    console.warn(11, this.listGroup);
    
  }
  
  @Output() messageEvent = new EventEmitter<string>();
  // This method raises the custom event. We will bind this
  // method to the change event of all the 3 radio buttons
 
  sendGroupID(groupID : string) {
    console.log('groupID = ', groupID);
    this.messageEvent.emit(groupID);
  }

  onDeleteGroup(group : Group){
    console.warn('delete: ', group.$key);
    this.GroupService.DeleteGroup(group.$key);
    this.toastr.success(group.groupName + ' successfully deleted!'); // Alert message will show up when student successfully deleted.

  }



}
