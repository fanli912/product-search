import { Component, Input } from "@angular/core";
import { Shipping } from "./shipping";


@Component({
  selector: "app-shipping-tab",
  templateUrl: "./shipping-tab.component.html"
})
export class ShippingTabComponent {
  @Input() shipping: Shipping;

  constructor() {}

  tick(shipping) {
    if(!shipping) {
      return false
    }
    return true
  }


}
