
import { SearchForm } from '../search-form/search-form';
import { Injectable, EventEmitter, Output } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { Subject } from "rxjs";


const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  showResult = false;
  private jsonData: any;
  private _resultJson = new Subject();
  resultJson = this._resultJson.asObservable();

  constructor(private http: HttpClient) {}


  getGeolocation() {
    const url = "http://ip-api.com/json";
    return this.http.get(url);
  }

  autoComplete(value) {
    var auto = "http://api.geonames.org/postalCodeSearchJSON?postalcode_startsWith="+value+"&username=fanli912&country=US&maxRows=5";
    var autoList =  this.http.get(auto)
    .pipe(
      debounceTime(300),
      map(
        (data: any) => {
          return (
              data.length != 0 ? data as any[] : [{"ZipCode": "No Record Found"} as any]
          );}
      )
      );
      return autoList;
  }

  search(form) {
    this.showResult = true;

    this.http
      .post("http://localhost:3000/search", form)
      .subscribe(responseData => {
        this.jsonData = responseData
        this._resultJson.next(this.jsonData);

      });
  }


  }





