import {
  Component,
  OnInit,
  OnChanges,
  Output,
  Input,
  EventEmitter
} from "@angular/core";
import { WishListService } from "../service/wishlist.service";
import { DetailService} from '../service/detail.service';

@Component({
  selector: "app-wishlist",
  templateUrl: "./wishlist.component.html",
  styleUrls: ["./wishlist.component.css"]
})
export class WishListComponent  {
  wishlist: any;
  @Output() slide = new EventEmitter<any>();

  constructor(private wService: WishListService, private dService: DetailService) {
    this.wService.wishlist.subscribe(
      data => {
    this.wishlist = data["allFav"];
    })

}
removeFavorite(key) {
  this.wService.removeWishList(key);
}

getDetails(itemId) {
  this.dService.getDetails(itemId);
  this.slide.emit({ slide: "left"});
}




}
