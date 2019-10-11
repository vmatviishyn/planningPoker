// Angular dependencies
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Additional modules
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material';
import { QRCodeModule } from 'angular2-qrcode';
import { ChartsModule } from 'ng2-charts';

// Custom Modules
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';

// Components
import { AppComponent } from './app.component';
import { CardsBoardComponent } from './components/cards-board/cards-board.component';
import { ChartComponent } from './components/chart/chart.component';
import { ListComponent } from './components/list/list.component';
import { HomeComponent } from './components/home/home.component';
import { ShareComponent } from './components/share/share.component';
import { PopupComponent } from './components/share/popup/popup.component';
import { RoomComponent } from './components/room/room.component';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    CardsBoardComponent,
    HomeComponent,
    ShareComponent,
    PopupComponent,
    ListComponent,
    RoomComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatDialogModule,
    QRCodeModule,
    ChartsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase, 'planningPoker'),
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
  ],
  entryComponents: [
    PopupComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
