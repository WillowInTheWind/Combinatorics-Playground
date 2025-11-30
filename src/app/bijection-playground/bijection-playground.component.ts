import {
  Component,
  ComponentFactoryResolver, ComponentRef,
  ElementRef,
  Inject,
  Renderer2,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {CombinatorialObjectCard, ObjectCardComponent} from "../object-card/object-card.component";
import {TikzRendererComponent} from "../tikz-renderer/tikz-renderer.component";
import {DOCUMENT, NgForOf, NgIf} from "@angular/common";
import { EventEmitter } from '@angular/core';
import {CdkDrag} from "@angular/cdk/drag-drop";
import {MatFormField, MatLabel, MatOption, MatSelect, MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {ObjectRendererService} from "../object-renderer.service";
import {PlaygroundCenterComponent} from "../playground-center/playground-center.component";
declare var LeaderLine: any;

@Component({
  selector: 'app-bijection-playground',
  standalone: true,
  imports: [
    NgForOf,
    MatFormFieldModule,
    MatSelectModule,
    MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, NgIf, PlaygroundCenterComponent
  ],
  templateUrl: './bijection-playground.component.html',
  styleUrl: './bijection-playground.component.scss'
})
export class BijectionPlaygroundComponent {
  N_MAX :number = 7;
  Ks = [10,20,50];
  Current_K : number = 10;
  @ViewChild('playgroundhost', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;

  nmode :string = 'equal';
  rmode :string = 'equal';
  N = Array.from({length: this.N_MAX}, (x, i) => i)
  R = Array.from({length: this.N_MAX}, (x, i) => i)

  Set_options: string[] =  ["fullparentheses", "domino_tiling", "dyckpaths","pixelstrips", "starfolkspaths"];
  Left_set_description = "fullparentheses";
  Right_set_description = "fullparentheses";


  constructor(private renderer2: Renderer2,
              private cardRender: ObjectRendererService,
              @Inject(DOCUMENT) private document: Document,private viewContainerRef: ViewContainerRef) {

  }

   onKSelectChange(event:any) {
    this.Current_K = event
   }

  onleftobjectSelectChange(event:any) {
    this.Left_set_description = event

  }
  onrightobjectSelectChange(event:any) {
    this.Right_set_description = event
  }



  generate_playground_canvas () {
    this.viewContainerRef.clear()
    const component = this.viewContainerRef.createComponent(PlaygroundCenterComponent);
    component.instance.k = this.Current_K;
    component.instance.Left_set_description = this.Left_set_description;
    component.instance.Right_set_description = this.Right_set_description;
  }
  using_r: any;
}
