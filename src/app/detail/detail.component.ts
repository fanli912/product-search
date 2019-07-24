import { Component, OnInit, NgZone, EventEmitter, Output } from "@angular/core";
import { SearchService } from "../service/search.service";
import { DetailService } from "../service/detail.service";
import { Product } from "./product-info/product-info";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.css"]
})

export class DetailComponent {

  private tabs = [
    { id: "product-tab", title: "Product" },
    { id: "photos-tab", title: "Photos" },
    { id: "shipping-tab", title: "Shipping" },
    { id: "sellers-tab", title: "Seller" },
    { id: "similar-products-tab", title: "Similar Products" }
  ];
  @Output() slide = new EventEmitter<string>();
  details: any;
  infoJson: Product;
  private activeId = "info-tab";

  constructor(
    private dService: DetailService,
    private zone: NgZone,
  ) {
    this.dService.details.subscribe(data => {
      this.zone.run(() => {
        this.details = data;
        this.setInfo(data);
        console.log(this.details)
      });
    });
}

setInfo(data) {
  let tmpJson = new Product();
  if (data["PictureURL"]) {
    tmpJson.images = data["PictureURL"];
  }
  if (data["Subtitle"]) {
    tmpJson.subtitle= data["Subtitle"];
  }
  if (data["CurrentPrice"]["Value"]) {
    tmpJson.price = data["CurrentPrice"]["Value"];
  }
  if (data["Location"]) {
    tmpJson.location = data["Location"];
  }
  if (data["ReturnPolicy"]) {
    tmpJson.policy = data["ReturnPolicy"]["ReturnsAccepted"];
  }
  this.infoJson = tmpJson;
}


}

