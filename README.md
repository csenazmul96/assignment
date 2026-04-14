# Assignment — React

A React 19 + Vite application featuring a dynamic form builder, form preview, and a todo list with filtering and pagination.

## Requirements

| Tool    | Version         |
| ------- | --------------- |
| Node.js | `>= 20.19.0` (tested on **v22.19.0**) |
| npm     | `>= 10.0.0` (tested on **v11.11.0**) |

> Vite 8 requires Node.js 20.19+ or 22.12+. Using an older version will fail on install/build.

Check your versions:

```bash
node -v
npm -v
```

## Tech Stack

- **React** 19
- **Vite** 8
- **React Router** 7
- **TanStack Query** 5
- **ESLint** 9

## Installation

Clone the repo and install dependencies:

```bash
git clone <repo-url>
cd assignment
npm install
```

## Running the project

### Development server

```bash
npm run dev
```

Vite will start the dev server (default: http://localhost:5173) with hot module replacement.

### Production build

```bash
npm run build
```

Outputs the optimized bundle to `dist/`.

### Preview the production build

```bash
npm run preview
```

Serves the contents of `dist/` locally to verify the build.

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
  App.jsx              ← root component / routes
  main.jsx             ← entry point
  assets/styles/       ← shared CSS modules
  components/
    form/              ← form builder components
    todos/             ← todo list components
  hooks/               ← custom hooks (e.g. todoStorage)
  pages/               ← route pages (FormBuilder, FormPreview, TodoList)
```

## Scripts

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start Vite dev server with HMR       |
| `npm run build`   | Build for production                 |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint across the project        |
