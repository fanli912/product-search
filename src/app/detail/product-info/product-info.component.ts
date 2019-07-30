import { Component, OnInit, OnChanges, Input } from "@angular/core";
import { Product } from "./product-info";
import { SearchService } from "../../service/search.service";
import { DetailService } from "../../service/detail.service";
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-info-tab",
  templateUrl: "./product-info.component.html"
})
export class InfoTabComponent {
  @Input() product: Product
  showPhoto: boolean = false;

  constructor(private modalService: NgbModal) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

}


//carousal from https://ng-bootstrap.github.io/#/components/modal/examples#basic
