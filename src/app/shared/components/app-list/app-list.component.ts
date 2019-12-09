import { Component, OnInit, Input } from '@angular/core';
import { ErrorService } from '../../services/error.service';
import { NotificationService } from '../../services/notification.service';
import { AppService } from '../../services/app.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateAppComponent } from './create-app/create-app.component';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.css']
})
export class AppListComponent implements OnInit {
  @Input() knowledges: any;
  processing: boolean;
  apps: any [];
  constructor(
    private errorService: ErrorService,
    private appService: AppService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
  ) { }

  async ngOnInit() {
    await this._loadApp();
  }

  showModal() {
    const dialogRef = this.dialog.open(CreateAppComponent, {
      width: '600px',
      data: {  knws: this.knowledges }
    });

    dialogRef.afterClosed().subscribe(async(result = {}) => {
      await this._saveNewApp(result.body);
    });
  }

  async _saveNewApp(data) {
    if (!data || this.processing) return;
    try {
      this.processing = true;
      await this.appService.create(data);
      this.notificationService.show('App created succefully');
      await this._loadApp();
    } catch (e) {
      this.errorService.show(e);
    } finally {
      this.processing = false;
    }
  }

  async _loadApp() {
    try {
      this.processing = true;
      const { apps }: any = await this.appService.getList();
      this.apps = apps;
    } catch (e) {
      this.errorService.show(e);
    } finally {
      this.processing = false;
    }
  }

}
