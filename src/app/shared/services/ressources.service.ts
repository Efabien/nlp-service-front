import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class RessourcesService {
  private server: string;
  public activeIntent: EventEmitter<any> = new EventEmitter<any>();
  public knowledgeUpdate: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private http: HttpClient
  ) {
    this.server = environment.hosts.server;
  }

  getList() {
    const url = `${this.server}/resources`;
    return this.http.get(url).toPromise();
  }

  emitSelectedIntent(event) {
    this.activeIntent.emit(event);
  }

  emitKnwldgeUpdate(knowledge) {
    this.knowledgeUpdate.emit(knowledge);
  }

  selectIntentFromKnowledge(knowledges, intentKey) {
    const intents = knowledges.reduce((result, item) => {
      Object.keys(item.intents).forEach(key => {
        item.intents[key].id = item._id;
      });
      return Object.assign(result, item.intents);
    }, {}); 
    return intents[intentKey];
  }

  update(id, data) {
    const url = `${this.server}/resources/${id}`;
    return this.http.patch(url, data).toPromise();
  }
}
