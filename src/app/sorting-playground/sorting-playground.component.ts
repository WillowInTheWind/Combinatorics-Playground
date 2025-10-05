import {Component, Inject, Renderer2} from '@angular/core';
import {DOCUMENT, NgForOf, NgIf} from "@angular/common";
import {ObjectCardComponent} from "../object-card/object-card.component";
import {CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-sorting-playground',
  standalone: true,
  imports: [
    NgForOf,
    ObjectCardComponent,
    CdkDrag,
    CdkDropList,
    NgIf
  ],
  templateUrl: './sorting-playground.component.html',
  styleUrl: './sorting-playground.component.scss'
})
export class SortingPlaygroundComponent {

  n_max = 5;
  test: number[] = [];
  unsortedObjects: ObjectCardComponent[] = [];
  sortedObjects: ObjectCardComponent[] = [];



  graphic2 =
    "    \\draw[line width=1] (0,0) -- (0,1)--(1,1)--(1,0)--(0,0);\n" +
    "    \\draw[line width=1] (1,0) -- (1,1)--(2,1)--(2,0)--(1,0);\n" +
    "    \\draw[line width=1] (2,0) -- (2,1)--(3,1)--(3,0)--(2,0);\n" +
    "    \\draw[line width=1] (3,0) -- (3,1)--(4,1)--(4,0)--(3,0);\n"
  // private myTikzScriptElement: HTMLScriptElement;

  constructor(private renderer2: Renderer2,
              @Inject(DOCUMENT) private document: Document) {
    // this.myTikzScriptElement = this.document.createElement("script");
    // this.myTikzScriptElement.src = "https://tikzjax.com/v1/tikzjax.js";
    // document.body.appendChild(this.myTikzScriptElement);l
    // @ts-ignore
    this.test = Array(5).fill().map((x,i)=>i)

  }
  items = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];

  // drop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  // }

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
