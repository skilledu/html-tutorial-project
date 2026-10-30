# 🚀 Skilled.u – Interactive HTML Tutorial Platform

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> A modern, responsive, and feature-rich interactive HTML learning platform designed to teach HTML from core fundamentals to advanced modern web standards. Built as an **Internship Day 1 Project** for **Skilled.u**.

---

## 🌟 Key Features

### 1. 📚 27 Comprehensive Learning Modules
- Step-by-step curriculum starting from HTML Overview, tags, elements, and attributes all the way to modern semantics, embedded media, ASCII, MIME types, URL encoding, and ISO language codes.
- High-yield explanations, common beginner mistakes, best practices, and real-world interview Q&A for every module.

### 2. 🎯 Instant-Feedback Chapter Quizzes & Progression
- **Interactive MCQs** placed right at the end of each learning module.
- **Instant Result Validation**: Immediate color-coded feedback (Green for Correct, Red for Incorrect) with clear educational explanations.
- **Score Calculator**: Real-time score computation with custom praise badges (*🌟 Perfect Score!*, *👏 Great Job!*).
- **Celebration Banner & Next Button**: An animated completion banner appears when all questions are answered, prompting users to advance smoothly to the next chapter with a pulsing navigation button.

### 3. 💻 In-Browser Live Code Sandbox
- Integrated **CodeMirror** editor allowing users to test, edit, and experiment with code snippets on-the-fly.
- One-click **"Try It Yourself"** buttons next to every example that auto-populate the sandbox with boilerplate HTML and render live output instantly in an embedded preview frame.
- **Copy Code** button with automatic feedback for quick clipboard sharing.

### 4. 🎨 Modern UI & Interactive Aesthetics
- **Finisher Header Particle Canvas**: Dynamic animated particle header integrated into the landing page hero section.
- **Compact Chapter Cards**: Sleek corner-accented cards that smoothly scale up title text and transition to vibrant blue gradients on hover.
- **Dark / Light Mode**: Seamless theme switcher that persists user preference in `localStorage`.
- **Dynamic Sidebar**: Search filter with live topic filtering, chapter progress tracking, and green completion checkmarks.

---

## 📂 Project Structure

```plaintext
html-tutorial-project/
├── index.html                 # Landing page with hero banner & compact chapter cards
├── tutorial.html              # Core tutorial reader, code playground & quiz container
├── robots.txt                 # SEO crawler instructions
├── sitemap.xml                # SEO XML sitemap
├── README.md                  # Comprehensive documentation
└── assets/
    ├── css/
    │   └── style.css          # Main stylesheet (design system, dark mode, quizzes, sandbox)
    ├── js/
    │   ├── app.js             # Core app logic (routing, sidebar, quiz engine, sandbox)
    │   ├── chapters.js        # Complete database of 27 HTML chapters
    │   └── finisher-header.es5.min.js # Finisher header canvas animation library
    └── images/
        ├── skilledu-logo.png  # Primary branding logo
        └── skilledu-logo-cropped.png
```

---

## 🛠️ Technology Stack

