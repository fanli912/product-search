import { Component, Input } from "@angular/core";


@Component({
  selector: "app-similar-tab",
  templateUrl: "./similar-tab.component.html"
})
export class SimilarTabComponent {
  @Input() similar :any;

  constructor() {
  }

  //sorting function for price and shopping cost
  mapOrder(pointers, review, key) {
    pointers.sort((a, b) => {
      if (review[a][key]["_value_"] > review[b][key]["_value_"]) {
        return 1;
      } else {
        return -1;
      }
    });
  }




}
