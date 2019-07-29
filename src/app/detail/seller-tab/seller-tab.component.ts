import { Component, Input } from "@angular/core";
import { Seller } from "./seller";


@Component({
  selector: "app-seller-tab",
  templateUrl: "./seller-tab.component.html"
})
export class SellerTabComponent {
  @Input() seller: Seller;

  constructor() {}


}
