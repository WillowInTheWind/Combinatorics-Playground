import {Component, Inject, Renderer2} from '@angular/core';
import {CombinatorialObjectCard, ObjectCardComponent} from "../object-card/object-card.component";
import {TikzRendererComponent} from "../tikz-renderer/tikz-renderer.component";
import {DOCUMENT, NgForOf} from "@angular/common";
import { EventEmitter } from '@angular/core';

import {CdkDrag} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-bijection-playground',
  standalone: true,
  imports: [
    ObjectCardComponent,
    NgForOf,
  ],
  templateUrl: './bijection-playground.component.html',
  styleUrl: './bijection-playground.component.css'
})
export class BijectionPlaygroundComponent {
  public firstSelected: any | undefined = undefined;
  public secondSelected: any | undefined = undefined;
  classTwoGraphic = [     '\\draw[line width=3] (0,0) node[circle,fill=black] {};\n',
    '\\draw[line width=3] (0,0) node[circle,fill=black] {} -- (1,1) node[circle,fill=black] {}-- (2,0) node[circle,fill=black] {};\n',
    '\\draw[line width=3] (0,0) node[circle,fill=black] {} -- (1,1) node[circle,fill=black] {} -- (2,2) node[circle,fill=black] {} -- (3,1) node[circle,fill=black] {} -- (4,0) node[circle,fill=black] {};\n',
    '\\draw[line width=3] (0,0) node[circle,fill=black] {} -- (1,1) node[circle,fill=black] {}-- (2,0) node[circle,fill=black] {} -- (3,1) node[circle,fill=black] {} -- (4,0) node[circle,fill=black] {};\n',
    '\\draw[line width=3] (0,0) node[circle,fill=black] {} -- (1,1) node[circle,fill=black] {}-- (2,2) node[circle,fill=black] {} -- (3,3) node[circle,fill=black] {} -- (4,2) node[circle,fill=black] {} -- (5,1) node[circle,fill=black] {} -- (6,0) node[circle,fill=black] {};\n',
    '\\draw[line width=3] (0,0) node[circle,fill=black] {} -- (1,1) node[circle,fill=black] {}-- (2,2) node[circle,fill=black] {} -- (3,1) node[circle,fill=black] {} -- (4,2) node[circle,fill=black] {} -- (5,1) node[circle,fill=black] {} -- (6,0) node[circle,fill=black] {};\n',
    '\\draw[line width=3] (0,0) node[circle,fill=black] {} -- (1,1) node[circle,fill=black] {}-- (2,2) node[circle,fill=black] {} -- (3,1) node[circle,fill=black] {} -- (4,0) node[circle,fill=black] {} -- (5,1) node[circle,fill=black] {} -- (6,0) node[circle,fill=black] {};\n',
    '\\draw[line width=3] (0,0) node[circle,fill=black] {} -- (1,1) node[circle,fill=black] {}-- (2,0) node[circle,fill=black] {} -- (3,1) node[circle,fill=black] {} -- (4,2) node[circle,fill=black] {} -- (5,1) node[circle,fill=black] {} -- (6,0) node[circle,fill=black] {};\n'

  ]
  classOneGraphics = [

    "\\draw[line width=3,rounded corners,cap=round] (0,0) -- (0,1);\n"
    ,
    "\\draw[line width=3,rounded corners,cap=round] (0,0) -- (0,1);\n" +
"\\draw[line width=3,rounded corners,cap=round] (-1,2)--(0,1)--(1,2);\n"
,
"\\draw[line width=3,rounded corners,cap=round] (0,0) -- (0,1);\n"+
"\\draw[line width=3,rounded corners,cap=round] (-2,3)--(0,1)--(2,3);\n"+
"\\draw[line width=3,rounded corners,cap=round] (0,3)--(1,2);\n" ,
"\\draw[line width=3,rounded corners,cap=round] (0,0) -- (0,1);\n" +
"\\draw[line width=3,rounded corners,cap=round] (-2,3)--(0,1)--(2,3);\n" +
"\\draw[line width=3,rounded corners,cap=round] (0,3)--(-1,2);\n"
,
"\\draw[line width=3,rounded corners,cap=round] (0,0) -- (0,1);\n" +
"\\draw[line width=3,rounded corners,cap=round] (-3,4)--(0,1)--(3,4);\n" +
"\\draw[line width=3,rounded corners,cap=round] (1,4)--(2,3);\n" +
"\\draw[line width=3,rounded corners,cap=round] (-1,4)--(1,2);\n"
,
    "\\draw[line width=3,rounded corners,cap=round] (0,0) -- (0,1);\n" +
"\\draw[line width=3,rounded corners,cap=round] (-3,4)--(0,1)--(3,4);\n" +
"\\draw[line width=3,rounded corners,cap=round] (1,4)--(0,3);\n" +
"\\draw[line width=3,rounded corners,cap=round] (-1,4)--(1,2);\n",
"\\draw[line width=3,rounded corners,cap=round] (0,0) -- (0,1);\n" +
"\\draw[line width=3,rounded corners,cap=round] (-3,4)--(0,1)--(3,4);\n" +
"\\draw[line width=3,rounded corners,cap=round] (1,4)--(-1,2);\n" +
"\\draw[line width=3,rounded corners,cap=round] (-1,4)--(0,3);\n"
,

"\\draw[line width=3,rounded corners,cap=round] (0,0) -- (0,1);\n" +
"\\draw[line width=3,rounded corners,cap=round] (-3,4)--(0,1)--(3,4);\n" +
"\\draw[line width=3,rounded corners,cap=round] (1,4)--(2,3);\n"+
"\\draw[line width=3,rounded corners,cap=round] (-1,4)--(-2,3);\n"
]
  graphic1 =
    "    \\draw[line width=1,fill=gray] (0,0) -- (0,1)--(1,1)--(1,0)--(0,0);\n" +
    "    \\draw[line width=1] (1,0) -- (1,1)--(2,1)--(2,0)--(1,0);\n" +
    "    \\draw[line width=1] (2,0) -- (2,1)--(3,1)--(3,0)--(2,0);\n"
  graphic2 =
    "    \\draw[line width=1] (0,0) -- (0,1)--(1,1)--(1,0)--(0,0);\n" +
    "    \\draw[line width=1] (1,0) -- (1,1)--(2,1)--(2,0)--(1,0);\n" +
    "    \\draw[line width=1] (2,0) -- (2,1)--(3,1)--(3,0)--(2,0);\n" +
    "    \\draw[line width=1] (3,0) -- (3,1)--(4,1)--(4,0)--(3,0);\n"

  private myScriptElement: HTMLScriptElement;
  constructor(private renderer2: Renderer2,
              @Inject(DOCUMENT) private document: Document) {
    this.myScriptElement = this.document.createElement("script");
    this.myScriptElement.src = "https://tikzjax.com/v1/tikzjax.js";
    document.body.appendChild(this.myScriptElement);
    console.log(this.classOneGraphics)
  }

  cardSelected($event: any) {
    if (this.firstSelected == undefined) {
      this.firstSelected = $event;
    }
    else {
      //TO-DO: FIX LOGIC TO CHECK FOR DUPLICATES
      if ($event  == 0) {
        return;
      }
      this.secondSelected = $event;
      console.log("TWO CARDS SELECTED")
      //TO-DO: Pairing logic
      this.firstSelected = undefined;
      this.secondSelected = undefined;
    }
  }

}
