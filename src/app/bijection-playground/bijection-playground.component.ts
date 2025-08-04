import {Component, ElementRef, Inject, Renderer2, ViewChild} from '@angular/core';
import {CombinatorialObjectCard, ObjectCardComponent} from "../object-card/object-card.component";
import {TikzRendererComponent} from "../tikz-renderer/tikz-renderer.component";
import {DOCUMENT, NgForOf} from "@angular/common";
import { EventEmitter } from '@angular/core';
import {CdkDrag} from "@angular/cdk/drag-drop";
import {MatFormField, MatLabel, MatOption, MatSelect, MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {ObjectRendererService} from "../object-renderer.service";
declare var LeaderLine: any;

@Component({
  selector: 'app-bijection-playground',
  standalone: true,
  imports: [
    ObjectCardComponent,
    NgForOf,
    MatFormFieldModule,
    MatSelectModule,
    MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule
  ],
  templateUrl: './bijection-playground.component.html',
  styleUrl: './bijection-playground.component.scss'
})
export class BijectionPlaygroundComponent {
  selected = 'option2';
  N_MAX :number = 3;
  @ViewChild("leftcolumn") leftcenter!: ElementRef;
  @ViewChild("rightcolumn") rightcenter!: ElementRef;
  N = Array.from({length: this.N_MAX}, (x, i) => i)
  rowtwocards: CombinatorialObjectCard[] = [];
  rowonecards: CombinatorialObjectCard[] = [];
  centerstripmanager: boolean[] = [];
  Left_set_description = "fullparentheses";
  Right_set_description = "dyckpaths";
  public firstSelected: any | undefined = undefined;
  public secondSelected: any | undefined = undefined;
  private myTikzScriptElement: HTMLScriptElement;

  constructor(private renderer2: Renderer2,
              private cardRender: ObjectRendererService,
              @Inject(DOCUMENT) private document: Document) {
    this.myTikzScriptElement = this.document.createElement("script");
    this.myTikzScriptElement.src = "https://tikzjax.com/v1/tikzjax.js";
    document.body.appendChild(this.myTikzScriptElement);
  }
  ngOnInit() {
     this.generate_cards_less_than_n()

console.log(this.rowonecards)
  }
  cardSelected($event: any) {

    if (this.firstSelected == undefined) {
      this.firstSelected = $event;
    }
    else {
      //TO-DO: FIX LOGIC TO CHECK FOR DUPLICATES
      if ($event == 0 || $event[1].status % 10 == this.firstSelected.status % 10 || $event[1] == this.firstSelected[1]) {
        console.log("Selected from same side")
        return;

      }
      console.log(this.firstSelected[0].nativeElement);

      // console.log(this.secondSelected.nativeElement);
      // console.log(this.firstSelected.nativeElement.divColor)
      this.secondSelected = $event;
      //console.log(this.secondSelected[0].nativeElement.ObjectCardComponent.returnData())
      // this.firstSelected[0].nativeElement.objectInfo.status = 21;
      this.secondSelected[0].dragPosition = {x: 0 , y: 0};

      // this.firstSelected.nativeElement.objectInfo.status = 12;
      let refrence = this.leftcenter.nativeElement.append(this.firstSelected[0].nativeElement)
      this.rightcenter.nativeElement.append(this.secondSelected[0].nativeElement);
      console.log(this.firstSelected[0].nativeElement.objectInfo)
      this.firstSelected = undefined;
      this.secondSelected = undefined;
    }
  }

//     }
    async generate_cards_less_than_n() {
      let k_left = 0;
      let k_right = 0;

      for (let n = 0; n <= this.N_MAX; n++) {
        let temp_list_one: any[] = []
        let temp_list_two: any[] = []

        for (let i = 0; i <= n; i++) {

          let row_one_images = await this.cardRender.getCardsbyNandR(n, i, this.Left_set_description);

          let row_two_images = await this.cardRender.getCardsbyNandR(n, i, this.Right_set_description)

          for (let image of row_one_images) {
            temp_list_one.push({
              status: 10,
              description: this.Left_set_description,
              graphic: image,
              id: k_left,
              n: n,
              r: i
            })
            k_left++;
          }
          for (let i = temp_list_one.length - 1; i > 0; i--) {

            // Generate Random Index
            const j = Math.floor(Math.random() * (i + 1));

            // Swap elements
            [temp_list_one[i], temp_list_one[j]] = [temp_list_one[j], temp_list_one[i]];
          }
          for (let i = temp_list_two.length - 1; i > 0; i--) {

            // Generate Random Index
            const j = Math.floor(Math.random() * (i + 1));

            // Swap elements
            [temp_list_two[i], temp_list_two[j]] = [temp_list_two[j], temp_list_two[i]];
          }
          for (let image of row_two_images) {
            temp_list_two.push({
              status: 11, description: this.Right_set_description, graphic: image, id: k_right, n: n, r: i
            })
            k_right++;
          }

        }
        for (let image of temp_list_one) {
          this.rowonecards.push(image)
        }
        for (let image of temp_list_two) {
          this.rowtwocards.push(image)
        }
      }
    }

  cardunselected($event: any) {
    // if (this.firstSelected == undefined) {
    //   this.firstSelected = $event;
    // }
    // else {
    //   //TO-DO: FIX LOGIC TO CHECK FOR DUPLICATES
    //   if ($event == 0 || $event[1].status % 10 == this.firstSelected.status % 10 || $event[1] == this.firstSelected[1]) {
    //     console.log("Selected from same side")
    //     return;
    //
    //   }
    //   console.log(this.firstSelected[0].nativeElement);
    //
    //   // console.log(this.secondSelected.nativeElement);
    //   // console.log(this.firstSelected.nativeElement.divColor)
    //   this.secondSelected = $event;
    //   //console.log(this.secondSelected[0].nativeElement.ObjectCardComponent.returnData())
    //   // this.firstSelected[0].nativeElement.objectInfo.status = 21;
    //   this.secondSelected[0].dragPosition = {x: 0 , y: 0};
    //
    //   // this.firstSelected.nativeElement.objectInfo.status = 12;
    //   let refrence = this.leftcenter.nativeElement.append(this.firstSelected[0].nativeElement)
    //   this.rightcenter.nativeElement.append(this.secondSelected[0].nativeElement);
    //   console.log(this.firstSelected[0].nativeElement.objectInfo)
    //   this.firstSelected = undefined;
    //   this.secondSelected = undefined;
    // }
  }

  protected readonly Array = Array;
}
