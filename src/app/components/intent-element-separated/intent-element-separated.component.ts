import { Component, ElementRef, OnInit, ViewChild, NgZone, AfterViewInit } from '@angular/core';
import { StripeService } from '../../services/stripe.service';

@Component({
  selector: 'app-intent-element-separated',
  templateUrl: './intent-element-separated.component.html',
  styleUrls: ['./intent-element-separated.component.css']
})
export class IntentElementSeparatedComponent implements AfterViewInit {
  @ViewChild('cardNumber') cardNumberEl: ElementRef;
  @ViewChild('cardExpiry') cardExpiryEl: ElementRef;
  @ViewChild('cardCvc') cardCvcEl: ElementRef;
  @ViewChild('cardZip') cardZipEl: ElementRef;
  clientId: any;
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  cardZip: any;
  cardError: any;
  clientS: any;
  inProgress: boolean;
  registerElements= [];
  pago = {
    codigopostal: '',
    nombre: '',
    direccion: ''
  }


  constructor( private stripeService: StripeService,
               private ngZone: NgZone ) {
   this.inProgress = true;   
 }

  ngAfterViewInit(){
    this.stripeService.loadIntent().subscribe( (data: any) => {
      if( data ) {
        this.clientId = data.clientSecret;
        console.log(this.clientId);

        this.cardNumber = elements.create("cardNumber");
        this.cardNumber.mount(this.cardNumberEl.nativeElement);
        this.cardNumber.addEventListener('change', this.onChange.bind(this));
        this.cardExpiry = elements.create("cardExpiry");
        this.cardExpiry.mount(this.cardExpiryEl.nativeElement);
        this.cardExpiry.addEventListener('change', this.onChange.bind(this));
        this.cardCvc = elements.create("cardCvc");
        this.cardCvc.mount(this.cardCvcEl.nativeElement);
        this.cardCvc.addEventListener('change', this.onChange.bind(this));
      }
    });
  }

  onChange($event) {
    if($event.error) {
      this.ngZone.run(() => this.cardError = $event.error.message );
    } else {
      this.ngZone.run(() => this.cardError = null );
    }
  }

  payWithCard() {
    this.registerElements.push(this.cardNumber, this.cardCvc, this.cardExpiry);
    this.inProgress = false;
    stripe
      .confirmCardPayment(this.clientId, {
        payment_method: {
          card: this.registerElements,
          billing_details: {
            name: this.pago.nombre,
            postal_code: this.pago.codigopostal,
            address: this.pago.direccion
          }
        }
      })
      .then( (res) => {
        if(res.error) {
          this.ngZone.run(() => this.cardError = res.error );
        } else {
          this.orderComplete(res.paymentIntent.id);
        }
      })
  }

  orderComplete(paymentIntentId): void {
    alert(`Transacción realizada con éxito: ${paymentIntentId}`);
    this.inProgress = true;
  }  


}
