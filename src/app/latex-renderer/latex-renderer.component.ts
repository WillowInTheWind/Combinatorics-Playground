import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { ConfigService } from '../config.service'
@Component({
  selector: 'app-latex-renderer',
  standalone: true,
  imports: [],
  templateUrl: './latex-renderer.component.html',
  styleUrl: './latex-renderer.component.scss'
})
//https://github.com/shubhvjain/angular-mathjax/tree/master
export class LatexRendererComponent implements OnInit {
  @Input() content : string | undefined;

  constructor(public cs: ConfigService) { }
  mathJaxObject :any;

  ngOnChanges(changes: SimpleChanges) {
    // to render math equations again on content change
    if (changes['content']) {
      this.renderMath()
    }
  }
  ngOnInit() {
    this.loadMathConfig()
    this.renderMath();
  }

  updateMathObt(){
    let native_global_reference : any = this.cs.nativeGlobal();
    this.mathJaxObject = native_global_reference['MathJax'];
  }

  renderMath() {
    this.updateMathObt();
    let angObj = this;
    setTimeout(() => {
      angObj.mathJaxObject['Hub'].Queue(["Typeset", angObj.mathJaxObject.Hub], 'mathContent');
    },1000)
  }
  loadMathConfig() {
    this.updateMathObt();
    this.mathJaxObject.Hub.Config({
      showMathMenu: false,
      tex2jax: { inlineMath: [["$", "$"]],displayMath:[["$$", "$$"]] },
      menuSettings: { zoom: "Double-Click", zscale: "150%" },
      CommonHTML: { linebreaks: { automatic: true } },
      "HTML-CSS": { linebreaks: { automatic: true } },
      SVG: { linebreaks: { automatic: true } }
    });
  }
}
