export interface CmsPage {
  id: string;
  slots: CmsSlot[];
}

export interface CmsSlot {
  position: string;
  components: CmsComponentData[];
}

export interface CmsComponentData {
  uid: string;
  typeCode: string;
  data: Record<string, unknown>;
}
