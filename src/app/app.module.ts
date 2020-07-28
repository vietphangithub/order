import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { AppRoutingModule } from './app-routing.module';

// Import below modules for NGX Toastr
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
// NGX Pagination
import { NgxPaginationModule } from 'ngx-pagination';
import { StudentsListComponent } from './students-list/students-list.component';
import { MenuComponent } from './menu/menu.component';
import { StudentComponent } from './student/student.component';
import {AddOrderComponent} from './order/add-order/add-order.component';
import { ListOrdersComponent } from './order/list-orders/list-orders.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { CustomUrlPipe } from './custom-url.pipe';
import { MycurrencyPipePipe } from './mycurrency-pipe.pipe';
import { GroupDetailComponent } from './group/group-detail/group-detail.component';
import { ListGroupComponent } from './group/list-group/list-group.component';
import { AcountDetailComponent } from './acount/acount-detail/acount-detail.component';
import { ListAcountComponent } from './acount/list-acount/list-acount.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AddStudentComponent,
    EditStudentComponent,
    StudentsListComponent,
    MenuComponent,
    StudentComponent,
    AddOrderComponent,
    ListOrdersComponent,
    OrderDetailComponent,
    CustomUrlPipe,
    MycurrencyPipePipe,
    GroupDetailComponent,
    ListGroupComponent,
    AcountDetailComponent,
    ListAcountComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,

  AngularFireModule.initializeApp(environment.firebase),
  AngularFirestoreModule, // imports firebase/firestore, only needed for database features
  AngularFireAuthModule, AppRoutingModule, // imports firebase/auth, only needed for auth features

  BrowserAnimationsModule, // required animations module
  ToastrModule.forRoot(), // ToastrModule added

  NgxPaginationModule,  // Include it in imports array



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
