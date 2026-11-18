# Design Style Guide — Jian He Portfolio

> [!NOTE]
> This style guide documents the existing design system of the **This is Jian He** interactive globe portfolio. It is descriptive, not prescriptive — derived directly from the codebase.

---

## 1. Brand Identity

| Property | Value |
|---|---|
| Site title | *This is Jian He* |
| Description | Work and journey of Jian He, a designer |
| Favicon | `jianhe.svg` (custom SVG) |
| Theme color (meta) | `#000000` |

---

## 2. Color Palette

The palette is minimal and high-contrast, anchored in black and white with one vivid accent for interactive elements.

| Role | Value | Preview |
|---|---|---|
| **Background** | `#000000` (black) | ⬛ |
| **Primary text** | `#FFFFFF` (white) | ⬜ |
| **Accent / Glow dot** | `#EEFF41` (electric yellow-green) | 🟡 |
| **City label background** | `rgba(111, 111, 111, 0.6)` (semi-transparent grey) | — |
| **Globe atmosphere** | `rgba(255, 255, 255, 0.21)` (subtle white haze) | — |
| **Globe background** | `rgba(0, 0, 0, 0)` (transparent, inherits page black) | — |

### Accent Glow Effect
The `#EEFF41` dot uses a layered `box-shadow` to create a neon glow:
```css
box-shadow: 0 0 10px #EEFF41,
            0 0 20px #EEFF41,
            0 0 30px #EEFF41;
```

---

## 3. Typography

Three typefaces are used, each with a distinct role.

### 3.1 Sora — Display & UI
Used for all hero-level and city data text. Loaded via Google Fonts.

| Use | Class / Element | Weight | Size |
|---|---|---|---|
| Hero heading | `.hero-text` | 600 | `clamp(20px, 16vw, 180px)` desktop · `clamp(30px, 20vw, 200px)` mobile |
| City label (map pin) | `.city-label` | 300 | `15px` |
| City name (pin header) | `.city-name` | 600 | `17px` |
| City year | `.city-year` | 400 | `15px` |
| City details title (year) | `.city-details-title` | 600 | `80px` desktop · `clamp(24px, 12vw, 60px)` mobile |
| City details section | `.city-details-section` | inherited | inherited |

### 3.2 DM Sans — Body Copy
Used for secondary descriptive text in city detail panels. Also loaded via Google Fonts (additionally imported in `GlobeComponent.css`).

| Use | Class | Weight | Size | Line Height |
|---|---|---|---|---|
| City subtitle | `.city-details-subtitle` | 400 | `21px` desktop · `clamp(16px, 5vw, 24px)` mobile | — |
| City description | `.city-details-description` | 400 | `16px` desktop · `clamp(12px, 3.5vw, 16px)` mobile | `1.5` desktop · `1.3` mobile |

### 3.3 System Fallback — UI / Code
Applied to `body` as the default base. Only visible for elements that do not explicitly set `font-family`.

```
-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif
```

For `code` elements:
```
source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace
```

### Font Loading
```html
<!-- Google Fonts — index.html -->
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600&family=Plus+Jakarta+Sans:wght@400&display=swap" rel="stylesheet">

<!-- Additionally imported in GlobeComponent.css -->
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');
```

> [!NOTE]
> `Plus Jakarta Sans` (weight 400) is loaded via the HTML `<link>` but not currently referenced in any CSS class. It may be available for future use.

---

## 4. Layout

### 4.1 Desktop (> 768px)
- Full-viewport canvas: `100vw × 100vh`, `overflow: hidden`
- **Left half** (60% width): Hero text section with `80px` left padding
- **Right half** (50% starting from `50vw`): Globe container, scaled up `1.25×`
- City detail panel: absolutely positioned at `left: 80px`, vertically centered (`top: 50%`, `transform: translateY(-50%)`), width `calc(50vw - 80px)`

```
┌───────────────────────────────┬─────────────────────────────┐
│                               │                             │
│  ← Hero Text (60vw)           │   Globe (50vw, scale 1.25×) │
│    or City Details Panel      │                             │
│    (left: 80px, 50vw wide)    │                             │
│                               │                             │
└───────────────────────────────┴─────────────────────────────┘
```

### 4.2 Mobile (≤ 768px)
- Stacked vertically: Globe on top (100vw × 70vh), hero/details below
- Globe: scale resets to `1.0`, `padding-top: 20px`
- Hero section: centered, `padding: 24px`, bottom-aligned with `padding-bottom: 100px`
- City detail panel: absolutely positioned at `bottom: 0`, centered horizontally, `width: 90%`, `padding-bottom: 48px`

```
┌─────────────────┐
│  Globe (100vw,  │
│    70vh)        │
├─────────────────┤
│  Hero Text /    │
│  City Details   │
│  (100%, center) │
└─────────────────┘
```

---

## 5. Components

### 5.1 Glowing Map Pin (`.glowing-dot`)
A neon yellow-green pulsing dot rendered as an HTML element overlaid on globe coordinates.

