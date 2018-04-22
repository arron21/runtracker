import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TeamService} from '../../core/services/team.service';
import {AngularFirestore} from 'angularfire2/firestore';
import {MatDialog, MatSnackBar} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AthleteViewComponent} from '../athlete-view/athlete-view.component';
import {AthleteAddFormComponent} from '../athlete-add-form/athlete-add-form.component';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

    public team: any;
    public loading: Boolean;

    constructor(private fb: FormBuilder,
              private teamService: TeamService,
              private db: AngularFirestore,
              public snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit() {
      this.loadTeam();
  }

    loadTeam() {
        // let team = [];
        this.loading = true;
        this.db.collection('/team').valueChanges()
            .subscribe(res => {
                const result = Object.keys(res).map(function(key) {
                    return res[key];
                });
                this.team = result;
                this.loading = false;
                // console.log(this.team);
            });
    }


    athleteModal(athlete) {
        let dialogRef = this.dialog.open(AthleteViewComponent, {
            width: '250px',
            data: {'athlete': athlete}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            // this.animal = result;
        });
    }

    viewAthlete(athlete) {
        // let dialogRef = this.dialog.open(AthleteViewComponent, {
        //     width: '250px',
        //     data: {'athlete': athlete}
        // });
        //
        // dialogRef.afterClosed().subscribe(result => {
        //     console.log('The dialog was closed');
        //     // this.animal = result;
        // });
    }

    editAthlete(athlete) {
        console.log(athlete);
        const docId = athlete.id.toString();
        // this.db.collection("team").doc(docId).delete().then(() => {
        //     console.log("Document successfully deleted!");
        //     this.snackBar.open(`${athlete.firstName} ${athlete.lastName} Deleted`, '', {
        //         duration: 1200,
        //     });
        //
        // }).catch(function(error) {
        //     console.error("Error removing document: ", error);
        // });


    }

    deleteAthlete(athlete) {
        console.log(athlete);
        const docId = athlete.id.toString();
        this.db.collection("team").doc(docId).delete().then(() => {
            console.log("Document successfully deleted!");
            this.snackBar.open(`${athlete.firstName} ${athlete.lastName} Deleted`, '', {
                duration: 1200,
            });

        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }

    onAthleteAddModal() {
        console.log('test');
        let dialogRef = this.dialog.open(AthleteAddFormComponent, {
            width: '250px',
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            // this.animal = result;
        });
    }

}
