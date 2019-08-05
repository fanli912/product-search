import { Component, Input } from "@angular/core";

@Component({
  selector: "app-similar-tab",
  templateUrl: "./similar-tab.component.html",
  styleUrls:['./similar-tab.component.css']
})
export class SimilarTabComponent {
  @Input() similar :any;
  showMore: boolean = false;
  orderTypes = [
    "Ascending",
    "Decending"
  ];

  orderBy = [
    "Default Order",
    "Product Name",
    "Days Left",
    "Price",
    "Shipping Cost"
  ];

  selectedOrderType: number = 0;
  selectedOrderBy: number = 0;

  constructor() {
  }

  //sorting function for price and shopping cost
  mapOrder(pointers, review, key) {
    pointers.sort((a, b) => {
      if (review[a][key]["_value_"] > review[b][key]["_value_"]) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  dayLeft(str) {
    var end = 0
    for(var i=0; i<str.length; i++) {

       if(str.charAt(i) == "D") {
         break;
       }
    end++
    }
    return str.substring(1, end)

  }

  more() {
    this.showMore = true;
  }

  less() {
    this.showMore = false;
  }

  setOrderBy(type) {
    this.selectedOrderType = type;
    switch (type) {
      case 0: {
        this.setDefaultOrder();
        return;
      }
      case 1: {
        this.setProductName();
        return;
      }
      case 2: {
        this.setDaysLeft();
        return;
      }
      case 3: {
        this.setPrice();
        return;
      }
      case 4: {
        this.ShippingCost();
      }
    }
  }

  setDefaultOrder() {

  }

  setProductName(){
    this.similar.sort((a, b) => this.similar[a.title] - this.similar[b.title])
  }
  setDaysLeft() {

  }
  setPrice() {

  }

  ShippingCost() {

  }


}
