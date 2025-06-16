import { Component } from '@angular/core';
import {LatexRendererComponent} from "../latex-renderer/latex-renderer.component";
import {TikzRendererComponent} from "../tikz-renderer/tikz-renderer.component";

@Component({
  selector: 'app-object-card',
  standalone: true,
  imports: [
    LatexRendererComponent,
    TikzRendererComponent

  ],
  templateUrl: './object-card.component.html',
  styleUrl: './object-card.component.css'
})
export class ObjectCardComponent {

}
