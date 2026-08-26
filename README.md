# CommerceFlow Demo

CommerceFlow Demo is a deliberately small Angular 19 storefront that demonstrates RxJS-driven product search, route-based product loading, reactive cart state, CMS component mapping, and a simplified SAP Spartacus-style integration architecture. The four-page experience is designed to be explained and demonstrated in roughly five minutes.

> **The demo does not connect to a real SAP Commerce Cloud environment. OCC and CMS APIs are mocked.**

## Why I Built This

This project was created to explore Angular and SAP Spartacus-style storefront architecture, focusing on concepts commonly used with SAP Commerce Cloud. It prioritizes clear boundaries and explainable data flow over feature quantity, and it does not claim production Spartacus experience.

The mocked integrations make the UI fully demonstrable without credentials or external systems while preserving a seam where real commerce or CMS adapters could be introduced later.

## What You Can Demo

- Home: a mock CMS response renders a hero, promotional components, and featured products.
- Products: six items load from a local OCC-style REST resource and filter through an RxJS search stream.
- Product detail: the route product code drives an adapter request using `map`, `filter`, and `switchMap`.
- Cart: `BehaviorSubject<CartEntry[]>` powers quantity updates, removal, item count, subtotal, and total.
- Responsive UI: the product grid adapts from three columns to two and then one.

## Architecture

The Product feature uses this intentionally explicit flow:

```text
Angular Component
        ↓
ProductFacade
        ↓
ProductConnector
        ↓
ProductAdapter
        ↓
MockOccProductAdapter
        ↓
Mock OCC REST resource
```

| Layer | Responsibility |
| --- | --- |
| Component | Renders state, captures user intent, and uses async pipe where possible. |
| Facade | Gives presentation code a small, stable product API. |
| Connector | Delegates requests and keeps calling conventions in one place. |
| Adapter | Defines the replaceable backend contract. |
| Mock OCC adapter | Uses Angular `HttpClient` against local JSON and simulates latency. |

Angular dependency injection binds the abstract adapter to the demo implementation:

```ts
{ provide: ProductAdapter, useClass: MockOccProductAdapter }
```

Replacing the mock with a real OCC adapter would not require the product pages or product cards to change.

### Project Structure

```text
src/app/
  core/
    api/                 # OCC BaseSite configuration
    cms/                 # CMS adapter, connector, and facade
    models/              # Product, cart, and CMS contracts
  features/
    home/                # CMS-driven homepage and component renderer
    products/
      adapters/
      components/
      connectors/
      facade/
      pages/
    cart/
      pages/
      services/
  layout/                # Storefront shell and header
  shared/                # Reusable icon component
public/
  api/occ/v2/electronics-spa/  # Mock OCC product response
  images/                      # Local product artwork
sample-data/                   # Example SAP Commerce Impex
```

## SAP Spartacus Concepts Demonstrated

- **Headless storefront architecture**: the Angular UI is separate from the commerce service boundary.
- **OCC-style API integration**: the demo models a product endpoint under `/occ/v2/electronics-spa/products`.
- **Adapter / connector separation**: transport details stay behind an abstract adapter.
- **CMS-driven pages**: homepage content is returned as structured CMS data instead of being entirely hard-coded in the page template.
- **Page → Slot → Component**: `CmsPage` contains ordered slots, and each slot contains typed CMS component data.
- **Component mapping**: `CmsComponentRendererComponent` maps a CMS `typeCode` such as `SimpleBannerComponent` to an Angular component.
- **BaseSite**: `electronics-spa` represents the site context carried in a typical OCC URL.
- **Extensibility over modifying core**: replace implementations through DI and mappings rather than coupling pages to a specific backend.

### SAP Commerce Cloud / OCC Vocabulary

- **SAP Commerce Cloud** is the commerce platform that owns concepts such as products, categories, pricing, carts, customers, and CMS content.
- **OCC (Omni Commerce Connect)** is SAP Commerce's REST API layer for headless storefronts and other clients.
- **BaseSite** identifies a storefront context and its configuration; this demo uses `electronics-spa`.
- **Headless commerce** separates the presentation application from commerce services.
- **Composable storefront** describes a storefront assembled from replaceable services, configuration, and components.
- **Product** is the sellable catalogue entity rendered by the listing and detail pages.
- **Cart** collects product entries and quantities before checkout; checkout is outside this demo's scope.
- **CMS Page** is the top-level content response.
- **CMS Slot** is a named placement region such as `TopContent` or `Section1`.
- **CMS Component** is typed content data that maps to a storefront component.

The actual mock resource is `public/api/occ/v2/electronics-spa/products.json` so Angular's static development server can return it directly. A real adapter would call an OCC endpoint such as:

```text
GET /occ/v2/electronics-spa/products
GET /occ/v2/electronics-spa/products/{code}
GET /occ/v2/electronics-spa/products/search?query=runner
```

## RxJS Concepts Demonstrated

