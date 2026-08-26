import { Observable } from 'rxjs';

import { CmsPage } from '../models/cms.model';

export abstract class CmsAdapter {
  abstract getPage(pageId: string): Observable<CmsPage>;
}
