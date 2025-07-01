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
  @Input({ required: true }) objectInfo!: CombinatorialObjectCard;
  @Input() graphic!: string;
  @ViewChild('renderer') button!: ElementRef;
  @Input() listposition: number;

  @Input() index: number | undefined;
  @Output() public object = new EventEmitter<any>();

  dragPosition = {x: 0, y: 0};
  line: any|undefined;
  divColor = "#f2f2f2";
  selected  = false;


  constructor(private renderer2: Renderer2,
              @Inject(DOCUMENT) private document: Document,
              private ref: ElementRef) {
    // @ts-ignore
      this.listposition = 0;

  }
  ngOnInit() {
      this.dragPosition = {x: this.dragPosition.x, y: this.dragPosition.y + .01};
  }

  selectCard() :void {
    // if (!this.selected ) {
    //   this.divColor = "#ababab";
    //   this.selected = true;
    // }
    // else {
    //   this.selected = false;
    //   this.divColor = "#f2f2f2";
    // }
    // this.object.emit(this.ref);
  }
  linemanager() {
    if (this.selected) {
      console.log("test");
    }
  }
}


export interface CombinatorialObjectCard {
  index: number;
  n: number;
  r: number;
  description: string;
}
