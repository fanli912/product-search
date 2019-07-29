import { Component, OnChanges, ChangeDetectorRef, Input } from "@angular/core";


@Component({
  selector: "app-photo-tab",
  templateUrl: "./photo-tab.component.html",
  styleUrls: ["./photo-tab.component.css"]
})
export class PhotoTabComponent {
  @Input() photos: any;

  private displayWidth: number;

  private _resized = false;
  private col1 = [];
  private col2 = [];
  private col3 = [];
  private col4 = [];

  constructor() {}



}
