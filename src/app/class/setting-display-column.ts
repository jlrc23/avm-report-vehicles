import {SettingDisplayColumnInterface} from '../interfaces/setting-display-column.interface';

export class SettingDisplayColumn implements SettingDisplayColumnInterface{
  code: string;
  title: string;
  visible: boolean;

  constructor(code: string, title: string, visible: boolean = true) {
    this.code = code;
    this.title = title;
    this.visible = visible;
  }
}
