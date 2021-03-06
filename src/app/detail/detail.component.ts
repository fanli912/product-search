import { Component, NgZone, EventEmitter, Output } from "@angular/core";
import { DetailService } from "../service/detail.service";
import { Product } from "./product-info/product-info";
import { Seller } from "./seller-tab/seller";
@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.css"]
})

export class DetailComponent {

  private tabs = [
    { id: "info-tab", title: "Product" },
    { id: "seller-tab", title: "Seller" },
    { id: "similar-products-tab", title: "Similar Products" }
  ];
  @Output() slide = new EventEmitter<string>();
  details: any
  infoJson: Product
  sellerJson: Seller
  similarJson: any
  private activeId = "info-tab";

  constructor(
    private dService: DetailService,
    private zone: NgZone,
  ) {
    this.dService.details.subscribe(data => {
      this.zone.run(() => {
        this.details = data;
        this.setInfo(data);
        this.setSeller(data);
      });
    });
    this.dService.similar.subscribe(data => {
      this.zone.run(() => {
        this.similarJson = data;
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
  if (data["ReturnPolicy"]["ReturnsAccepted"]) {
    tmpJson.returnAccepted = data["ReturnPolicy"]["ReturnsAccepted"];
  }
  if (data["ReturnPolicy"]["ReturnsWithin"]) {
    tmpJson.returnWithin= data["ReturnPolicy"]["ReturnsWithin"];
  }
  if (data["ItemSpecifics"]["NameValueList"]) {
    tmpJson.specifics= data["ItemSpecifics"]["NameValueList"];
  }
  this.infoJson = tmpJson;
}

slideDetail() {
  this.slide.emit("right");
  this.activeId = "info-tab"
}


setSeller(data) {
  let tmpJson = new Seller();
  if (data["Seller"]["FeedbackScore"]) {
    tmpJson.feedbackScore= data["Seller"]["FeedbackScore"];
  }
  if (data["Seller"]["PositiveFeedbackPercent"]) {
    tmpJson.popularity= data["Seller"]["PositiveFeedbackPercent"];
  }
  if (data["Seller"]["FeedbackRatingStar"]) {
    tmpJson.ratingStar= data["Seller"]["FeedbackRatingStar"];
  }
  if (data["Seller"]["TopRatedSeller"]) {
    tmpJson.topRated= data["Seller"]["TopRatedSeller"];
  }

  this.sellerJson = tmpJson;
}


setActive(id) {
  this.activeId = id;
}


facebook() {
  let link = this.details["ViewItemURLForNaturalSearch"]
  let t = this.details["Title"]
  let p = this.details["CurrentPrice"]["Value"]
  let quote = "Buy "+t+" at $"+p+" from link below."
  let url = "https://www.facebook.com/dialog/share?app_id=409144946516326&display=popup&href="+link+"&quote="+quote;
  var newWin = window.open(url, "tweet", "height=600, width=600");
}




}

