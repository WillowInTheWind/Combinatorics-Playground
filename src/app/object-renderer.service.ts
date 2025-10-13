import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ObjectRendererService {
    api_url: string = environment.api_url;
   getCardsbyNandR (n: number, r: number, set: string) {
    let image_urls: SafeUrl[] = []


      return this.http.get( this.api_url + set + "/n_r",{params: {
         n: n, r: r}}).pipe(
       map(res => {
         /* Your processing here */
         // @ts-ignore
         // console.log(res)
       return res.result.map(result => {
         return this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + result);
       });}),
     )

   }
  constructor(private sanitizer: DomSanitizer, private http: HttpClient) { }
}
