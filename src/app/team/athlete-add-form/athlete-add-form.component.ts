import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {AngularFirestore} from 'angularfire2/firestore';

@Component({
  selector: 'app-athlete-add-form',
  templateUrl: './athlete-add-form.component.html',
  styleUrls: ['./athlete-add-form.component.scss']
})
export class AthleteAddFormComponent implements OnInit {
    public teamForm: FormGroup;
    public firstName: any;
    public lastName: any;
    @ViewChild('firstNameInput') firstNameInput: ElementRef;

    constructor(
        private db: AngularFirestore,
        public snackBar: MatSnackBar,
        public dialogRef: MatDialogRef<AthleteAddFormComponent>
    ) { }

  ngOnInit() {
      this.firstName = '';
      this.lastName = '';
  }

  addAthlete() {
      const athleteObj = {
          id: new Date().getTime(),
          firstName: this.firstName || '',
          lastName: this.lastName || '',
          meets: [],
          pr: {}
      };

      this.db.collection('/team').doc((athleteObj.id).toString()).set(athleteObj).then(() => {
          this.snackBar.open(`${this.firstName} ${this.lastName} Added`, '', {
              duration: 1200,
          });
          this.dialogRef.close();
      }, () => {
      });
      // this.firstName = '';
      // this.lastName = '';
      // this.firstNameInput.nativeElement.focus();
  }
}