```css
width: 10px;
height: 10px;
background-color: #EEFF41;
border-radius: 50%;
box-shadow: 0 0 10px #EEFF41, 0 0 20px #EEFF41, 0 0 30px #EEFF41;
```

### 5.2 City Label (`.city-label`)
A frosted-glass pill that appears below each glowing dot.

| Property | Value |
|---|---|
| Size | `120px × 42px` |
| Background | `rgba(111, 111, 111, 0.6)` |
| Border radius | `8px` |
| Margin from dot | `15px` top |
| Font | Sora, 15px, weight 300 |
| Text color | White |
| Alignment | Centered (flex, column) |

### 5.3 Hero Text (`.hero-text`)
Large responsive typographic display — "This is / Jian He" — filling the left side of the viewport.

| Property | Value |
|---|---|
| Font | Sora, weight 600 |
| Size (desktop) | `clamp(20px, 16vw, 180px)` |
| Size (mobile) | `clamp(30px, 20vw, 200px)` |
| Line height | `1` |
| Color | White |
| White space | `pre-wrap` |

### 5.4 City Detail Panel (`.city-details-section`)
Slides into the left column when a map pin is clicked, replacing the hero text.

| Sub-element | Class | Font | Weight | Size |
|---|---|---|---|---|
| Year / Era | `.city-details-title` | Sora | 600 | `80px` |
| Role | `.city-details-subtitle` | DM Sans | 400 | `21px` |
| Body copy | `.city-details-description` | DM Sans | 400 | `16px` |
| Attribution | `.city-details-attribution` | DM Sans | 400 | `16px`, left-aligned |

### 5.5 Interactive 3D Globe
Rendered by `react-globe.gl` using the **Earth topology texture**:
```
//unpkg.com/three-globe/example/img/earth-topology.png
```

| Property | Value |
|---|---|
| Background | Transparent |
| Atmosphere | Enabled, `rgba(255, 255, 255, 0.21)` |
| Auto-rotate speed | `0.2` |
| Controls | Zoom, rotate, pan all enabled |

---

## 6. Motion & Animation

### 6.1 Hero Text Fade-In (`@keyframes fadeIn`)
Words in the hero heading animate in sequentially on load.

```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

| Word | Delay |
|---|---|
| "This" | 0.2s |
| "is" | 0.4s |
| "Jian" | 0.6s |
| "He" | 0.8s |

Each word animates for `0.5s` using `forwards` fill mode.

### 6.2 Hero Text Fade-Out
When a city is selected, the hero section transitions out:

```css
transition: opacity 0.5s ease-out, visibility 0.5s ease-out;
/* Applied via .hero-section.fade-out class */
```

### 6.3 Globe Interaction States
| Interaction | Globe | Hero text |
|---|---|---|
| Idle | Auto-rotating | Visible |
| City pin clicked | Stops rotating | Fades out → City details shown |
| Click on empty area | Resumes rotating | City details hidden → Hero text shown |

---

## 7. Spacing & Sizing

| Token | Value | Usage |
|---|---|---|
| Page left padding (desktop) | `80px` | Hero section, city details left edge |
| City label width | `120px` | Fixed |
| City label height | `42px` | Fixed |
| City label border-radius | `8px` | Pill shape |
| City label margin-top | `15px` | Gap between dot and label |
| City details bottom padding (mobile) | `48px` | Safe area from bottom |
| Hero padding (mobile) | `24px` all, `100px` bottom | — |

---

## 8. Data / Content Structure

Each location point carries:

```js
{
  lat, lng,          // Globe coordinates
  size: 10,          // Pin size (px)
  name,              // Display name on pin label
  city, country,     // Location metadata
  year,              // Era string (e.g. "2021-now", "Just a kid")
  'description-short',  // Role line (e.g. "Designer@Google")
  'description-long',   // Body paragraph
  'description-attribution'  // Optional quote attribution
}
```

**Current locations:** Zurich · Cambridge · Ningbo · Berlin · Singapore

---

## 9. File Map

| File | Purpose |
|---|---|
| [`public/index.html`](file:///Users/jian/Documents/my-site/public/index.html) | Google Fonts link, page title, theme color |
| [`src/index.css`](file:///Users/jian/Documents/my-site/src/index.css) | Body defaults, background black, font smoothing |
| [`src/App.css`](file:///Users/jian/Documents/my-site/src/App.css) | Full-viewport `.App` wrapper |
| [`src/GlobeComponent.css`](file:///Users/jian/Documents/my-site/src/GlobeComponent.css) | All component styles — the primary stylesheet |
| [`src/GlobeComponent.js`](file:///Users/jian/Documents/my-site/src/GlobeComponent.js) | Main layout, state, city data |
| [`src/components/Globe.jsx`](file:///Users/jian/Documents/my-site/src/components/Globe.jsx) | Globe renderer, inline styles for pins |
