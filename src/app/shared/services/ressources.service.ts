import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RessourcesService {
  private server: string;
  public activeIntent: EventEmitter<any> = new EventEmitter<any>();
  public activeKeyWord: EventEmitter<any> = new EventEmitter<any>();
  public knowledgeUpdate: EventEmitter<any> = new EventEmitter<any>();
  public createKldge: EventEmitter<any> = new EventEmitter<any>();
  public reloadData: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private http: HttpClient,
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

  emitSelectedKeyWord(event) {
    this.activeKeyWord.emit(event);
  }

  emitKnwldgeUpdate(knowledge) {
    this.knowledgeUpdate.emit(knowledge);
  }

  emitCreation() {
    this.createKldge.emit();
  }

  reload() {
    this.reloadData.emit();
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

  getIdFromTitle(knowledges, title) {
    return knowledges.find(knw => {
      return Object.keys(knw.intents)
        .concat(Object.keys(knw.keyWords)).includes(title)
    })._id;
  }

  update(id, data) {
    const url = `${this.server}/resources/${id}`;
    return this.http.patch(url, data).toPromise();
  }

  add(data) {
    const url = `${this.server}/resources`;
    return this.http.post(url, data).toPromise();
  }

  test(data) {
    const url = `${this.server}/analyses/test`;
    return this.http.post(url, data).toPromise();
  }

  updateTest(data) {
    const url = `${this.server}/analyses/test`;
    return this.http.patch(url, data).toPromise();
  }

  getTestCases() {
    const url = `${this.server}/analyses/test`;
    return this.http.get(url).toPromise();
  }
}
