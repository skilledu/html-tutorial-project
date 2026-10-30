// Skilled.u HTML Tutorial App JavaScript

// Check if chapters.js loaded properly
if (typeof HTML_TUTORIAL_DATA === 'undefined') {
  console.error('HTML_TUTORIAL_DATA not found. Make sure chapters.js is loaded.');
  document.body.innerHTML = '<div style="padding: 50px; text-align: center;"><h1>Error Loading Tutorial</h1><p>Failed to load tutorial data. Please refresh the page.</p></div>';
}

// Theme Management
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
}

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
}

// Global Variables
let currentChapterKey = 'ch1';
const chaptersKeys = typeof HTML_TUTORIAL_DATA !== 'undefined' ? Object.keys(HTML_TUTORIAL_DATA) : [];

const completedChaptersList = [];

// Progress Tracking
function getCompletedChapters() {
  return completedChaptersList;
}

// Elements
const sidebarMenu = document.getElementById('sidebarMenu');
const chapterContainer = document.getElementById('chapterContainer');
const contentArea = document.getElementById('contentArea');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const burgerMenu = document.getElementById('sidebarToggle');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Initialize Sidebar Menu
function renderSidebar() {
  sidebarMenu.innerHTML = '';
  
  let progressContainer = document.getElementById('sidebarProgressContainer');
  if (!progressContainer) {
    progressContainer = document.createElement('div');
    progressContainer.id = 'sidebarProgressContainer';
    progressContainer.className = 'sidebar-progress-container';
    const searchBox = document.querySelector('.sidebar-search-box');
    if (searchBox && searchBox.parentNode) {
      searchBox.parentNode.insertBefore(progressContainer, searchBox.nextSibling);
    }
  }
  
  const completed = getCompletedChapters();
  const total = chaptersKeys.length;
  const currentIndex = chaptersKeys.indexOf(currentChapterKey) + 1;
  const percent = total === 0 ? 0 : Math.round((currentIndex / total) * 100);
  
  progressContainer.innerHTML = `
    <div class="progress-text">Chapter ${currentIndex} of ${total}</div>
    <div class="progress-track">
      <div class="progress-fill" style="width: ${percent}%"></div>
    </div>
  `;

  chaptersKeys.forEach((key, index) => {
    const item = HTML_TUTORIAL_DATA[key];
    const li = document.createElement('li');
    li.className = 'sidebar-item';
    li.id = `nav-${key}`;
    
    const a = document.createElement('a');
    a.href = `#${key}`;
    
    const isCompleted = completed.includes(key);
    const checkIcon = isCompleted ? '<i class="fa-solid fa-circle-check" style="color: #10b981; margin-left: auto; font-size: 1.1em;"></i>' : '';
    
    a.innerHTML = `<span style="font-weight: 600; margin-right: 8px; color: var(--primary-color);">${index + 1}.</span> <span>${item.title}</span> ${checkIcon}`;
    a.style.alignItems = "center";
    
    li.appendChild(a);
    sidebarMenu.appendChild(li);
  });
}

