import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ObjectRendererService {
   getCardsbyNandR (n: number, r: number, set: string) {
    let image_urls: SafeUrl[] = []
    // let image_bytes = this.http.get<any>().subscribe(
    //
    //
    //       (res: any) => {
    //       // console.log(res)
    //
    //       }
    // )
    // console.log("http request completed - returning URLS")
  //   to do
  //    return image_urls;

      return this.http.get( "http://127.0.0.1:5000/api/binary/" + set + "/n_r",{params: {
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
