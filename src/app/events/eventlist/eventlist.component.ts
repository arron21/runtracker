import { Component, OnInit } from '@angular/core';
import {EventeditComponent} from '../eventedit/eventedit.component';
import {EventaddComponent} from '../eventadd/eventadd.component';
import {AngularFirestore} from 'angularfire2/firestore';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {MeetService} from '../../core/services/meet.service';

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.scss']
})
export class EventlistComponent implements OnInit {

    public meets: any;

    constructor(
      private fb: FormBuilder,
      private meetService: MeetService,
      private route: ActivatedRoute,
      private router: Router,
      private db: AngularFirestore,
      public dialog: MatDialog,
  ) { }

  ngOnInit() {
      this.getMeets();

  }

    getMeets() {
        this.db.collection('/meets').valueChanges()
            .subscribe(res => {
                const result = Object.keys(res).map(function(key) {
                    return res[key];
                });
                this.meets = result;
                console.log(this.meets);
            });
    }

    // editMeetModal(meet) {
    //     let dialogRef = this.dialog.open(EventeditComponent, {
    //         // width: '250px',
    //         data: {'meet': meet}
    //     });
    //
    //     dialogRef.afterClosed().subscribe(result => {
    //         console.log('The dialog was closed');
    //         // this.animal = result;
    //     });
    // }
    editMeet(meet) {
      // console.log(meet);
      // this.router.navigate([`../${meet.id}`]);
        // let dialogRef = this.dialog.open(EventeditComponent, {
        //     // width: '250px',
        //     data: {'meet': meet}
        // });
        //
        // dialogRef.afterClosed().subscribe(result => {
        //     console.log('The dialog was closed');
        //     // this.animal = result;
        // });
    }


    onEventAddModal() {
        let dialogRef = this.dialog.open(EventaddComponent, {});

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            // this.animal = result;
        });
    }


}
