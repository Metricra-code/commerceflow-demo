import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-promo-block',
  templateUrl: './promo-block.component.html',
  styleUrl: './promo-block.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromoBlockComponent {
  readonly data = input.required<Record<string, unknown>>();
  readonly index = computed(() => String(this.data()['index'] ?? ''));
  readonly label = computed(() => String(this.data()['label'] ?? ''));
  readonly body = computed(() => String(this.data()['body'] ?? ''));
}
