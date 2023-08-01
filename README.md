# Collapsible Layout

The Collapsible Layout app creates a container that can be expanded or closed by pressing a button, limiting the content size for better fitting.

![Collapsible Layout](https://i.imgur.com/HFv1WWq.gif)

## Configuration

1. Create a new branch and change the `vendor` in the `manifest.json` to match the account it's going to be installed. The branch should have the same name as the vendor.

2. Import the Collapsible Layout app to your theme's dependencies in the `manifest.json`, for the one for example:

```json
  "dependencies": {
    "{{vendor}}.collapsible-layout": "0.x"
  }
```

3. Declare the app's `collapsible-layout` in a given theme template or inside another block from the theme.

```json
  "collapsible-layout": {
    "props": {
      "initialVisibility": false,
      "minHeight": "100px",
      "showMoreText": "Show More",
      "showLessText": "Show Less"
    },
    "children": ["rich-text"]
  },
  "rich-text": {
    "props": {
      "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sed sodales tellus. Nulla cursus nulla..."
    }
  }
```

### `collapsible-layout` props

|    Prop name    |    Type    |                                   Description                                          | Default value |
| --------------- | ---------- | ---------------------------------------------------------------------------------------| ------------- |
| `initiallyOpen` | `Boolean`  | Whether the container will start expanded or closed.                                   |    `false`    |
| `minHeight`     | `String`   | Maximum height in pixels                                                               |    `100px`    |
| `showMoreText`  | `String`   | Show more button text                                                                  |  `Show more`  |
| `showLessText`  | `String`   | Show less button text                                                                  |  `Show less`  |
| `children`      | `Blocks`   | ![Mandatory](https://img.shields.io/badge/-Mandatory-red.png) The collapsible content. |  `undefined`   |

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles          |
| -------------------- |
| `wrapper`,           |
| `content`,           |
| `content--opened`,   |
| `content--closed`,   |
| `container`,         |
| `container--opened`, |
| `container--closed`, |
| `showMore`,          |
| `showMore--opened`,  |
| `showMore--closed`,  |
