import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Use RouterModule, Routes for activating routing in angular
import { RouterModule, Routes } from '@angular/router';

// Include components for in which router service to be used
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { StudentComponent } from './student/student.component';
import {AddOrderComponent} from './order/add-order/add-order.component';
import {OrderDetailComponent} from './order-detail/order-detail.component';
import {GroupDetailComponent} from './group/group-detail/group-detail.component';
import {AcountDetailComponent} from './acount/acount-detail/acount-detail.component';
import {LoginComponent} from './login/login.component';

// Routes array define component along with the path name for url
const routes: Routes = [
  { path: '', redirectTo: '/add-order/0', pathMatch: 'full' },
  { path: 'register-student', component: AddStudentComponent },
  { path: 'view-students', component: StudentsListComponent },
  { path: 'edit-student/:id', component: EditStudentComponent },
  { path: 'student', component: StudentComponent },
  { path: 'add-order/:id', component:AddOrderComponent},
  { path: 'order-detail/:id', component:OrderDetailComponent},
  { path: 'group', component:GroupDetailComponent},
  { path: 'group/:id', component:GroupDetailComponent},
  { path: 'account-detail', component:AcountDetailComponent},
  { path: 'account-detail/:id', component:AcountDetailComponent},
  { path: 'login', component:LoginComponent},


];

// Import RouterModule and inject routes array in it and dont forget to export the RouterModule
@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
