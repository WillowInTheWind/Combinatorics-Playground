import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ObjectCardComponent} from "./object-card/object-card.component";
import {LatexRendererComponent} from "./latex-renderer/latex-renderer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ObjectCardComponent, LatexRendererComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Combinatorics-Playground';
}
