import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {
  public active: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }
  _knowledgeId: string;

  activate(onScreenName: any) {
    this.active.emit(onScreenName);
  }
}
