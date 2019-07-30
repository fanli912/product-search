
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})

export class DetailService {

  private _details = new Subject();
  details = this._details.asObservable();

  private _photos = new Subject();
  photos = this._photos.asObservable();

  private _similar = new Subject();
  similar = this._similar.asObservable();

  detailJson: any;
  photoJson: any;
  similarJson:any;

  constructor(private http: HttpClient) {

  }

  getDetails(itemId) {
    this.http
      .post("http://localhost:3000/detail", {"itemId": itemId})
      .subscribe(detailData => {
        this.detailJson = detailData
       this._details.next(this.detailJson);

      });
  }

  getPhotos(title) {
   this.http
     .post("http://localhost:3000/photo", {"title": title})
     .subscribe(photoData => {
       console.log(photoData)
       this.photoJson = photoData
      this._photos.next(this.photoJson);

     });
 }
 getSimilar(itemId) {
  this.http
    .post("http://localhost:3000/similar", {"itemId": itemId})
    .subscribe(similarData => {
      console.log(similarData)
      this.similarJson = similarData
     this._similar.next(this.similarJson);

    });
}


}
