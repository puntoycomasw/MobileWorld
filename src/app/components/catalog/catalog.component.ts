import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { Carousel } from 'materialize-css';
declare var $: any;
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  constructor(private dataApi: DataApiService) { }
  public products = [];
  ngOnInit() {
    this.dataApi.getAllProducts().subscribe(products => {
      /* Carousel.init(); */
      this.products = products;
     /*  $(document).ready(function () {
        $('.carousel.carousel-slider').carousel({
          fullWidth: true,
          indicators: true
        });
      }); */
      /* setTimeout(() => {
        var elems = document.querySelectorAll('.carousel');
        Carousel.init(elems);
      }, 1); */

    })
  }
}