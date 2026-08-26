import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { CmsComponentData } from '../../../../core/models/cms.model';
import { HeroBannerComponent } from '../hero-banner/hero-banner.component';
import { PromoBlockComponent } from '../promo-block/promo-block.component';

@Component({
  selector: 'app-cms-component-renderer',
  imports: [HeroBannerComponent, PromoBlockComponent],
  template: `
    <!-- This small mapping mirrors Spartacus typeCode → Angular component registration. -->
    @switch (component().typeCode) {
      @case ('SimpleBannerComponent') {
        <app-hero-banner [data]="component().data" />
      }
      @case ('PromoBlockComponent') {
        <app-promo-block [data]="component().data" />
      }
    }
  `,
  styles: ':host { display: contents; }',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CmsComponentRendererComponent {
  readonly component = input.required<CmsComponentData>();
}
