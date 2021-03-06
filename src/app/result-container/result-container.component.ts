import { Component} from "@angular/core";
import { trigger,style, transition, animate} from "@angular/animations";

@Component({
  selector: "app-result-container",
  templateUrl: "./result-container.component.html",
  styleUrls: ["./result-container.component.css"],
  animations: [
    trigger("slideAnimation", [
      transition("* => right", [
        style({transform: 'translateX(100%)'}),
        animate('300ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition("* => left", [
        style({transform: 'translateX(-100%)'}),
        animate('300ms ease-in', style({transform: 'translateX(0%)'}))
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
  wishlistShowClass = "btn btn-outline-primary";



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
    this. wishlistShowClass = "btn btn-outline-primary";
  }

  showWishList() {
    this.clear = false;
    this.isShowResult = false;
    this.isShowFavorite = true;
    this.active = 'right';
    this.resultShowClass = "btn btn-outline-primary";
    this.wishlistShowClass = "btn btn-primary";
  }

}

// animation from https://stackoverflow.com/questions/47248898/angular-4-5-6-7-simple-example-of-slide-in-out-animation-on-ngif