// Load Active Chapter
function loadChapter(key) {
  if (!HTML_TUTORIAL_DATA[key]) {
    key = 'ch1';
  }
  
  // Auto-mark previous chapter as completed when navigating away
  if (currentChapterKey && currentChapterKey !== key) {
    let completed = getCompletedChapters();
    if (!completed.includes(currentChapterKey)) {
      completed.push(currentChapterKey);
      renderSidebar();
      if (document.getElementById('sidebarSearch') && document.getElementById('sidebarSearch').value) {
        filterSidebar();
      }
    }
  }
  
  currentChapterKey = key;

  const chapter = HTML_TUTORIAL_DATA[key];
  
  // Highlight Sidebar active item
  document.querySelectorAll('.sidebar-item').forEach(el => el.classList.remove('active'));
  const activeNavItem = document.getElementById(`nav-${key}`);
  if (activeNavItem) {
    activeNavItem.classList.add('active');
    // Scroll active item into view inside sidebar if not visible
    activeNavItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
  
  // Build and render HTML
  const indexNumber = chaptersKeys.indexOf(key) + 1;
  chapterContainer.innerHTML = `
    <div class="chapter-header-box">
      <div class="chapter-tag">Chapter ${indexNumber} of ${chaptersKeys.length}</div>
      <h1 class="main-chapter-title">${chapter.title}</h1>
    </div>
    <div class="chapter-body">
      ${chapter.content}
    </div>
  `;

  // Update Breadcrumb text and JSON-LD Schema
  const breadcrumbCurrent = document.getElementById('breadcrumbCurrentChapter');
  if (breadcrumbCurrent) {
    breadcrumbCurrent.textContent = chapter.title;
  }
  
  const breadcrumbSchema = document.getElementById('breadcrumbSchema');
  if (breadcrumbSchema) {
    try {
      const schema = JSON.parse(breadcrumbSchema.textContent);
      if (schema.itemListElement && schema.itemListElement[2]) {
        schema.itemListElement[2].name = chapter.title;
        schema.itemListElement[2].item = "https://example.com/tutorial.html#" + key;
        breadcrumbSchema.textContent = JSON.stringify(schema, null, 2);
      }
    } catch (e) {
      console.error("Failed to update breadcrumb schema", e);
    }
  }

  // Format code blocks using js-beautify if available
  if (typeof html_beautify !== 'undefined') {
    const codeBlocks = chapterContainer.querySelectorAll('.code-preview code');
    const rawHolders = chapterContainer.querySelectorAll('.raw-code-holder');
    
    codeBlocks.forEach((block, idx) => {
      try {
        const rawHTML = block.textContent;
        const formattedHTML = html_beautify(rawHTML, { 
          indent_size: 4, 
          preserve_newlines: true,
          max_preserve_newlines: 1,
          indent_inner_html: true
        });
        block.textContent = formattedHTML;
        
        // Apply syntax highlighting
        if (typeof hljs !== 'undefined') {
          // remove existing classes hljs might have added
          block.className = 'language-html';
          delete block.dataset.highlighted;
          hljs.highlightElement(block);
        }
        
        if (rawHolders[idx]) {
           rawHolders[idx].value = formattedHTML;
        }
      } catch(err) {
        console.error("Error highlighting block", err);
      }
    });
  }
  
  // Update Prev/Next button states
  const chIndex = chaptersKeys.indexOf(key);
  
  if (chIndex === 0) {
    prevBtn.style.visibility = 'hidden';
  } else {
    prevBtn.style.visibility = 'visible';
  }
  
  if (chIndex === chaptersKeys.length - 1) {
    nextBtn.style.visibility = 'hidden';
  } else {
    nextBtn.style.visibility = 'visible';
  }
  
  // Reset content area scroll position to top
  contentArea.scrollTop = 0;
  
  // Close mobile sidebar if open
  closeMobileSidebar();
}

// Navigation prev/next triggers
function navigateChapter(direction) {
  const currentIndex = chaptersKeys.indexOf(currentChapterKey);
  const nextIndex = currentIndex + direction;
  
  if (nextIndex >= 0 && nextIndex < chaptersKeys.length) {
    window.location.hash = chaptersKeys[nextIndex];
  }
}

// Hash Routing Handler
function handleRouting() {
  const hash = window.location.hash.substring(1);
  if (hash && HTML_TUTORIAL_DATA[hash]) {
    loadChapter(hash);
  } else {
    // Default to Chapter 1
    window.location.hash = 'ch1';
  }
}

// Sidebar Search Filter
function filterSidebar() {
  const query = document.getElementById('sidebarSearch').value.toLowerCase();
  const items = document.querySelectorAll('.sidebar-item');
  const clearBtn = document.getElementById('clearSearchBtn');
  
  if (clearBtn) {
    clearBtn.style.display = query.length > 0 ? 'block' : 'none';
  }
  
  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    if (text.includes(query)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

function clearSearch() {
  const searchInput = document.getElementById('sidebarSearch');
  if (searchInput) {
    searchInput.value = '';
    filterSidebar();
    searchInput.focus();
  }
}

// Mobile Navigation Toggles
function setupMobileNav() {
  if (burgerMenu) {
    burgerMenu.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      sidebarOverlay.classList.toggle('active');
    });
  }
  
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeMobileSidebar);
  }
}

