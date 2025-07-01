import { Routes } from '@angular/router';
import {BijectionPlaygroundComponent} from "./bijection-playground/bijection-playground.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {SortingPlaygroundComponent} from "./sorting-playground/sorting-playground.component";

export const routes: Routes = [
  { path: 'bijection', component: BijectionPlaygroundComponent},
  { path: 'home', component: HomepageComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'sorting', component: SortingPlaygroundComponent},
];
