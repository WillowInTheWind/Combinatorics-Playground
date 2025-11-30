import {Component, ElementRef, Inject, Input, Renderer2, ViewChild} from '@angular/core';
import {DOCUMENT, NgForOf} from "@angular/common";
import {CombinatorialObjectCard, ObjectCardComponent} from "../object-card/object-card.component";
import {ObjectRendererService} from "../object-renderer.service";
import {DomSanitizer} from "@angular/platform-browser";
import {AsyncPipe, CommonModule} from "@angular/common";
import {min, Observable} from "rxjs";
import {CardManagerService} from "../cardmanager.service";

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
  @Input({ required: true }) k = 10;
  @Input({ required: true }) Left_set_description = "";
  @Input({ required: true }) Right_set_description = "";
  public firstSelected: any | undefined = undefined;
  public secondSelected: any | undefined = undefined;

  click () {
    console.log(this.manager.positions)
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
     this.generate_cards_up_to_k();

  }
  constructor(private renderer2: Renderer2,
              private cardRender: ObjectRendererService,
              @Inject(DOCUMENT) private document: Document,
              private sanitizer: DomSanitizer,
              protected manager: CardManagerService
  ) {

  }

  async generate_cards_up_to_k() {
    let temp_list_one: any[] = [];
    let temp_list_two: any[] = []
    let row_one_images = this.cardRender.getCardsbyFixedTotal(this.k, this.Left_set_description).subscribe(images => {
      console.log(typeof(images));
      console.log(images);
      for (let image of images) {
        temp_list_one.push({
          status: 10,
          description: this.Left_set_description,
          graphic: this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' +image.graphic),
          id: image.id,
          n: image.n,
          r: image.r,
        })
      }
      for (let i = temp_list_two.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [temp_list_one[i], temp_list_one[j]] = [temp_list_one[j], temp_list_one[i]];
      }
      this.rowonecards = temp_list_one;
    })
    let row_two_images = this.cardRender.getCardsbyFixedTotal(this.k, this.Right_set_description).subscribe(images => {
      console.log(typeof(images));
      console.log(images);
      for (let image of images) {
        temp_list_two.push({
          status: 11,
          description: this.Right_set_description,
          graphic: this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' +image.graphic),
          id: image.id,
          n: image.n,
          r: image.r,
        })
      }
      for (let i = temp_list_two.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [temp_list_two[i], temp_list_two[j]] = [temp_list_two[j], temp_list_two[i]];
      }
      this.rowtwocards = temp_list_two;
    })

  }


  protected readonly Array = Array;
  protected readonly console = console;
}
