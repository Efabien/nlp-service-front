import { Component, Input } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { RessourcesService } from '../../services/ressources.service';
import { ErrorService } from '../../services/error.service';
import * as sha1 from 'sha1';

@Component({
  selector: 'app-keyword',
  templateUrl: './keyword.component.html',
  styleUrls: ['./keyword.component.css']
})
export class KeywordComponent {
  title: string;
  id: string;
  keyWord: any;
  stateHash: string;
  processing: boolean;
  Object = Object;
  holder: any = {};

  @Input('activeKeyWord')
  set activeKeyWord(activeKeyWord) {
    this.title = activeKeyWord.title;
    this.id = activeKeyWord.id;
    delete activeKeyWord.title;
    delete activeKeyWord.id;
    this.keyWord = activeKeyWord;
    Object.keys(this.keyWord).forEach(key => {
      this.holder[key] = this.keyWord[key].map(item => item.join(' ')).join(', ');
    })
    this.stateHash = this._calculateHash(this.holder);
  }

  constructor(
    private notificationService: NotificationService,
    private ressourcesService: RessourcesService,
    private errorService: ErrorService,
  ) { }
  
  async save() {
    if (!this.hasChanges() || this.processing) return;
    this.processing = true;
    try {
      const data = {
        keyWords: {
          [`${this.title}`]: this._reConstitute(this.holder)
        }
      }
      console.log(data)
      const { knowledge } : any = await this.ressourcesService.update(this.id, data);
      this.updateSucceed(knowledge);
    } catch (e) {
      this.errorService.show(e);
    } finally {
      this.processing = false;
    }
  }

  updateSucceed(knowledge) {
    this.notificationService.show('your changes were saved successfully');
    this.ressourcesService.emitKnwldgeUpdate({ knowledge, source: 'keyWord' });
    const selection = this.ressourcesService.selectIntentFromKnowledge(
      [knowledge], this.keyWord.title
    );
    this.ressourcesService.emitSelectedKeyWord({ selection, title: this.title });
  }

  _reConstitute(holder) {
    return Object.keys(holder).reduce((result, key) => {
      result[key] = holder[key].split(', ').map(item => item.split(' '));
      return result;
    }, {});
  }

  _calculateHash(holder) {
    return sha1(
      Object.keys(holder).reduce((string, key) => {
        string += holder[key];
        return string;
      }, '')
    );
  }

  hasChanges() {
    return this.stateHash !== this._calculateHash(this.holder);
  }

  isSomeKeyWordEmpty() {
    return Object.keys(this.holder).some(key => {
      return !this.holder[key];
    });
  }
}
