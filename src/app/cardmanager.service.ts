import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CardManagerService {
  positionsSubject : Subject<any> = new Subject<any>();

  public positions: Map<number, Map<number, Pose2d>> = new Map();
  THRESHOLD: number = 35994;
  constructor() {
      this.positions.set(0, new Map());
      this.positions.set(1, new Map());
  }

  checkforclosecard(pose: Pose2d, position: number) {
    let searchable_positions = this.positions.get((position+1)%2)
    if (searchable_positions == undefined){
      return -1;}
    let k = -1
    for (let [index, position] of searchable_positions) {
        if (this.getSquareDistance(pose, position) <= this.THRESHOLD) {
          k = index;
          break;
        }
    }
    return k
  }

  getSquareDistance( pos1: Pose2d,pos2: Pose2d): number
  { return (pos1.x-pos2.x)**2 + (pos1.y-pos2.y)**2; };
  updatePosition (k: number, pos: Pose2d, status:number ) {
    // @ts-ignore
    this.positions.get(status%10).set(k, pos)
    this.positionsSubject.next(this.positions);

  }
}

export interface Pose2d  {
  x: number,
  y:number
}
