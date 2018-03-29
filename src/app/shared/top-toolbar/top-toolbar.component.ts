import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.scss']
})
export class TopToolbarComponent implements OnInit {
  @Input() titlestring: any;
  constructor(
      private _location: Location
  ) { }

  ngOnInit() {
  }

  backClicked() {
      this._location.back();
  }
}
