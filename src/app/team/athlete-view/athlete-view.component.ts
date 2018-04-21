import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {AngularFirestore} from 'angularfire2/firestore';
import {ActivatedRoute, Params} from '@angular/router';
import {AthleteSkillAddComponent} from '../athlete-skill-add/athlete-skill-add.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-athlete-view',
  templateUrl: './athlete-view.component.html',
  styleUrls: ['./athlete-view.component.scss']
})
export class AthleteViewComponent implements OnInit, AfterViewInit {

  public athlete: any;
  public athleteId: any;
  public meets: any;
  public eventTypes: Array<any> = [];
  public eventList: Array<any> = [];
  public eventValues: Array<any> = [];

  columns: any;

  public dataSource: Array<any> = [];
  displayedColumns = ['date', 'score'];
  @ViewChild(MatSort) sort: MatSort;


    constructor(
      // @Inject(MAT_DIALOG_DATA) public data: any,
      private db: AngularFirestore,
      private  activatedRoute: ActivatedRoute,
      public dialog: MatDialog,
  ) {
  }

    ngAfterViewInit() {
    }

  ngOnInit() {
    // const athleteFromModalRef = this.data.athlete;

      this.activatedRoute.params.subscribe((params: Params) => {
          console.log(params);
          this.athleteId = params.athleteId;
      });

      this.athlete = this.db.collection('/team', ref => ref.where('id', '==', Number(this.athleteId))).valueChanges()
          .subscribe(res => {

              const result = Object.keys(res).map(function(key) {
                  return res[key];
              });
              this.athlete = result[0];
              this.eventList = this.athlete.events


              this.afterAthleteLoad();

              if (!this.eventList) {
                  return false;
              }
              this.eventValues = Object.values(this.eventList);
              for (let i = 0; i < this.eventValues.length; i++) {
                  this.dataSource[i] = new MatTableDataSource(this.eventValues[i]);
                  // this.dataSource[i].sort = {active: "score", direction: "desc"};
                  // this.dataSource[i].sortData('score', 'desc');
              }


              const meets = [];
              for (const i in result[0].meets) {
                  meets.push(result[0].meets[i]);
              }
              this.meets = meets;

          });


      this.columns = [
          { prop: 'date' },
          { prop: 'score' },
      ];
  }

  afterAthleteLoad() {
      this.listEventTypes();
      this.getPr();

  }



    addEventType(type?) {
        const dialogRef = this.dialog.open(AthleteSkillAddComponent, {
            data:  {
                athlete: this.athlete,
                events: this.eventTypes,
                type: type
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });

    }

    listEventTypes() {
        const eventTypeArray = [];
        for (var key in this.athlete.events) {
            // skip loop if the property is from prototype
            if (!this.athlete.events.hasOwnProperty(key)) {
                continue;
            }
            eventTypeArray.push(key);
        }
        this.eventTypes = eventTypeArray;
    }

    sortTableData(e, table) {
        table.dataSource.sortData(e.active, e.direction);
        table.renderRows();
    }

    getPr(type?) {
    }
}
