import {
  Component,
  ElementRef,
  Inject,
  input,
  Input,
  Renderer2,
  viewChild,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-tikz-renderer',
  standalone: true,
  imports: [],
  templateUrl: './tikz-renderer.component.html',
  styleUrl: './tikz-renderer.component.css'
})
export class TikzRendererComponent {
  @Input() index: number | undefined;
  @Input() graphic: string | undefined;
  @ViewChild('tikz') element2!: ElementRef;
  @Input() horizontalSize: number = 5;
  constructor(private renderer2: Renderer2,
              @Inject(DOCUMENT) private document: Document) {

  }
  ngOnInit() {
    if (this.graphic == undefined) {
      this.graphic ="  \\begin{tikzpicture}\n" +
        "    \\draw (0,0) circle (1in);\n" +
        "  \\end{tikzpicture}"
    }
  }
  ngAfterViewInit() {

      const script = this.element2.nativeElement.querySelector(`script[type="text/tikz"]`);
    // if (this.document.getElementsByTagName('script').length == 0) {
      if (!!script) {}
      else {
        const s = this.renderer2.createElement('script');
        s.type = 'text/tikz';

        s.text ="  \\begin{tikzpicture}\n" +
          this.graphic+
          "  \\end{tikzpicture}"
      // @ts-ignore
        this.renderer2.appendChild(this.element2.nativeElement, s);

    //}\
  } }
}
