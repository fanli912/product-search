
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

  private _slide = new Subject();
  slide = this._slide.asObservable();

  detailJson: any;

  constructor(private http: HttpClient) {

  }

  getDetails(itemId) {
     let httpParams = new HttpParams()
       .set("itemId", itemId);
    this.http
      .post("http://localhost:3000/detail", {"itemId": itemId})
      .subscribe(detailData => {
        this.detailJson = detailData
       this._details.next(this.detailJson);

      });


  }


}