- **Core Structure**: Semantic HTML5 with accessibility (WCAG) guidelines
- **Styling**: Vanilla CSS3 with custom properties (CSS variables), Flexbox, CSS Grid, and smooth keyframe animations
- **Interactivity**: Pure Vanilla JavaScript (ES6+) with hash-based single page application (SPA) routing
- **Live Code Editor**: [CodeMirror](https://codemirror.net/) with VS Code Dark syntax theme
- **Code Formatter**: [JS-Beautify](https://github.com/beautify-web/js-beautify)
- **Syntax Highlighting**: [Highlight.js](https://highlightjs.org/)
- **Icons**: [FontAwesome 6 Free](https://fontawesome.com/)
- **Particle Animation**: [Finisher Header](https://www.finisher.co/lab/header/)

---

## 🚀 Getting Started

### Prerequisites
You only need a modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari).

### Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/skilledu/html-tutorial-project.git
   cd html-tutorial-project
   ```

2. **Open directly in your browser:**
   - Double-click `index.html` to launch the landing page, or
   - Start a local development server for live reloading:
     ```bash
     # Using Python
     python -m http.server 8000

     # Using Node.js (npx)
     npx serve .
     ```

3. **Navigate to:**
   ```
   http://localhost:8000
   ```

---

## 📖 Curriculum Breakdown

| # | Chapter Title | Core Topics Covered |
|---|---|---|
| **01** | HTML – Overview | DOCTYPE, root tags, head vs body, web standards |
| **02** | HTML – Basic Tags | Headings `<h1>`-`<h6>`, `<p>`, `<br>`, `<hr>`, `<pre>` |
| **03** | HTML – Elements | Block vs inline, void elements, element nesting rules |
| **04** | HTML – Head | `<title>`, `<meta>`, external `<link>`, viewport |
| **05** | HTML – Attributes | `href`, `src`, `alt`, `id`, `class`, element attributes |
| **06** | HTML – Formatting | `<strong>`, `<em>`, `<b>`, `<i>`, `<sub>`, `<sup>`, `<del>` |
| **07** | HTML – Phrase Tags | `<code>`, `<kbd>`, `<samp>`, `<abbr>`, `<cite>` |
| **08** | HTML – Comments | Syntax `<!-- -->`, multi-line, browser handling |
| **09** | HTML – Meta Tags | Charset UTF-8, robots, SEO description, author |
| **10** | HTML – Lists | `<ol>`, `<ul>`, `<li>`, `<dl>`, `<dt>`, `<dd>` |
| **11** | HTML – Tables | `<table>`, `<tr>`, `<td>`, `<th>`, `colspan`, `rowspan` |
| **12** | HTML – Images | `<img>`, `src`, `alt`, dimensioning, preventing CLS |
| **13** | HTML – Links | `<a>`, `href`, `target="_blank"`, internal bookmarks, `mailto:` |
| **14** | HTML – Blocks | `<div>`, `<span>`, `<blockquote>`, display properties |
| **15** | HTML – Colors | Hex, RGB, RGBA, HSL, alpha channel transparency |
| **16** | HTML – Fonts | Deprecated `<font>` vs modern CSS `font-family`, typography |
| **17** | HTML – Forms | `<form>`, `<input>`, GET vs POST, `<label for>` |
| **18** | HTML – Embed Multimedia | `<video>`, `<source>`, `<iframe>`, controls |
| **19** | HTML – Media | `<audio>`, `autoplay`, `loop`, `muted` policies |
| **20** | HTML – Marquees | Deprecated `<marquee>` vs modern CSS `@keyframes` |
| **21** | HTML – Semantics | `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>` |
| **22** | HTML – Deprecated Tags | Phased-out tags (`<center>`, `<strike>`, `<applet>`) & modern fixes |
| **23** | HTML – Tag Reference | Case-sensitivity, `<button>`, `<details>`, `<summary>` |
| **24** | ASCII Table Lookup | 7-bit ASCII structure, decimal indexes, space character, UTF-8 |
| **25** | MIME Media Types | `Content-Type`, `text/html`, `image/png`, `application/json` |
| **26** | HTML – URL Encoding | Percent-encoding (`%20`, `%26`), `encodeURIComponent` |
| **27** | Language ISO Codes | `<html lang="...">`, ISO 639-1 (`en`, `hi`), accessibility |

---

## 💡 Internship Task Details

- **Company / Platform**: [Skilled.u](https://skilledu.com)
- **Role**: Frontend Developer Intern
- **Assignment**: Day 1 Task – Interactive HTML Tutorial Platform & Course Database
- **Deliverables**:
  1. Clean directory structure without redundant nesting
  2. Compact Uiverse-inspired cards with smooth scaling transitions and theme colors
  3. Animated Finisher Header on the main hero section
  4. Interactive instant-result MCQ Quizzes under every module with smooth forward progression
  5. Live Code Sandbox with error-free execution and theme persistence

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).