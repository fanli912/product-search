import { Component, Input, EventEmitter,Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SearchService } from "../service/search.service";
import { PagerService } from '../service/pager.service';
import { DetailService} from '../service/detail.service';
import { WishListService} from '../service/wishlist.service';


@Component ({
    selector:'app-result-table',
    templateUrl: './result-table.component.html',
    styleUrls:['./result-table.component.css']

})

export class ResultTalbeComponent{

  showResult = false;
  resultJson = null;
  progress = false;
  myMap = new Map()

  @Input("item") selectedRow: any;
  @Output() slide = new EventEmitter<any>();

    // array of all items to be paged
    private allItems;

    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];


  constructor(private searchService: SearchService, private http: HttpClient, private pagerService: PagerService, private dService: DetailService, private wService:WishListService) {
    this.searchService.resultJson.subscribe(data => {
      this.resultJson = data
      this.showResult = true;
      this.allItems = data
      // initialize to page 1
      this.setPage(1);

  });
}
 simplifyTitle(title) {
   var end;
   var sub = title;
   if(title.length > 35) {
       for(var i=35; i>=0; i--) {
         if(title.charAt(i) == " ") {
             end = i;
             break;
         }
     }
     sub = title.substring(0, end).concat("...")
   }
   return sub;
 }

 setPage(page: number) {
  // get pager object from service
  this.pager = this.pagerService.getPager(this.allItems.length, page);

  // get current page of items
  this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
}

getDetails(itemId) {
  this.highlightRow(itemId);
  this.dService.getDetails(itemId);
  this.slide.emit({ slide: "left"});
}


getSimilar(itemId) {
  this.dService.getSimilar(itemId);
}

highlightRow(itemId) {
  this.selectedRow = itemId;
}

setFavorite(index) {
  //  if (this.isFavorite[index]) {
  //    this.wService.removeFavorite(this.pagedItems[index]["itemId"]);
  //    this.isFavorite[index] = false;
  //  } else {
    this.wService.saveFavorite(
      this.pagedItems[index]["galleryURL"],
      this.pagedItems[index]["title"],
      this.pagedItems[index]["sellingStatus"][0]["currentPrice"][0]["__value__"],
      this.pagedItems[index]["shippingInfo"][0]["shippingType"][0],
      this.pagedItems[index]["sellerInfo"][0]["sellerUserName"][0],
      this.pagedItems[index]["itemId"])

  //   this.isFavorite[index] = true;
  //  }
}

// checkFavorite() {
//    if (this.resultJson) {
//      let place_id_arr = this.resultJson.map(data => data.place_id);
//      this.isFavorite = this.wService.isFavorited(place_id_arr);
//   // }
// }

showDetails() {
  this.slide.emit({ slide: "left"});
}


}
