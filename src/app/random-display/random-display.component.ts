import {Component, Inject, Renderer2, ViewChild, ViewContainerRef} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {DOCUMENT, NgForOf, NgIf} from "@angular/common";
import {ObjectRendererService} from "../object-renderer.service";
@Component({
  selector: 'app-random-display',
  standalone: true,
    imports: [
        FormsModule,
        NgForOf,
        NgIf
    ],
  templateUrl: './random-display.component.html',
  styleUrl: './random-display.component.css'
})
export class RandomDisplayComponent {
    set_options: string[] = ["fullparentheses", "dyckpaths", "pixelstrips", "starfolkspaths"];
    Current_N: number = 0;
    R: number[]=[];
  N_MAX :number = 15;
  graphic: string ="";
  Current_R !: number;
  set_description: string = "";
  n_bottom: number = 0;
  n_top: number = this.N_MAX;
  nmode :string = 'equal';
  rmode :string = 'equal';
  using_r: boolean = false;

  N = Array.from({length: this.N_MAX}, (x, i) => i)
  onNSelectChange(event:any) {
    this.Current_N = event
    console.log("N CHECKED", this.Current_N);

    this.R = Array.from({length: this.Current_N+1 }, (x,i) => i).map(Number)


  }
  onobjectSelectChange (event:any) {
    this.set_description = event;
    this.R = Array.from({length: this.Current_N+1 }, (x,i) => i).map(Number)

  }
  constructor(private renderer2: Renderer2,
              private cardRender: ObjectRendererService,
              @Inject(DOCUMENT) private document: Document,private viewContainerRef: ViewContainerRef) {

  }

  generateRandomElement() {
    let n_value: number = Math.floor(Math.random()*(this.n_top- this.n_bottom) + this.n_bottom);
    let r_value: number = Math.floor(Math.random()*(n_value));
    let length = 0;
    let canidates = this.cardRender.getCardsbyNandR(n_value, r_value, this.set_description).subscribe((cards) => {
        length = cards.length;
      let card = Math.floor(Math.random() * length);
      this.graphic = cards[card];
      console.log(this.graphic);
    });
  }
}
