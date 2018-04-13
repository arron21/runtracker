import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatAutocompleteModule,
    MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule,
    MatGridListModule,
    MatIconModule, MatInputModule,
    MatListModule, MatNativeDateModule, MatSortModule, MatTableModule, MatTabsModule,
    MatToolbarModule, MatTooltipModule
} from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AppRoutingModule} from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { TeamComponent } from './team/team.component';
import { SchoolComponent } from './school/school.component';
import { EventsComponent } from './events/events.component';
import {SharedModule} from './shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TeamService} from './core/services/team.service';
import {HttpClientModule} from '@angular/common/http';
import {MeetService} from './core/services/meet.service';
import { EventeditComponent } from './events/eventedit/eventedit.component';
import { AthleteEventEditComponent } from './team/athlete-event-edit/athlete-event-edit.component';

import { environment } from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import { AthleteViewComponent } from './team/athlete-view/athlete-view.component';
import {TopToolbarComponent} from './shared/top-toolbar/top-toolbar.component';
import {MeetComponent} from './shared/meet/meet.component';
import { EventaddComponent } from './events/eventadd/eventadd.component';
import { EventlistComponent } from './events/eventlist/eventlist.component';
import { TeamListComponent } from './team/team-list/team-list.component';
import { AthleteSkillAddComponent } from './team/athlete-skill-add/athlete-skill-add.component';


@NgModule({
  declarations: [
    AppComponent,

    DashboardComponent,
    TeamComponent,
    SchoolComponent,
    EventsComponent,
    EventeditComponent,
    AthleteEventEditComponent,
    AthleteViewComponent,
      TopToolbarComponent,
      MeetComponent,
      EventaddComponent,
      EventlistComponent,
      TeamListComponent,
      AthleteSkillAddComponent
  ],
  entryComponents: [AthleteEventEditComponent, EventaddComponent, AthleteViewComponent, AthleteSkillAddComponent],
  imports: [
    BrowserModule,
      AngularFireModule.initializeApp(environment.firebase, 'runtracker'),
      AngularFirestoreModule,
      FormsModule, ReactiveFormsModule,
    BrowserAnimationsModule,
      HttpClientModule,
    AppRoutingModule,
      MatButtonModule,
      MatCheckboxModule,
      MatToolbarModule,
      MatButtonModule,
      MatListModule,
      MatInputModule,
      MatIconModule,
      MatCardModule,
      MatDialogModule,
      MatChipsModule,
      MatTooltipModule,
      MatGridListModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatExpansionModule,
      MatTabsModule,
      MatAutocompleteModule,
      MatTableModule,
      MatSortModule
    // SharedModule,

  ],
  providers: [TeamService, MeetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
