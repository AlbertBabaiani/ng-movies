# NG Movies | Premium Entertainment Web App

<div align="center">

  <img src="https://img.shields.io/badge/Angular_20-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" alt="Sass" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
  <img src="https://img.shields.io/badge/Responsive-Mobile_First-05A328?style=for-the-badge" alt="Responsive" />

  <br />
  <br />

  <a href="https://movies-ng.vercel.app">
    <img src="https://img.shields.io/badge/View_Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="View Live Demo" />
  </a>
  
  <a href="https://github.com/AlbertBabaiani/ng-movies.git">
    <img src="https://img.shields.io/badge/GitHub_Repository-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repo" />
  </a>

  <a href="https://www.figma.com/design/QUmtq9p2AePwwK746NEM8s/entertainment-web-app?node-id=0-1&p=f&t=YdhxFCBjTbn61Gxh-0">
    <img src="https://img.shields.io/badge/Figma_Design_File-000000?style=for-the-badge&logo=figma&logoColor=white" alt="Figma Design" />
  </a>

</div>

---

## About The Project

**NG Movies** is a sleek, fully responsive entertainment web application that allows users to discover, browse, and bookmark their favorite movies and TV series. Built with a strict mobile-first philosophy, it delivers a cinematic, app-like experience directly in the browser.

Beyond standard media browsing, the application features a robust authentication flow and a frictionless **Guest Mode**. Users can freely explore the content library without creating an account, but are intelligently prompted to sign in when attempting to save bookmarks. Once authenticated, users can seamlessly manage their curated lists via real-time cloud database syncing.

### Key Technical Concepts

This project is engineered using cutting-edge Angular architectures and cloud services, showcasing best practices in performance, security, and UI/UX design:

- **Modern Angular 20 Reactivity:** Completely drops RxJS observables in the UI layer in favor of Angular **Signals** (`signal`, `computed`). This provides granular, boilerplate-free state management and instantaneous DOM updates for form validation and media filtering.
- **Advanced Routing & Security:** Implements modern Functional Route Guards (`canMatch`).
  - _Unauth Guard:_ Intelligently redirects already-logged-in users away from authentication pages.
  - _Auth Guard:_ Protects private routes (like `/bookmarked`) while safely lazily-loading public routes to drastically reduce initial bundle sizes.
- **Frictionless Guest Experience:** Users can browse the entire media catalog as guests. The application gracefully intercepts protected actions (like clicking a bookmark icon) and dynamically routes them to the authentication flow without breaking the application state.
- **Firebase Auth & Atomic Cloud Operations:** Integrates Firebase for secure user authentication. Bookmarking utilizes Firestore's server-side atomic transforms (`arrayUnion`, `arrayRemove`) to guarantee data integrity and completely eliminate client-side race conditions.
- **Bulletproof Form UX:** Authentication forms feature custom SCSS implementations that override aggressive browser autofill stylesheets (`:-webkit-autofill`), maintaining the application's dark-mode aesthetic even when browsers attempt to inject default colors.
- **Custom Global UI Elements:** Features a bespoke, math-driven CSS "Film Reel" loading spinner using polar coordinates, and a root-level dynamic Snackbar notification system to handle Firebase error surfacing globally.

---

## Visual Showcase

> **Note:** Insert your screenshots here once deployed.

<div align="center"> 
  <h3>Desktop Experience</h3>
  <img src="src/assets/previews/desktop-preview.png" alt="Desktop Interface showing the media grid and sidebar" width="800" style="border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.5);"/>
</div>

<br/>

<div align="center" style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap;">
  <div>
    <h3>Tablet View</h3>
    <img src="src/assets/previews/tablet-preview.png" alt="Tablet Interface showing top navigation" width="450" style="border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.5);"/>
  </div>
  <div>
    <h3>Mobile View & Nav</h3>
    <img src="src/assets/previews/mobile-preview.png" alt="Mobile Interface showing responsive grid" height="550" style="border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.5);"/>
  </div>
</div>

---

## Built With

- **Angular 20** - Utilizing strictly Standalone Components, Signals, Functional Guards, and the modern Control Flow syntax (`@if`, `@for`).
- **Firebase / Firestore** - Handling secure User Authentication and real-time NoSQL database syncing for user bookmarks.
- **TypeScript** - Ensuring type-safe data models across the application.
- **SCSS / SASS** - Leveraging the modern `@use` module system (eliminating legacy `@import` duplication), custom mixins, and CSS Custom Properties for a scalable dark theme.
- **CSS Grid & Flexbox** - Creating a fluid layout that dynamically shifts the navigation from a bottom-bar on mobile to a sticky side-panel on 1440px desktop screens.
