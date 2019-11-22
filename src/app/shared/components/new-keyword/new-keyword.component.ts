import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { RessourcesService } from '../../services/ressources.service';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-new-keyword',
  templateUrl: './new-keyword.component.html',
  styleUrls: ['./new-keyword.component.css']
})
export class NewKeywordComponent implements OnInit {
  _knowledgeId: string;
  title: string;
  key: string;
  values: string;
  pairs: any = [];
  processing: boolean;
  constructor(
    private notificationService: NotificationService,
    private ressourcesService: RessourcesService,
    private errorService: ErrorService
  ) { }

  @Input('knowledgeId')
  set knowledgeId(knowledgeId) {
    this._knowledgeId = knowledgeId;
  }

  ngOnInit() {
  }

  add() {
    this.pairs.push({ key: this.key, values: this.values });
    this.key = null;
    this.values = null;
  }

  remove(index) {
    this.pairs = this.pairs.slice(0, index)
      .concat(this.pairs.slice(index + 1));
    console.log(this.pairs)
  }

  nothingToAdd() {
    return !this.key || !this.values;
  }

  someEmptySlot() {
    return this.pairs.some(paire => {
      return !paire.key || !paire.values;
    });
  }

  async save() {
    if (this.processing) return true;
    this.processing = true;
    try {
      const data = this.buildData(this.title, this.pairs);
      const { knowledge } : any = await this.ressourcesService.update(this._knowledgeId, data);
      this.updateSucceed(knowledge);
    } catch (e) {

    } finally {

    }
  }

  buildData(title, pairs) {
    const data = {
      keyWords: {
        [title]: this._build(pairs)
      }
    }
    return data;
  }

  updateSucceed(knowledge) {
    this._reset();
    this.notificationService.show('your changes were saved successfully');
    this.ressourcesService.reload();
  }

  _reset() {
    this.title = null;
    this.pairs = [];
  }

  _build(pairs) {
    return pairs.reduce((result, pair) => {
      result[pair.key] = pair.values.split(', ').map(item => item.split(' '));
      return result;
    }, {});
  }

}
