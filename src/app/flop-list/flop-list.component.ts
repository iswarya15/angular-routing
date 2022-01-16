import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FlopService } from './flop.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'my-flop-list',
  templateUrl: './flop-list.component.html',
  styleUrls: ['./flop-list.component.css'],
})
export class FlopListComponent {
  flops;
  rentalList;
  constructor(
    private flopService: FlopService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log('On init');
    this.route.queryParamMap.subscribe((qps) => {
      console.log(qps);
      console.log(qps.keys);
      if (qps.has('starsMax')) {
        this.flopService
          .getFlopsMaxStars(+qps.get('starsMax'))
          .subscribe((flops) => {
            this.flops = flops;
          });
      } else {
        this.flopService.getFlops().subscribe((flops) => (this.flops = flops));
      }
    });
    console.log('check if oninit is running');
    this.flopService
      .getRentalList()
      .subscribe((rentalList) => (this.rentalList = rentalList));
  }
}

// onClick() {
//   console.log('rented');
// }
