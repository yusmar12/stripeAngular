import { Component, OnInit, NgZone,ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { StripeService } from '../../services/stripe.service';
declare var stripe: any;
declare var elements: any;

@Component({
  selector: 'app-intent-elements',
  templateUrl: './intent-elements.component.html',
  styleUrls: ['./intent-elements.component.css']
})
export class IntentElementsComponent implements OnInit, AfterViewInit {
  @ViewChild('card') cardElement: ElementRef;
  clientId: any;
  card: any;
  cardError: any;
  clientS: any;
  inProgress: boolean;
  pago = {
    codigopostal: '',
    nombre: '',
    direccion: ''
  }

  constructor( private stripeService: StripeService,
               private ngZone: NgZone ) { 
    this.inProgress = true;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit");
    this.load();
  }

  load() {
    this.stripeService.loadIntent().subscribe( (data: any) => {
      if(data) {
        this.clientId = data.clientSecret;
        console.log(this.clientId);
        // elements = stripe.elements();
        this.card = elements.create("card", {
           iconStyle: 'solid',
           style: {
            base: {
              color: '#303238',
              fontSize: '16px',
              fontFamily: '"Open Sans", sans-serif',
              fontSmoothing: 'antialiased',
              '::placeholder': {
                color: '#CFD7DF',
              },
            },
            invalid: {
              color: '#e5424d',
              ':focus': {
                color: '#303238',
              },  
            },
          },
        });
        this.card.mount(this.cardElement.nativeElement)
        this.card.addEventListener('change', this.onChange.bind(this));
      }
    })
  }
  
  onChange($event) {
    if($event.error) {
      this.ngZone.run(() => this.cardError = $event.error.message );
    } else {
      this.ngZone.run(() => this.cardError = null );
    }
  }

  payWithCard() {
    this.inProgress = false;
    console.log(this.pago.nombre);
    console.log(this.pago.direccion);
    stripe
      .confirmCardPayment(this.clientId, {
        payment_method: {
          card: this.card,
          billing_details: {
            name: this.pago.nombre,
            address: this.pago.direccion
          }
        }
      })
      .then( (res) => {
        if(res.error) {
          this.ngZone.run(() => this.cardError = res.error.message );
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
