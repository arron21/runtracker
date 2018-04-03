import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {AngularFirestore} from 'angularfire2/firestore';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-athlete-view',
  templateUrl: './athlete-view.component.html',
  styleUrls: ['./athlete-view.component.scss']
})
export class AthleteViewComponent implements OnInit {

  public athlete: any;
  public athleteId: any;
  public meets: any;

  constructor(
      // @Inject(MAT_DIALOG_DATA) public data: any,
      private db: AngularFirestore,
      private  activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // const athleteFromModalRef = this.data.athlete;

      this.activatedRoute.params.subscribe((params: Params) => {
          console.log(params);
          this.athleteId = params.athleteId;
      });

      this.athlete = this.db.collection('/team', ref => ref.where('id', '==', Number(this.athleteId))).valueChanges()
          .subscribe(res => {

              console.log(res);

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
