import { Component,OnInit,Input} from "@angular/core";
import { trigger, state, style, transition, animate} from "@angular/animations";


import { SearchService } from "../service/search.service";
import { DetailService } from "../service/detail.service";

@Component({
  selector: "app-result-container",
  templateUrl: "./result-container.component.html",
  styleUrls: ["./result-container.component.css"],
  animations: [
    trigger("slideAnimation", [
      transition("* => right", [
        style({right: '-100%'}),
        animate('.5s ease-in', style({right:0}))
      ]),
      transition("* => left", [
        style({left: '-100%'}),
        animate('1s ease-in', style({left:0}))
      ]),
    ])
  ]
})
export class ResultContainerComponent {
  active:any;
  clear = false;
  isShowResult = true;
  isShowFavorite = false;
  resultShowClass = "btn btn-primary";
  favoriteShowClass = "btn btn-outline-primary";

  slideRight(panel) {
    this.clear = false;
    this.active = panel;
  }

  slideLeft(event) {
    this.clear = false;
    this.active = event.slide;
  }

  showResult() {
    this.clear = false;
    this.isShowFavorite = false;
    this.isShowResult = true;
    this.active = 'right';
    this.resultShowClass = "btn btn-primary";
    this.favoriteShowClass = "btn btn-outline-primary";
  }

}
