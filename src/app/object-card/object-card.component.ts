import {
  Component,
  ElementRef,
  Inject,
  Input,
  Output,
  Renderer2,
  SimpleChanges,
  viewChild,
  ViewChild
} from '@angular/core';
import {LatexRendererComponent} from "../latex-renderer/latex-renderer.component";
import {TikzRendererComponent} from "../tikz-renderer/tikz-renderer.component";
import {CdkDrag} from '@angular/cdk/drag-drop';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {DOCUMENT, NgOptimizedImage} from "@angular/common";
import { EventEmitter } from '@angular/core';
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-object-card',
  standalone: true,
  imports: [
    //LatexRendererComponent,
    // TikzRendererComponent,
    DragDropModule,
    CdkDrag,
    TikzRendererComponent,
    NgOptimizedImage,
    MatIcon,MatIconModule
  ],
  templateUrl: './object-card.component.html',
  styleUrl: './object-card.component.scss'
})
export class ObjectCardComponent {
  @Input({ required: true }) objectInfo!: CombinatorialObjectCard;
  @Input() graphic!: SafeUrl;
  @ViewChild('renderer') button!: ElementRef;
  @ViewChild('testspace') test!: ElementRef;

  @Input() listposition: number;

  @Input() index: number | undefined;
  @Output() public object = new EventEmitter<any>();
  @Output() public deselectobject = new EventEmitter<any>();

  dragPosition = {x: 0, y: 0};
  line: any|undefined;
  divColor = "white";
  selected  = false;


  constructor(private ref: ElementRef,private renderer2: Renderer2,
              @Inject(DOCUMENT) private document: Document,
              ) {
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
    this.dragPosition = {x: 0, y: 0};

    this.object.emit([this.ref, this.objectInfo]);
    this.objectInfo.status = 12;
  }
  linemanager() {
    if (this.selected) {
      console.log("test");
    }
  }
//   ngOnChanges(changes: SimpleChanges) {
//     this.test.nativeElement.text = this.objectInfo.id;
// }
  unselectCard() {

    this.deselectobject.emit(this.ref);

  }
  returnData () {
    return this.objectInfo
  }
}


export interface CombinatorialObjectCard {
  id: number;
  n: number;
  r: number;
  description: string;
  status: number;
  // Statuses
  // 10 - left unselected
  // 11 - right unselected
  // 12 - middle unselected
  // 20 - left selected
  // 21 - right selected
  // 22 -  middle selected
  graphic: SafeUrl;
}
