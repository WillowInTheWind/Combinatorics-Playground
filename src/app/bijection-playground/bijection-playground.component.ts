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
  N_MAX :number = 7;
  Current_N !: number;
  @ViewChild("leftmiddlecolumn") leftcenter!: ElementRef;
  @ViewChild("rightmiddlecolumn") rightcenter!: ElementRef;
  N = Array.from({length: this.N_MAX}, (x, i) => i)
  rowtwocards: CombinatorialObjectCard[] = [];
  rowonecards: CombinatorialObjectCard[] = [];
  class = "";
  class_options = ["Narayana", "Binomial Coefficent"]
  Set_options: string[] =  ["pixelstrips", "starfolkspaths"];
  Left_set_description = "";
  Right_set_description = "";
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
    /* TODO: move this into new method generated on button press */
    let cards = this.generate_cards_equal_n(this.Current_N);
       this.rowonecards = cards[0]
       this.rowtwocards = cards[1]
  }
   onNSelectChange(event:any) {
    this.Current_N = event
    console.log("N CHECKED", this.Current_N);
    let cards = this.generate_cards_equal_n(this.Current_N);
    this.rowonecards = cards[0]
    this.rowtwocards = cards[1]

  }
  onclassSelectChange(event:any) {
    this.class = event
    switch (this.class) {

      case "Narayana":this.Set_options = ["fullparentheses", "dyckpaths"];break;
      case "Binomial Coefficent":this.Set_options = ["pixelstrips", "starfolkspaths"];break;
      default:this.Set_options = ["No class selected"];break;}
    this.class = event
  }
  onleftobjectSelectChange(event:any) {
    this.Left_set_description = event
    let cards = this.generate_cards_equal_n(this.Current_N);
    // TODO: FOR OPTIMIZATION, ONLY CHANGE CHANGED CARD
    // TODO: CLEAR SELECTIONS
    this.rowonecards = cards[0]
    this.rowtwocards = cards[1]
  }
  onrightobjectSelectChange(event:any) {
    this.Right_set_description = event
    let cards = this.generate_cards_equal_n(this.Current_N);
    this.rowonecards = cards[0]
    this.rowtwocards = cards[1]
  }
  cardSelected($event: any) {
    if (this.firstSelected == undefined) {
      this.firstSelected = $event;
      return;
    }
    if ($event == 0 || $event[1].status % 10 == this.firstSelected.status % 10 || $event[1] == this.firstSelected[1]) {
      return;
    }
      console.log(this.firstSelected[0].nativeElement);
      this.secondSelected = $event;
      this.secondSelected[0].dragPosition = {x: 0 , y: 0};
      let firstcard: any = this.firstSelected[0].nativeElement
     let secondcard: any = this.secondSelected[0].nativeElement
     //TODO: CHANGE COLOR OF CARD
     let refrence = this.leftcenter.nativeElement.append(firstcard)
      this.rightcenter.nativeElement.append(secondcard);

    console.log(this.firstSelected[0].nativeElement.objectInfo)
      this.firstSelected = undefined;
      this.secondSelected = undefined;

  }

     generate_cards_equal_n(number: number) {
      /* Adjust to take in parameters like
        - less than, or equal to
        - specify r / dont specify r
        - Randomize / Dont randomize
       */
      let k_left = 0;
      let k_right = 0;
      let temp_list_one: any[] = [];
      let temp_list_two: any[] = []
        for (let i = 0; i <= number; i++) {
          let row_one_images = this.cardRender.getCardsbyNandR(number, i, this.Left_set_description).subscribe((row_one_images) => {
              for (let image of row_one_images) {
                temp_list_one.push({
                  status: 10,
                  description: this.Left_set_description,
                  graphic: image,
                  id: k_left,
                  n: number,
                  r: i
                })
                k_left++;
              }
            for (let i = temp_list_one.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [temp_list_one[i], temp_list_one[j]] = [temp_list_one[j], temp_list_one[i]];
            }
          });
          let row_two_images = this.cardRender.getCardsbyNandR(number, i, this.Right_set_description).subscribe((row_two_images) => {
              for (let image of row_two_images) {
                temp_list_two.push({
                  status: 11, description: this.Right_set_description, graphic: image, id: k_right, n: number,  r: i
                })
                k_right++;
              }
            for (let i = temp_list_two.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [temp_list_two[i], temp_list_two[j]] = [temp_list_two[j], temp_list_two[i]];
            }
          });}
        return [temp_list_one,temp_list_two];

    }

  cardunselected($event: any) {
    // is Card 1
    if ($event[1].description == this.firstSelected[1].description && $event[1].n == this.firstSelected[1].n && $event[1].id == this.firstSelected[1].id  ) {
      this.firstSelected = undefined;
      return;
    }
    else if ($event[1].description == this.secondSelected[1].description && $event[1].n == this.secondSelected[1].n && $event[1].id == this.secondSelected[1].id  ) {
      this.secondSelected = undefined;
      return;
    }
    // }
  }


  protected readonly Array = Array;
}
