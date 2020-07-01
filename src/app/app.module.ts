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
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { CardsBoardComponent } from './components/cards-board/cards-board.component';
import { ChartComponent } from './components/chart/chart.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { TicketsListComponent } from './components/tickets/tickets-list/tickets-list.component';
import { HomeComponent } from './components/home/home.component';
import { ShareComponent } from './components/share/share.component';
import { ReportComponent } from './components/report/report.component';
import { PopupComponent } from './components/share/popup/popup.component';
import { RoomComponent } from './components/room/room.component';
import { TextfieldPopupComponent } from './components/tickets/textfield-popup/textfield-popup.component';
import { TicketPreviewComponent } from './components/room/ticket-preview/ticket-preview.component';
import { UserDetailsComponent } from './components/room/user-details/user-details.component';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    AdminPanelComponent,
    CardsBoardComponent,
    HomeComponent,
    ShareComponent,
    PopupComponent,
    TicketsComponent,
    TicketsListComponent,
    ReportComponent,
    RoomComponent,
    ChartComponent,
    TextfieldPopupComponent,
    TicketPreviewComponent,
    UserDetailsComponent,
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
