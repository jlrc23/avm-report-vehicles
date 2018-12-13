import { NgModule } from '@angular/core';
import { PromptSelectorComponent } from './prompt-selector.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
      CommonModule,
      FormsModule
  ],
  declarations: [PromptSelectorComponent],
  exports: [PromptSelectorComponent]
})
export class PromptSelectorModule { }
