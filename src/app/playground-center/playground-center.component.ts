import {Component, ElementRef, Inject, Input, Renderer2, ViewChild} from '@angular/core';
import {DOCUMENT, NgForOf} from "@angular/common";
import {CombinatorialObjectCard, ObjectCardComponent} from "../object-card/object-card.component";
import {ObjectRendererService} from "../object-renderer.service";

@Component({
  selector: 'app-playground-center',
  standalone: true,
  imports: [
    NgForOf,
    ObjectCardComponent
  ],
  templateUrl: './playground-center.component.html',
  styleUrl: './playground-center.component.css'
})
export class PlaygroundCenterComponent {
  @ViewChild("leftmiddlecolumn") leftcenter!: ElementRef;
  @ViewChild("rightmiddlecolumn") rightcenter!: ElementRef;
  rowtwocards: CombinatorialObjectCard[] = [];
  rowonecards: CombinatorialObjectCard[] = [];
  @Input({ required: true }) n!:number;
  @Input({ required: true }) r!:number;
  @Input({ required: true }) Left_set_description = "";
  @Input({ required: true }) Right_set_description = "";
  @Input() mode: string[] = ['equal', 'equal'];
  public firstSelected: any | undefined = undefined;
  public secondSelected: any | undefined = undefined;


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
    let refrence = this.leftcenter.nativeElement.append(this.firstSelected[0].nativeElement)
    this.rightcenter.nativeElement.append(this.secondSelected[0].nativeElement);
    console.log(this.firstSelected[0].nativeElement.objectInfo)
    this.firstSelected = undefined;
    this.secondSelected = undefined;
  }
  cardunselected($event: any) {
    // is Card 1
    if ($event[1].description == this.firstSelected[1].description ) {
      this.firstSelected = undefined;
      return;
    }

    // }
  }
  ngOnInit() {
    if (this.r == -1) {
      this.r = this.n;
    }
    let cards = this.generate_cards_equal_n();
    this.rowonecards = cards[0]
    this.rowtwocards = cards[1]
  }
  constructor(private renderer2: Renderer2,
              private cardRender: ObjectRendererService,
              @Inject(DOCUMENT) private document: Document) {

  }
  generate_cards_equal_n() {
    switch (this.mode[0]) {
      case 'equal':
        switch (this.mode[1]) {
          case 'equal':
            return this.equal_n_equal_r();

          case 'less':
            return this.equal_n_less_r();
          default: return []
        }
      case 'less':
        switch (this.mode[1]) {
          case 'equal':
            return this.less_n_equal_r();

          case 'less':
            return this.less_n_less_r();

          default: return []
        }
      default: return []
    }

  }

  equal_n_less_r() {
    let k_left = 0;
    let k_right = 0;
    let temp_list_one: any[] = [];
    let temp_list_two: any[] = []
    for (let i = 0; i <= this.n; i++) {
      let row_one_images = this.cardRender.getCardsbyNandR(this.n, i, this.Left_set_description).subscribe((row_one_images) => {
        for (let image of row_one_images) {
          temp_list_one.push({
            status: 10,
            description: this.Left_set_description,
            graphic: image,
            id: k_left,
            n: this.n,
            r: i
          })
          k_left++;
        }
        for (let i = temp_list_one.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [temp_list_one[i], temp_list_one[j]] = [temp_list_one[j], temp_list_one[i]];
        }
      });
      let row_two_images = this.cardRender.getCardsbyNandR(this.n, i, this.Right_set_description).subscribe((row_two_images) => {
        for (let image of row_two_images) {
          temp_list_two.push({
            status: 11, description: this.Right_set_description, graphic: image, id: k_right, n: this.n,  r: i
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
  equal_n_equal_r() {
    let k_left = 0;
    let k_right = 0;
    let temp_list_one: any[] = [];
    let temp_list_two: any[] = []

      let row_one_images = this.cardRender.getCardsbyNandR(this.n, this.r, this.Left_set_description).subscribe((row_one_images) => {
        for (let image of row_one_images) {
          temp_list_one.push({
            status: 10,
            description: this.Left_set_description,
            graphic: image,
            id: k_left,
            n: this.n,
            r: this.r
          })
          k_left++;
        }
        for (let i = temp_list_one.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [temp_list_one[i], temp_list_one[j]] = [temp_list_one[j], temp_list_one[i]];
        }
      });
      let row_two_images = this.cardRender.getCardsbyNandR(this.n, this.r, this.Right_set_description).subscribe((row_two_images) => {
        for (let image of row_two_images) {
          temp_list_two.push({
            status: 11, description: this.Right_set_description, graphic: image, id: k_right, n: this.n,  r: this.r
          })
          k_right++;
        }
        for (let i = temp_list_two.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [temp_list_two[i], temp_list_two[j]] = [temp_list_two[j], temp_list_two[i]];
        }
      });
    return [temp_list_one,temp_list_two];
  }
  less_n_less_r() {
    let k_left = 0;
    let k_right = 0;
    let temp_list_one: any[] = [];
    let temp_list_two: any[] = []
    for (let j = 0; j <= this.r; j++) {
    for (let i = 0; i <= this.r; i++) {
      let row_one_images = this.cardRender.getCardsbyNandR(j, i, this.Left_set_description).subscribe((row_one_images) => {
        for (let image of row_one_images) {
          temp_list_one.push({
            status: 10,
            description: this.Left_set_description,
            graphic: image,
            id: k_left,
            n: j,
            r: i
          })
          k_left++;
        }
        for (let i = temp_list_one.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [temp_list_one[i], temp_list_one[j]] = [temp_list_one[j], temp_list_one[i]];
        }
      });
      let row_two_images = this.cardRender.getCardsbyNandR(j, i, this.Right_set_description).subscribe((row_two_images) => {
        for (let image of row_two_images) {
          temp_list_two.push({
            status: 11, description: this.Right_set_description, graphic: image, id: k_right, n: j,  r: i
          })
          k_right++;
        }
        for (let i = temp_list_two.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [temp_list_two[i], temp_list_two[j]] = [temp_list_two[j], temp_list_two[i]];
        }
      });}}
    return [temp_list_one,temp_list_two];
  }
  less_n_equal_r() {
    let k_left = 0;
    let k_right = 0;
    let temp_list_one: any[] = [];
    let temp_list_two: any[] = []
    for (let i = 0; i <= this.n; i++) {
      let row_one_images = this.cardRender.getCardsbyNandR(i, this.r, this.Left_set_description).subscribe((row_one_images) => {
        for (let image of row_one_images) {
          temp_list_one.push({
            status: 10,
            description: this.Left_set_description,
            graphic: image,
            id: k_left,
            n: i,
            r: this.r
          })
          k_left++;
        }
        for (let i = temp_list_one.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [temp_list_one[i], temp_list_one[j]] = [temp_list_one[j], temp_list_one[i]];
        }
      });
      let row_two_images = this.cardRender.getCardsbyNandR(i, this.r, this.Right_set_description).subscribe((row_two_images) => {
        for (let image of row_two_images) {
          temp_list_two.push({
            status: 11, description: this.Right_set_description, graphic: image, id: k_right, n: i,  r: this.r
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

}
