import { Component, Input } from "@angular/core";
import { Seller } from "./seller";


@Component({
  selector: "app-seller-tab",
  templateUrl: "./seller-tab.component.html",
  styleUrls: ["./seller-tab.component.css"]
})
export class SellerTabComponent {
  @Input() seller: Seller;

  constructor() {}

  star() {
    if (parseInt(this.seller.feedbackScore)> 5000) {
      return true;
    }
    return false;
  }

}
