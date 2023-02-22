# Innowise Lab Internship: Level 2: Mini-paint

### [Task](https://drive.google.com/file/d/19cb4whI_HUVPzuaPyaj5r6hGotIVnhho/view)

### How to run the app

1. Development mode

- `npm ci`
- `npm start`

2. Production mode

- `npm ci`
- `npm run build`
- `npx serve -s build`

### Database snapshot

![firestore db snapshot](https://res.cloudinary.com/blvck40deg/image/upload/v1672086548/DEV/firestore_snapshot2.png)

### Tech stack

- TypeScript
- React
- Redux Toolkit
- Firebase
- Chakra UI
- react-colorful
- use-eyedropper

### Folder structure

- **/.husky** : git hooks
- **/public** : static HTML
- **/src** : entry point for the main logic
  - **/chakra** : Chakra UI config files
  - **/components** : reusable React components
    - **/auth** : authentication-related components
    - **/generic** : components that do not fit into any specific category, e.g. universal
    - **/home** : home page components
    - **/paint** : paint page components
      - **/canvas** : canvas area components
      - **/toolbar** : sidebar components
  - **/hooks** : custom utility hooks
    - **/canvas** : canvas-related hooks
    - **/http** : hooks for requests
    - **/redux** : state management hooks
  - **/keyboard** : entities for hotkey management
  - **/pages** : main components that are rendered on specific routes
  - **/paint** : canvas painting entities
    - **/control** : controlling entities, namely for canvas layers and history
    - **/tools** : tools to draw with on canvas
  - **/routes** : separate route lists for authorized and unauthorized users
  - **/server** : abstractions to communicate with Firebase
    - **/auth** : auth-related entities
    - **/images** : images-related entities
  - **/store** : redux state management logic
    - **/selectors** : useSelector shortcuts
    - **/slices** : rtk slices
      - **/\*** :
        - **/actions** : async action creators
  - **/types** : type definitions and interfaces
  - **/utils** : utility functions

### Useful hotkeys for drawing

- Z – Undo
- Y – Redo
- H – Flip horizontally
- V – Flip vertically
- - – Zoom in
- \- – Zoom out
- 9 – Rotate left
- 0 – Rotate right
- CTRL+Drag – Move canvas
