import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { MenuItemActionContainerComponent } from '../menu-item/menu-item-action-container/menu-item-action-container.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'menu/:id',  component: MenuItemComponent, children: [
    { path: 'search',  component: MenuItemActionContainerComponent }
  ]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRouting {}