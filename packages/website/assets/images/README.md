# Hero Background Image

## Required File

Place the hero background image here as:
- **Filename**: `vendor-risk-network.png`
- **Location**: `packages/website/assets/images/vendor-risk-network.png`

## Image Requirements

1. **Transparent background** (no black fill)
2. **Size**: > 2000px on longest side (to avoid blur on large screens)
3. **Format**: PNG with transparency

## Usage

The image is used as a CSS mask in the hero section, allowing it to be recolored based on the theme (light/dark mode).

The image path is referenced in `index.html` CSS:
```css
mask: url('./assets/images/vendor-risk-network.png') center / contain no-repeat;
```
