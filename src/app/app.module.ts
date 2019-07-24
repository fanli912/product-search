import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { SearchFromComponent } from './search-form/search-form.component';
import { DetailComponent } from './detail/detail.component';
import { HttpClientModule } from '@angular/common/http';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ResultTalbeComponent } from './result-table/result-table.component';
import { ResultContainerComponent } from './result-container/result-container.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  InfoTabComponent} from './detail/product-info/product-info.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchFromComponent,
    ResultTalbeComponent,
    DetailComponent,
    ResultContainerComponent,
    InfoTabComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
