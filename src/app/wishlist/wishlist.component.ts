import {
  Component,
  OnInit,
  OnChanges,
  Output,
  Input,
  EventEmitter
} from "@angular/core";
import { WishListService } from "../service/wishlist.service";

@Component({
  selector: "app-wishlist",
  templateUrl: "./wishlist.component.html",
  styleUrls: ["./wishlist.component.css"]
})
export class WishListComponent  {
  wishlist: any;
  @Output() slide = new EventEmitter<any>();

  constructor(private wService: WishListService) {
    this.wService.wishlist.subscribe(
      data => {
    this.wishlist = data["allFav"];
    })

}
}
