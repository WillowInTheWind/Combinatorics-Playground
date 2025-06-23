import {Component, Inject, Renderer2} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule} from '@angular/material/icon';
import { OnInit} from "@angular/core";
import {CommonModule, DOCUMENT, NgIf} from "@angular/common";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatDialog} from "@angular/material/dialog";

import {MatToolbar, MatToolbarModule} from '@angular/material/toolbar';
import {ObjectCardComponent} from "../object-card/object-card.component";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ObjectCardComponent, HttpClientModule, RouterOutlet, MatIconModule, MatToolbar, MatToolbarModule, CommonModule, MatMenu, MatMenuTrigger, MatMenuItem],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Combinatorics-Playground';

}
