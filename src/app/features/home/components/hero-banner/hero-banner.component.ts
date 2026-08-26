import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-hero-banner',
  imports: [IconComponent, RouterLink],
  templateUrl: './hero-banner.component.html',
  styleUrl: './hero-banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroBannerComponent {
  readonly data = input.required<Record<string, unknown>>();
  readonly eyebrow = computed(() => this.readValue('eyebrow'));
  readonly headline = computed(() => this.readValue('headline'));
  readonly subtitle = computed(() => this.readValue('subtitle'));
  readonly ctaLabel = computed(() => this.readValue('ctaLabel'));
  readonly ctaUrl = computed(() => this.readValue('ctaUrl'));
  readonly imageUrl = computed(() => this.readValue('imageUrl'));

  private readValue(key: string): string {
    return String(this.data()[key] ?? '');
  }
}
