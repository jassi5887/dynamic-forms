import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SubHeaderComponent } from './header/sub-header/sub-header.component';
import { AppRouting } from './app-routing/app-routing.module';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuItemActionContainerComponent } from './menu-item/menu-item-action-container/menu-item-action-container.component';

@NgModule({
  imports: [
    BrowserModule,
    DynamicFormModule,
    AppRouting
  ],
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SubHeaderComponent,
    MenuItemComponent,
    MenuItemActionContainerComponent
  ]
})
export class AppModule {}
