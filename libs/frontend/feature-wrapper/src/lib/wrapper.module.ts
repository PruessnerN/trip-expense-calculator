import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { WrapperComponent } from './wrapper/wrapper.component';

@NgModule({
  declarations: [WrapperComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [WrapperComponent],
})
export class WrapperModule {}
