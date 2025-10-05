import {Component, inject, Input} from '@angular/core';
import {SafeUrl} from "@angular/platform-browser";
import {MAT_DIALOG_DATA, MatDialogContainer, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";

@Component({
  selector: 'app-imagemodal',
  standalone: true,
  imports: [
    MatDialogContainer,
    MatDialogTitle,
    MatDialogContent
  ],
  templateUrl: './imagemodal.component.html',
  styleUrl: './imagemodal.component.scss'
})
export class ImagemodalComponent {
  data = inject(MAT_DIALOG_DATA);

}
