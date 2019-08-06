import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class WishListService {
  private _wishlist = new Subject();
  wishlist = this._wishlist.asObservable();

  private _isStorageChange = new Subject();
  isStorageChange = this._isStorageChange.asObservable();

  page = 1;

  constructor() {}

  saveFavorite(
    name: string,
    vicinity: string,
    place_id: string,
    icon_url: string,
    key: string
  ) {
    let timestamp = new Date();
    let favJson = {
      name: name,
      address: vicinity,
      placeId: place_id,
      icon: icon_url,
      timestamp: timestamp.getTime()
    };
    localStorage.setItem(key, JSON.stringify(favJson));


  }



}
