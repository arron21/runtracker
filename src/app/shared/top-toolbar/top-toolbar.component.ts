import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.scss']
})
export class TopToolbarComponent implements OnInit {
  @Input() titlestring: any;
  @Input() color: any;
  @Input() data: any;
  @Input() dataLabel: string;
  constructor(
      private _location: Location
  ) { }

  ngOnInit() {
    // console.log(this.data);
  }

  backClicked() {
      this._location.back();
  }
}