function closeMobileSidebar() {
  if (sidebar) sidebar.classList.remove('open');
  if (sidebarOverlay) sidebarOverlay.classList.remove('active');
}

// Helper: Decode HTML entities (e.g. &lt; -> <)
function decodeHTMLEntities(encodedStr) {
  const temp = document.createElement('textarea');
  temp.innerHTML = encodedStr;
  return temp.value;
}

// Playground Actions
let playgroundEditor = null;

function initCodeMirror() {
  if (!playgroundEditor && typeof CodeMirror !== 'undefined') {
    const textarea = document.getElementById('playgroundTextarea');
    playgroundEditor = CodeMirror.fromTextArea(textarea, {
      mode: { name: "xml", htmlMode: true },
      theme: "vscode-dark",
      lineNumbers: true,
      autoCloseTags: true,
      matchBrackets: true,
      indentUnit: 4
    });
    
    // Sync textarea with CodeMirror on change, but also wait for manual "Run" if we prefer,
    // or we can just let runPlaygroundCode get the value from CodeMirror.
  }
}

let currentPlaygroundOriginalCode = '';

function tryCode(btn) {
  const container = btn.closest('.code-block-container');
  const rawCodeHolder = container.querySelector('.raw-code-holder');
  if (rawCodeHolder) {
    let codeToLoad = rawCodeHolder.value;
    
    // Auto-wrap in HTML boilerplate if missing
    if (!codeToLoad.toLowerCase().includes('<!doctype html>')) {
      codeToLoad = `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Skilled.u Sandbox</title>\n</head>\n<body>\n\n${codeToLoad}\n\n</body>\n</html>`;
      // Optionally format if js_beautify is loaded
      if (typeof html_beautify === 'function') {
        codeToLoad = html_beautify(codeToLoad, { indent_size: 2 });
      }
    }

    currentPlaygroundOriginalCode = codeToLoad;
    const modal = document.getElementById('playgroundModal');
    modal.style.display = 'flex';

    initCodeMirror();
    
    if (playgroundEditor) {
      playgroundEditor.setValue(codeToLoad);
      setTimeout(() => playgroundEditor.refresh(), 100);
    } else {
      const textarea = document.getElementById('playgroundTextarea');
      textarea.value = codeToLoad;
    }

    runPlaygroundCode();
  }
}

function validateHTML(code) {
  const errors = [];
  
  if (!code.toLowerCase().includes('<!doctype html>')) {
    errors.push("Missing <code>&lt;!DOCTYPE html&gt;</code> declaration. While browsers try to render without it, it is recommended to include it.");
  }
  
  // Remove comments for easier tag matching
  const codeWithoutComments = code.replace(/<!--[\s\S]*?-->/g, '');
  
  const voidElements = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr', '!doctype'];
  const tagRegex = /<\/?([a-zA-Z0-9!]+)[^>]*>/g;
  const stack = [];
  let match;
  
  while ((match = tagRegex.exec(codeWithoutComments)) !== null) {
    const fullTag = match[0];
    const isClosing = fullTag.startsWith('</');
    const isSelfClosing = fullTag.endsWith('/>');
    const tagName = match[1].toLowerCase();
    
    // Ignore void and self-closing elements
    if (voidElements.includes(tagName) || isSelfClosing) continue;
    
    if (!isClosing) {
      stack.push(tagName);
    } else {
      if (stack.length === 0) {
        errors.push(`Found closing tag <code>&lt;/${tagName}&gt;</code> but no matching opening tag.`);
      } else {
        const top = stack[stack.length - 1];
        if (top === tagName) {
          stack.pop(); // Matches, pop it
        } else {
          errors.push(`Mismatched closing tag. Expected <code>&lt;/${top}&gt;</code>, but found <code>&lt;/${tagName}&gt;</code>.`);
          stack.pop(); // Pop anyway to try and recover
        }
      }
    }
  }
  
  while(stack.length > 0) {
    const unclosed = stack.pop();
    errors.push(`Unclosed tag <code>&lt;${unclosed}&gt;</code>. You forgot to add <code>&lt;/${unclosed}&gt;</code>.`);
  }
  
  return errors;
}

