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
    image: string,
    title: string,
    price: string,
    shipping: string,
    key: string,
    zip: string,
    seller: string
  ) {
    let timestamp = new Date();
    let wishJson = {
      image: image,
      title: title,
      price: price,
      shipping: shipping,
      zip:zip,
      seller:seller,

      timestamp: timestamp.getTime()
    };
    localStorage.setItem(key, JSON.stringify(wishJson));
    this.getAllFavorite(this.page);

  }
  getAllFavorite(page) {
    this.page = page;
    let favPerPage = 20;
    let allFavorite = [];
    let flag = favPerPage;
    let localStorageArray = new Array(localStorage.length);
    for (let i = 0; i < localStorage.length; i++) {
      localStorageArray[i] = JSON.parse(
        localStorage.getItem(localStorage.key(i))
      );
    }

    localStorageArray.sort((a, b) => {
      if (a.timestamp > b.timestamp) {
        return 1;
      } else {
        return -1;
      }
    });
    if ((page - 1) * favPerPage == localStorage.length) {
      // last item
      this.page--;
      page--;
      if (this.page == 0) {
        this.page = 1;
        this._wishlist.next({ allFav: null, flag: null });
        this._isStorageChange.next(true);
        return;
      }
    }

    for (
      let i = (page - 1) * favPerPage;
      i < localStorage.length && i < page * favPerPage;
      i++, flag--
    ) {
      // let key = localStorage.key(i);
      let value = localStorageArray[i];
      allFavorite.push(value);
    }

    // return allFavorite;
    let returnJson = {
      allFav: allFavorite,
      flag: flag
    };
    this._wishlist.next(returnJson);
    this._isStorageChange.next(true);
  }
  removeFavorite(key: string) {
    localStorage.removeItem(key);
    this.getAllFavorite(this.page);
  }


}
