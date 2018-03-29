import {Component, Input, OnInit} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';

@Component({
  selector: 'app-meet',
  templateUrl: './meet.component.html',
  styleUrls: ['./meet.component.scss']
})
export class MeetComponent implements OnInit {

  @Input() meetObj: any;
  public meet: any;
  constructor(
      private db: AngularFirestore
  ) { }

  ngOnInit() {

    console.log(this.meetObj)

      this.db.collection('/meets', ref => ref.where('id', '==', Number(this.meetObj.eventId))).valueChanges()
          .subscribe(res => {
              const result = Object.keys(res).map(function(key) {
                  return res[key];
              });
              this.meet = result[0];
              console.log(this.meet);

          });
  }

}
