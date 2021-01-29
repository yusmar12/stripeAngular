import { Component, OnInit } from '@angular/core';
import { StripeService } from '../../services/stripe.service';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.css']
})
export class StripeComponent implements OnInit {

  constructor( private stripeService: StripeService ) { }

  ngOnInit(): void {
  }

  pay() {
    this.stripeService.paying().subscribe( response => {
      console.log(response);
    });
  }


}
