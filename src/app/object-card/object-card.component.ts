import {
  Component,
  ElementRef, inject,
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
import {CdkDrag, CdkDragEnd, DragDrop, DragRef} from '@angular/cdk/drag-drop';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {DOCUMENT, NgOptimizedImage} from "@angular/common";
import { EventEmitter } from '@angular/core';
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {SafeUrl} from "@angular/platform-browser";
import {MatDialog} from "@angular/material/dialog";
import {ImagemodalComponent} from "../imagemodal/imagemodal.component";
import {CardManagerService, Pose2d} from "../cardmanager.service"
@Component({
  selector: 'app-object-card',
  standalone: true,
  imports: [
    //LatexRendererComponent,
    // TikzRendererComponent,
    DragDropModule,
    CdkDrag,
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
  outline = "none"
  @Input() listposition: number;
  dialog = inject(MatDialog);

  @Input() index: number | undefined;
  @Output() public object = new EventEmitter<any>();
  @Output() public deselectobject = new EventEmitter<any>();

  dragPosition: Pose2d = {x: 0, y: 0};
  line: any|undefined;
  divColor = "white";
  selected  = false;


  constructor(private ref: ElementRef,private renderer2: Renderer2,
              @Inject(DOCUMENT) private document: Document,
              protected card_manager: CardManagerService
              ) {
      this.listposition = 0;
  }


  public dragEnd(event: CdkDragEnd): void {
    this.dragPosition = (event.source.getFreeDragPosition()); // returns { x: 0, y: 0 }
    this.card_manager.updatePosition(this.objectInfo.id, this.dragPosition, this.objectInfo.status);


  }
  ngOnInit() {
//@ts-ignore
    this.dragPosition = {x: (this.objectInfo.status%10)*(window.innerWidth-150), y: this.objectInfo.id*150};

    this.card_manager.updatePosition(this.objectInfo.id, this.dragPosition, this.objectInfo.status);

  }
  ngAfterViewInit() {
    this.card_manager.positionsSubject.subscribe((data) => {
      this.checkforclosecard(data);
    })
  }
  checkforclosecard (data: any) {
    let k = this.card_manager.checkforclosecard(this.dragPosition, this.objectInfo.status);
    if (k != -1) {
      console.log(k);
      this.divColor = "blue";
    }
    if (k == -1) {
      console.log(k);

    }
  }
  openModal(): void {
    this.dialog.open(ImagemodalComponent, {
      width: '1000px',
      data: {
        graphic: this.graphic,
        n: this.objectInfo.n,
        r: this.objectInfo.r
      },
    });
  }
  selectCard() :void {
    if (this.ref.nativeElement.parentElement.id == "rightmiddlecolumn" || this.ref.nativeElement.parentElement.id == "leftmiddlecolumn") {
      return;
    }
    if (!this.selected ) {
      this.divColor = "#ababab";
      this.selected = true;
      this.dragPosition = {x: 0, y: 0};
      this.object.emit([this.ref, this.objectInfo]);
    }
    else {
      this.selected = false;
      this.divColor = "#f2f2f2";
      this.deselectobject.emit([this.ref, this.objectInfo]);
    }

  }
  linemanager() {
    if (this.selected) {
      console.log("test");
    }
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
