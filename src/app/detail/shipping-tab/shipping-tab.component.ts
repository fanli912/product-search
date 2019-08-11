import { Component, Input } from "@angular/core";
import { Shipping } from "./shipping";
import { style } from '@angular/animations';


@Component({
  selector: "app-shipping-tab",
  templateUrl: "./shipping-tab.component.html",
  styleUrls:['./shipping-tab.component.css']
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
