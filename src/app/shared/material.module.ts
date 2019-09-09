import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule,
  MatListModule, MatSelectModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {LayoutModule} from '@angular/cdk/layout';
import {OverlayModule} from '@angular/cdk/overlay';
import {MatTabsModule} from '@angular/material/tabs';

const items = [
  CommonModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatListModule,
  MatSidenavModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  DragDropModule,
  MatCardModule,
  MatCheckboxModule,
  MatSelectModule,
  LayoutModule,
  OverlayModule,
  MatTabsModule
];

@NgModule({
  declarations: [],
  imports: items,
  exports: items
})
export class MaterialModule {}
