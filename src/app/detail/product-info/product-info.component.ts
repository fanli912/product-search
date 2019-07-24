import { Component, OnInit, OnChanges, Input } from "@angular/core";
import { Product } from "./product-info";
import { SearchService } from "../../service/search.service";
import { DetailService } from "../../service/detail.service";


@Component({
  selector: "app-info-tab",
  templateUrl: "./product-info.component.html"
})
export class InfoTabComponent {
  @Input() product: Product;

  constructor() {}

}
