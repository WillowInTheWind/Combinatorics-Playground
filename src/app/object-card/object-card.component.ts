import {Component, ElementRef, Inject, Input, Output, Renderer2, viewChild, ViewChild} from '@angular/core';
import {LatexRendererComponent} from "../latex-renderer/latex-renderer.component";
import {TikzRendererComponent} from "../tikz-renderer/tikz-renderer.component";
import {CdkDrag} from '@angular/cdk/drag-drop';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {DOCUMENT} from "@angular/common";
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-object-card',
  standalone: true,
  imports: [
    //LatexRendererComponent,
    // TikzRendererComponent,
    DragDropModule,
    CdkDrag,
    TikzRendererComponent,
  ],
  templateUrl: './object-card.component.html',
  styleUrl: './object-card.component.css'
})
export class ObjectCardComponent {
  objectInfo: CombinatorialObjectCard  = {index :0, n : 0, r:0, description:"pixel strip"}
  @Output() public object = new EventEmitter<any>();
  @Input() graphic: string;
  selected  = false;
  @ViewChild('renderer') button!: ElementRef;
  @Input() index: number | undefined;
  dragPosition = {x: 0, y: 0};
  divColor = "#f2f2f2";
  constructor(private renderer2: Renderer2,
              @Inject(DOCUMENT) private document: Document) {
    // @ts-ignore
    if (this.graphic == undefined) {
      this.graphic ="  \\begin{tikzpicture}\n" +
        "    \\draw (0,0) circle (1in);\n" +
        "  \\end{tikzpicture}"
    }

  }
  ngOnInit() {
      this.dragPosition = {x: this.dragPosition.x, y: this.dragPosition.y + .01};
  }

  selectCard() :void {
    if (!this.selected ) {
    this.divColor = "#ababab";
    this.selected = true;
    }
    else {
    this.selected = false;
    this.divColor = "#f2f2f2";
    }
    this.object.emit(this.objectInfo);
  }

}

export interface CombinatorialObjectCard {
  index: number;
  n: number;
  r: number;
  description: string;
}
