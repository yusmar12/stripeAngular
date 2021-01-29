import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
declare var stripe: any;

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  constructor( private http: HttpClient ) { }

  charge( cantidad, tokenId ) {
    return this.http.post('http://localhost:3000/stripe_checkout', {
      stripeToken: tokenId,
      cantidad: cantidad
    }).toPromise();
  }

  paying() {
    return this.http.post('http://localhost:4242/create-checkout-session', {
      amount: 100
    }) 
      .pipe(
        map( ( session: any ) => {
          console.log(session);
          return stripe.redirectToCheckout({
            sessionId: session.id
          });
        })
      )
  }

  loadIntent() {
    return this.http.post('http://localhost:4242/create-payment-intent', {});
  }
}
