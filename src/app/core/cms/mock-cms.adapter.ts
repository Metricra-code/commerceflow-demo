import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';

import { CmsPage } from '../models/cms.model';
import { CmsAdapter } from './cms.adapter';

const HOME_PAGE: CmsPage = {
  id: 'homepage',
  slots: [
    {
      position: 'TopContent',
      components: [
        {
          uid: 'homeHeroBanner',
          typeCode: 'SimpleBannerComponent',
          data: {
            eyebrow: 'Commerce architecture, in motion',
            headline: 'Modern Commerce, Composable by Design',
            subtitle: 'A lightweight Angular storefront inspired by SAP Spartacus architecture.',
            ctaLabel: 'Explore Products',
            ctaUrl: '/products',
            imageUrl: '/images/shoe001.svg'
          }
        }
      ]
    },
    {
      position: 'Section1',
      components: [
        {
          uid: 'architecturePromo',
          typeCode: 'PromoBlockComponent',
          data: {
            index: '01',
            label: 'Replaceable by design',
            body: 'Components call facades. Connectors delegate to adapters. Mock OCC stays at the edge.'
          }
        },
        {
          uid: 'cmsPromo',
          typeCode: 'PromoBlockComponent',
          data: {
            index: '02',
            label: 'Content, not templates',
            body: 'The homepage follows a Page → Slot → Component model mapped from a mock CMS response.'
          }
        }
      ]
    }
  ]
};

@Injectable()
export class MockCmsAdapter extends CmsAdapter {
  getPage(pageId: string): Observable<CmsPage> {
    if (pageId !== HOME_PAGE.id) {
      return throwError(() => new Error(`CMS page ${pageId} was not found`));
    }

    return of(structuredClone(HOME_PAGE)).pipe(delay(180));
  }
}