- `Observable`: product and CMS calls, route parameters, and derived cart state.
- `BehaviorSubject`: current cart entries with an immediately available initial state.
- `map`: response mapping, product selection, search normalization, and cart totals.
- `filter`: removes a missing product code from the route stream.
- `switchMap`: changes a route code or search query into the latest product request.
- `debounceTime`: waits briefly before sending a search request.
- `distinctUntilChanged`: avoids repeating the same normalized search.
- `catchError`: converts failed API-style calls into stable UI error states.
- `shareReplay`: shares cached catalogue data and derived streams with current subscribers.
- `tap`: updates request state without changing emitted product data.

`switchMap` is especially useful for search because it unsubscribes from the previous inner stream when a newer query arrives. A late response therefore cannot overwrite the newest result set.

## CMS Architecture

The CMS boundary follows the same replaceable pattern:

```text
CmsAdapter
    ↓
MockCmsAdapter
```

The home page receives a mock `CmsPage`, iterates through its slots, and renders mapped components by `typeCode`. Real Spartacus projects register CMS component mappings from SAP Commerce; this demo uses a small switch-based renderer to make the idea visible without recreating the full framework.

A later project could provide either implementation without changing the presentation components:

```text
CmsAdapter → BloomreachCmsAdapter
CmsAdapter → SapCommerceCmsAdapter
```

Bloomreach is not integrated in this repository.

## SAP Impex

Impex is SAP Commerce's text-based import/export syntax used to create and update platform data. [`sample-data/products.impex`](sample-data/products.impex) contains illustrative category and product rows only; the Angular application does not import or execute the file.

## Zone.js

Angular has traditionally used Zone.js to observe asynchronous work and trigger change detection. Modern Angular also supports Signals and increasingly supports zoneless patterns. This Angular 19 demo keeps the CLI's Zone.js setup and uses `ChangeDetectionStrategy.OnPush`, async pipe, and a small amount of Signals for UI flags. Understanding Zone.js remains useful when maintaining existing enterprise Angular applications.

## State Management Choice

The catalogue is read through facades and adapters, while the intentionally small cart uses a lightweight RxJS service. NgRx could be introduced when application-wide state, complex effects, normalized entities, or stronger event tracing justify the additional structure; it is not needed for this four-page demo.

## CI/CD

[`azure-pipelines.yml`](azure-pipelines.yml) defines a Bun-based Azure DevOps pipeline for `main`:

1. Install Bun 1.4.0.
2. Restore dependencies from `bun.lock` with `bun install --frozen-lockfile`.
3. Run the TypeScript check.
4. Run ChromeHeadless unit tests once.
5. Build the Angular production bundle.

There is no lint script in this intentionally small scaffold, so the pipeline does not call a nonexistent command.

## Technology Stack

- Angular 19.2 with standalone components and modern template control flow
- TypeScript 5.7
- RxJS 7.8
- SCSS
- Angular Router
- Angular HttpClient
- Reactive Forms
- Jasmine + Karma + ChromeHeadless
- Bun 1.4 package manager and script runner
- Azure DevOps Pipeline

## Run Locally

Prerequisite: [Bun](https://bun.sh/) 1.4 or newer.

```bash
bun install
bun run start
```

Open `http://localhost:4200`.

### Validation Commands

```bash
bun run typecheck
bun run test:ci
bun run build
```

## Tests

The focused test suite verifies that:

1. `ProductFacade` delegates to `ProductConnector`.
2. `CartService` calculates total price from quantity.
3. Adding the same product increments one existing cart entry.
4. `MockOccProductAdapter` filters products without case sensitivity.
5. The storefront shell can be created.

## Five-Minute Demo Path

1. Start on Home and point out that the hero and two architecture blocks came from Page → Slot → Component data.
2. Open Products, type `trail`, and explain the debounced `switchMap` search stream.
3. Open a product to show route-driven loading through Facade → Connector → Adapter.
4. Add two units, open Cart, update the quantity, and show the header count and totals react.
5. Finish in the code by swapping attention between `ProductAdapter`, the DI provider, and `MockOccProductAdapter`.

## Interview Talking Points

### Why Facade / Connector / Adapter?

To decouple UI from backend implementation and make API integration replaceable and testable. Each layer has one narrow responsibility, and pages never import `HttpClient`.

### Why `switchMap`?

To cancel stale inner subscriptions, especially for product search or route-driven requests. This keeps older responses from replacing newer UI state.

### Why async pipe?

To let Angular manage subscriptions automatically and reduce manual subscription cleanup in presentation components.

### Why mock OCC?

This demo focuses on frontend architecture. In a real SAP Commerce project, the adapter would communicate with Commerce OCC endpoints and map their response contracts into storefront models.

### Why not modify Spartacus core?

Composable storefronts should favor extension, component mapping, adapters, and configuration so maintenance and upgrades remain manageable.

### How could Bloomreach fit in?

Implement `BloomreachCmsAdapter` behind the existing `CmsAdapter` interface, bind it through Angular DI, and preserve the current presentation components.
