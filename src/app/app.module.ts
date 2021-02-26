// Angular dependencies
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

// Additional modules
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTableExporterModule } from 'mat-table-exporter';
import { QRCodeModule } from 'angular2-qrcode';
import { ChartsModule } from 'ng2-charts';
import { OrderModule } from 'ngx-order-pipe';

// Custom Modules
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';

// Components
import { AppComponent } from './app.component';
import {
  AdminPanelComponent,
  CardsBoardComponent,
  ChartComponent,
  HomeComponent,
  PopupComponent,
  ReportComponent,
  RoomComponent,
  NewProductModalComponent,
  ShareComponent,
  TextfieldPopupComponent,
  TicketPreviewComponent,
  TicketsComponent,
  TicketsListComponent,
  UserDetailsComponent,
  UsersListComponent,
  ChristmasLightsComponent,
} from './components';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    AdminPanelComponent,
    CardsBoardComponent,
    ChartComponent,
    HomeComponent,
    PopupComponent,
    ReportComponent,
    RoomComponent,
    NewProductModalComponent,
    ShareComponent,
    TextfieldPopupComponent,
    TicketPreviewComponent,
    TicketsComponent,
    TicketsListComponent,
    UserDetailsComponent,
    UsersListComponent,
    ChristmasLightsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatDialogModule,
    MatTableExporterModule,
    QRCodeModule,
    ChartsModule,
    OrderModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase, 'planningPoker'),
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
  ],
  entryComponents: [
    PopupComponent,
    TextfieldPopupComponent,
    UserDetailsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
