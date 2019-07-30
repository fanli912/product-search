import { Component, Input } from "@angular/core";


@Component({
  selector: "app-similar-tab",
  templateUrl: "./similar-tab.component.html"
})
export class SimilarTabComponent {
  @Input() similar;



  constructor() {}



}
