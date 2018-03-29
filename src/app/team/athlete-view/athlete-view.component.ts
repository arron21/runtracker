import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {AngularFirestore} from 'angularfire2/firestore';

@Component({
  selector: 'app-athlete-view',
  templateUrl: './athlete-view.component.html',
  styleUrls: ['./athlete-view.component.scss']
})
export class AthleteViewComponent implements OnInit {

  public athlete: any;
  public meets: any;

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private db: AngularFirestore
  ) { }

  ngOnInit() {
    const athleteFromModalRef = this.data.athlete;

      this.athlete = this.db.collection('/team', ref => ref.where('id', '==', athleteFromModalRef.id)).valueChanges()
          .subscribe(res => {
              const result = Object.keys(res).map(function(key) {
                  return res[key];
              });
              this.athlete = result[0];
              console.log( this.athlete);

              const meets = [];
              for (const i in result[0].meets) {
                  meets.push(result[0].meets[i]);
              }
              this.meets = meets;
          });
  }

}
