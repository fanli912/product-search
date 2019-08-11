import { Component } from '@angular/core';
import {SearchForm} from './search-form'
import { SearchService } from "../service/search.service";
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component ({
    selector:'app-search-form',
    templateUrl: './search-form.component.html',
    styleUrls:['./search-form.component.css']
})


export class SearchFromComponent{
  location: string;
  autoCom: any[]
  zip: string;
  gotZip: boolean = false
  useCurLoc: boolean = true;

  form = SearchForm;

  constructor(private searchService: SearchService, private http: HttpClient) {

  }

  getAddressOnChange(event, location) {
    this.form.location = (<HTMLInputElement>document.getElementById('loc-input')).value;
  }

  localClick(x) {
    if(x==0){
      this.useCurLoc=true;
    } else {
      this.useCurLoc=false;
    }
    }

  cateType = ["All Categories", "Art", "Baby", "Books",
"Clothing, Shoes & Accessories", "Computers/Tablets & Networking",
"Health & Beauty", "Music", "Video Games & Consoles"];

onSubmit() {
  this.searchService.search(this.form);

}

clear() {
  this.searchService.clear();
  this.form.useCurLoc = true;
}

getZip() {
  this.searchService.getGeolocation().subscribe(data => {
    this.zip = data["zip"]
    this.form.zip = this.zip;
    this.gotZip = true;
  })
}
getSuggestions(code: string) {
  if(code == "") {this.autoCom = null}
  else {
  this.http.get<any[]>('http://api.geonames.org/postalCodeSearchJSON?postalcode_startsWith='+code+'&username=fanli912&country=US&maxRows=5')
    .subscribe(data => {
      this.autoCom = data['postalCodes'];
    });}
}


ngOnInit() {
  this.getZip();

}


}