function runPlaygroundCode() {
  let code = '';
  if (playgroundEditor) {
    code = playgroundEditor.getValue();
  } else {
    code = document.getElementById('playgroundTextarea').value;
  }
  
  const errorContainer = document.getElementById('playgroundError');
  let hasBlockingError = false;
  if (errorContainer) {
    const errors = validateHTML(code);
    if (errors.length > 0) {
      hasBlockingError = true;
      errorContainer.style.display = 'block';
      let errorHtml = '<strong><i class="fa-solid fa-circle-exclamation"></i> HTML Validator found issues:</strong><ul>';
      errors.forEach(err => {
        errorHtml += `<li>${err}</li>`;
      });
      errorHtml += '</ul>';
      errorContainer.innerHTML = errorHtml;
    } else {
      errorContainer.style.display = 'none';
      errorContainer.innerHTML = '';
    }
  }
  
  const oldIframe = document.getElementById('playgroundPreviewFrame');
  
  // Create a fresh iframe to avoid CORS issues if previous code navigated away
  const newIframe = document.createElement('iframe');
  newIframe.className = 'preview-iframe';
  newIframe.id = 'playgroundPreviewFrame';
  
  // Replace the old iframe with the new one
  oldIframe.parentNode.replaceChild(newIframe, oldIframe);
  
  // Write the new code
  const doc = newIframe.contentDocument || newIframe.contentWindow.document;
  doc.open();
  
  if (hasBlockingError) {
    doc.write('<div style="color: #b91c1c; font-family: sans-serif; text-align: center; padding: 2rem; background: #fee2e2; height: 100vh; box-sizing: border-box;"><h3>Preview Blocked</h3><p>Please fix the HTML errors above before rendering.</p></div>');
  } else {
    doc.write(code);
  }
  
  doc.close();
}

function closePlayground() {
  document.getElementById('playgroundModal').style.display = 'none';
}

function resetPlaygroundCode() {
  if (playgroundEditor) {
    playgroundEditor.setValue(currentPlaygroundOriginalCode);
  } else {
    document.getElementById('playgroundTextarea').value = currentPlaygroundOriginalCode;
  }
  runPlaygroundCode();
}

function previewColor(name, hex) {
  const modal = document.getElementById('playgroundModal');
  modal.style.display = 'flex';

  initCodeMirror();
  
  const codeHTML = `<!DOCTYPE html>
<html>
<head>
<title>${name} Color Demo</title>
</head>
<body style="margin:0;">
<div style="background-color:${hex}; width:100%; height:100vh;"></div>
</body>
</html>`;

  if (playgroundEditor) {
    playgroundEditor.setValue(codeHTML);
    setTimeout(() => playgroundEditor.refresh(), 100);
  } else {
    const textarea = document.getElementById('playgroundTextarea');
    textarea.value = codeHTML;
  }

  runPlaygroundCode();
}

function copyCode(btn) {
  const container = btn.closest('.code-block-container');
  const rawCodeHolder = container.querySelector('.raw-code-holder');
  if (rawCodeHolder) {
    // No need to decode manually, rawCodeHolder.value already gives real HTML
    const decodedCode = rawCodeHolder.value;
    navigator.clipboard.writeText(decodedCode).then(() => {
      const originalText = btn.textContent;
      btn.textContent = 'Copied!';
      btn.style.backgroundColor = '#fbbf24';
      btn.style.color = '#161439';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.backgroundColor = '';
        btn.style.color = '';
      }, 2000);
    }).catch(err => {
      // Fallback for older browsers
      const el = document.createElement('textarea');
      el.value = decodedCode;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      const originalText = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(() => { btn.textContent = originalText; }, 2000);
    });
  }
}

// Initialization
window.addEventListener('DOMContentLoaded', () => {
  renderSidebar();
  setupMobileNav();
  handleRouting();
  
  // Listen for hash navigation changes
  window.addEventListener('hashchange', handleRouting);
});
