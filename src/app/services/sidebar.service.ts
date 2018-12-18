import {Injectable} from '@angular/core';
import {MatSidenav} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidebar: MatSidenav;
  private show: boolean = false;

  constructor() {
  }

  public toggle(): boolean {
    this.show = !this.show;
    if (this.sidebar) {
      if (this.show) {
        this.sidebar.open();
      } else {
        this.sidebar.close();
      }
    }
    return this.show;
  }

  public close(): boolean {
    this.show = false;
    if (this.sidebar) {
      this.sidebar.close();
    }
    return this.show;
  }

  public open(): boolean {
    this.show = true;
    if (this.sidebar) {
      this.sidebar.open();
    }
    return this.show;
  }

  public setSidebar(sidebar) {
    if (!this.sidebar && this.show) {
      this.sidebar = sidebar;
      this.sidebar.open();
    } else {
      this.sidebar = sidebar;
    }
  }
}
