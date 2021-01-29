import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PaypalComponent } from './components/paypal/paypal.component';
import { StripeComponent } from './components/stripe/stripe.component';
import { ElementsComponent } from './components/elements/elements.component';
import { IntentElementsComponent } from './components/intent-elements/intent-elements.component';
import { IntentElementSeparatedComponent } from './components/intent-element-separated/intent-element-separated.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PaypalComponent,
    StripeComponent,
    ElementsComponent,
    IntentElementsComponent,
    IntentElementSeparatedComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
