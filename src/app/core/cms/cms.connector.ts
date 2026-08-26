import { Injectable } from '@angular/core';

import { CmsAdapter } from './cms.adapter';

@Injectable({ providedIn: 'root' })
export class CmsConnector {
  constructor(private readonly adapter: CmsAdapter) {}

  getPage(pageId: string) {
    return this.adapter.getPage(pageId);
  }
}
