import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type IconName =
  | 'arrow-left'
  | 'arrow-right'
  | 'minus'
  | 'package'
  | 'plus'
  | 'search'
  | 'shopping-bag'
  | 'trash';

@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    <svg viewBox="0 0 24 24" focusable="false">
      @switch (name()) {
        @case ('shopping-bag') {
          <g>
            <path d="M6.331 8H17.67a2 2 0 0 1 1.977 2.304l-1.255 8.152A3 3 0 0 1 15.426 21H8.574a3 3 0 0 1-2.965-2.544l-1.255-8.152A2 2 0 0 1 6.331 8" />
            <path d="M9 11V6a3 3 0 0 1 6 0v5" />
          </g>
        }
        @case ('search') {
          <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m18 11l-6-6" />
        }
        @case ('arrow-right') {
          <path d="M5 12h14m-6 6l6-6m-6-6l6 6" />
        }
        @case ('arrow-left') {
          <path d="M5 12h14M5 12l6 6m-6-6l6-6" />
        }
        @case ('minus') {
          <path d="M5 12h14" />
        }
        @case ('plus') {
          <path d="M12 5v14m-7-7h14" />
        }
        @case ('trash') {
          <path d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
        }
        @case ('package') {
          <path d="m12 3l8 4.5v9L12 21l-8-4.5v-9zm0 9l8-4.5M12 12v9m0-9L4 7.5m12-2.25l-8 4.5" />
        }
      }
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
      height: 1.25em;
      width: 1.25em;
    }

    svg {
      height: 100%;
      width: 100%;
      fill: none;
      stroke: currentColor;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 2;
    }
  `
})
export class IconComponent {
  readonly name = input.required<IconName>();
}
