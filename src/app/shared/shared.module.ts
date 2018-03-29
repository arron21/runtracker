import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopToolbarComponent } from './top-toolbar/top-toolbar.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule, MatListModule, MatToolbarModule} from '@angular/material';
import { MeetComponent } from './meet/meet.component';

export const SHARED_COMPONENTS = [
];
@NgModule({
  imports: [
      CommonModule,
  ],
  declarations: [SHARED_COMPONENTS],
  exports: [SHARED_COMPONENTS]
})
export class SharedModule { }
