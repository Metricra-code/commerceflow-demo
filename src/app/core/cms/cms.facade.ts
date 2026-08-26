import { Injectable } from '@angular/core';

import { CmsConnector } from './cms.connector';

@Injectable({ providedIn: 'root' })
export class CmsFacade {
  constructor(private readonly connector: CmsConnector) {}

  getPage(pageId: string) {
    return this.connector.getPage(pageId);
  }
}
