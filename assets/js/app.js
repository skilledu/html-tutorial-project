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

// ==========================================================================
// Chapter Interactive Quizzes Dataset & Engine (All 27 Modules)
// ==========================================================================
const CHAPTER_QUIZZES = {
  "ch1": [
    {
      "q": "1. What does HTML stand for?",
      "options": [
        "HyperText Markup Language",
        "HighText Machine Language",
        "Hyperlink and Text Markup Language",
        "Home Tool Markup Language"
      ],
      "answer": 0,
      "exp": "HTML stands for HyperText Markup Language."
    },
    {
      "q": "2. Which tag serves as the root container of an HTML page?",
      "options": [
        "<body>",
        "<html>",
        "<head>",
        "<!DOCTYPE>"
      ],
      "answer": 1,
      "exp": "The <html> tag wraps all page elements."
    },
    {
      "q": "3. What is the primary purpose of the <!DOCTYPE html> declaration?",
      "options": [
        "It defines a primary heading on the page",
        "It links an external stylesheet",
        "It instructs web browsers to render in standard HTML5 mode",
        "It is an optional comment"
      ],
      "answer": 2,
      "exp": "<!DOCTYPE html> ensures standard compliant HTML5 rendering."
    },
    {
      "q": "4. Where is non-visible metadata like <title> and <meta> placed?",
      "options": [
        "Inside <body>",
        "Inside <head>",
        "Inside <footer>",
        "Outside <html>"
      ],
      "answer": 1,
      "exp": "The <head> section contains document metadata."
    }
  ],
  "ch2": [
    {
      "q": "1. Which heading tag creates the highest level and largest heading by default?",
      "options": [
        "<h6>",
        "<h3>",
        "<h1>",
        "<header>"
      ],
      "answer": 2,
      "exp": "<h1> represents the highest level heading in HTML."
    },
    {
      "q": "2. Which tag inserts a single line break without starting a new paragraph?",
      "options": [
        "<br>",
        "<p>",
        "<break>",
        "<hr>"
      ],
      "answer": 0,
      "exp": "<br> produces a line break in text."
    },
    {
      "q": "3. What tag is used for a thematic break or horizontal rule?",
      "options": [
        "<divider>",
        "<hr>",
        "<line>",
        "<rule>"
      ],
      "answer": 1,
      "exp": "<hr> represents a thematic break between paragraphs."
    },
    {
      "q": "4. Which tag preserves both spaces and line breaks exactly as typed?",
      "options": [
        "<p>",
        "<code>",
        "<pre>",
        "<format>"
      ],
      "answer": 2,
      "exp": "The <pre> tag renders text in monospace and preserves formatting."
    }
  ],
  "ch3": [
    {
      "q": "1. What constitutes a standard HTML element?",
      "options": [
        "Only the opening tag",
        "Start tag, content, and closing tag combined",
        "Only the text inside angle brackets",
        "A CSS style rule"
      ],
      "answer": 1,
      "exp": "An HTML element consists of the start tag, content, and end tag."
    },
    {
      "q": "2. Which of the following is a void (empty) element?",
      "options": [
        "<p>",
        "<div>",
        "<img>",
        "<span>"
      ],
      "answer": 2,
      "exp": "<img> is a void element that cannot have children or a closing tag."
    },
    {
      "q": "3. Which of the following is typically a block-level element?",
      "options": [
        "<span>",
        "<a>",
        "<div>",
        "<strong>"
      ],
      "answer": 2,
      "exp": "<div> starts on a new line and spans the full available width."
    },
    {
      "q": "4. Is it valid to nest a block-level <div> inside an inline <span>?",
      "options": [
        "Yes, always allowed",
        "No, it violates HTML nesting rules",
        "Only in dark mode",
        "Only if CSS display is set"
      ],
      "answer": 1,
      "exp": "Block-level elements cannot be nested inside inline elements."
    }
  ],
  "ch4": [
    {
      "q": "1. Which tag inside <head> defines the title displayed in the browser tab?",
      "options": [
        "<header>",
        "<title>",
        "<meta>",
        "<name>"
      ],
      "answer": 1,
      "exp": "The <title> element specifies the title of the document."
    },
    {
      "q": "2. What is the primary role of <meta name=\"viewport\">?",
      "options": [
        "Controls viewport dimensions and scaling for mobile responsiveness",
        "Changes background color",
        "Imports web fonts",
        "Sets website favicon"
      ],
      "answer": 0,
      "exp": "The viewport meta tag ensures responsive design on mobile devices."
    },
    {
      "q": "3. Which tag connects an external stylesheet into an HTML page?",
      "options": [
        "<style>",
        "<link rel=\"stylesheet\">",
        "<css>",
        "<script>"
      ],
      "answer": 1,
      "exp": "<link rel=\"stylesheet\"> links external CSS files."
    },
    {
      "q": "4. How many <title> elements should exist in an HTML document?",
      "options": [
        "As many as needed",
        "Exactly 1",
        "Up to 5",
        "None"
      ],
      "answer": 1,
      "exp": "Every HTML document must contain exactly one <title> element."
    }
  ],
  "ch5": [
    {
      "q": "1. Where are HTML attributes always specified?",
      "options": [
        "In the start/opening tag",
        "In the closing tag",
        "In CSS only",
        "Inside <footer>"
      ],
      "answer": 0,
      "exp": "Attributes are always defined in the opening tag of an element."
    },
    {
      "q": "2. Which attribute provides alternative text if an image fails to load?",
      "options": [
        "title",
        "src",
        "alt",
        "name"
      ],
      "answer": 2,
      "exp": "The 'alt' attribute provides alternative text for accessibility."
    },
    {
      "q": "3. Which attribute specifies the destination URL of an anchor link?",
      "options": [
        "link",
        "href",
        "to",
        "src"
      ],
      "answer": 1,
      "exp": "The 'href' attribute specifies the target URL."
    },
    {
      "q": "4. What is the key difference between id and class attributes?",
      "options": [
        "id must be unique per page, while class can be reused",
        "class is for JavaScript only",
        "id only works in tables",
        "There is no difference"
      ],
      "answer": 0,
      "exp": "An id must be unique across the document; class can be shared by multiple elements."
    }
  ],
  "ch6": [
    {
      "q": "1. Which tag gives text strong semantic importance and renders bold by default?",
      "options": [
        "<b>",
        "<strong>",
        "<bold>",
        "<imp>"
      ],
      "answer": 1,
      "exp": "<strong> conveys semantic importance, rendered bold by default."
    },
    {
      "q": "2. Which tag creates subscript text like H\u2082O?",
      "options": [
        "<sup>",
        "<sub>",
        "<small>",
        "<down>"
      ],
      "answer": 1,
      "exp": "<sub> defines subscript text."
    },
    {
      "q": "3. Which tag creates superscript text like X\u00b2?",
      "options": [
        "<sup>",
        "<sub>",
        "<high>",
        "<up>"
      ],
      "answer": 0,
      "exp": "<sup> defines superscript text."
    },
    {
      "q": "4. Which tag represents deleted or struck-through text?",
      "options": [
        "<strike>",
        "<del>",
        "<remove>",
        "<cut>"
      ],
      "answer": 1,
      "exp": "<del> represents deleted text, rendered with a line-through."
    }
  ],
  "ch7": [
    {
      "q": "1. Which phrase tag is specifically used to display inline computer code?",
      "options": [
        "<code>",
        "<program>",
        "<syntax>",
        "<script>"
      ],
      "answer": 0,
      "exp": "The <code> tag defines inline snippets of computer code."
    },
    {
      "q": "2. Which tag represents keyboard input entered by the user (e.g. Ctrl+C)?",
      "options": [
        "<input>",
        "<key>",
        "<kbd>",
        "<type>"
      ],
      "answer": 2,
      "exp": "<kbd> defines keyboard input in HTML."
    },
    {
      "q": "3. Which tag defines sample output from a computer program?",
      "options": [
        "<output>",
        "<samp>",
        "<result>",
        "<console>"
      ],
      "answer": 1,
      "exp": "<samp> represents sample computer program output."
    },
    {
      "q": "4. Which tag defines an abbreviation or acronym?",
      "options": [
        "<short>",
        "<abbr>",
        "<acronym>",
        "<brief>"
      ],
      "answer": 1,
      "exp": "<abbr> defines an abbreviation or acronym."
    }
  ],
  "ch8": [
    {
      "q": "1. What is the correct syntax for an HTML comment?",
      "options": [
        "// this is a comment",
        "/* this is a comment */",
        "<!-- this is a comment -->",
        "# this is a comment"
      ],
      "answer": 2,
      "exp": "HTML comments begin with <!-- and end with -->."
    },
    {
      "q": "2. Do HTML comments render visibly on the webpage?",
      "options": [
        "Yes, in italics",
        "No, browsers ignore comments during rendering",
        "Only in debug mode",
        "Only if inside <body>"
      ],
      "answer": 1,
      "exp": "Comments are completely ignored by the visual browser renderer."
    },
    {
      "q": "3. Can HTML comments span across multiple lines?",
      "options": [
        "Yes, HTML comments can be multi-line",
        "No, single line only",
        "Only inside <script>",
        "Only in XML mode"
      ],
      "answer": 0,
      "exp": "HTML comments can span multiple lines without issue."
    },
    {
      "q": "4. Can users see HTML comments if they use 'View Page Source'?",
      "options": [
        "No, comments are encrypted",
        "Yes, comments remain visible in page source",
        "Only administrators can see them",
        "Only if logged in"
      ],
      "answer": 1,
      "exp": "Anyone can view HTML comments via View Page Source in their browser."
    }
  ],
  "ch9": [
    {
      "q": "1. Which meta tag ensures character encoding is properly set to UTF-8?",
      "options": [
        "<meta charset=\"UTF-8\">",
        "<meta encoding=\"UTF-8\">",
        "<meta type=\"utf-8\">",
        "<charset>UTF-8</charset>"
      ],
      "answer": 0,
      "exp": "<meta charset=\"UTF-8\"> defines the standard UTF-8 character encoding."
    },
    {
      "q": "2. Which meta tag tells search engine crawlers not to index a web page?",
      "options": [
        "<meta name=\"robots\" content=\"noindex\">",
        "<meta hide=\"true\">",
        "<meta search=\"none\">",
        "<meta crawl=\"false\">"
      ],
      "answer": 0,
      "exp": "<meta name=\"robots\" content=\"noindex\"> prevents search engines from indexing the page."
    },
    {
      "q": "3. What is the purpose of the description meta tag?",
      "options": [
        "It changes website font",
        "It provides a summary snippet for search results",
        "It defines copyright license",
        "It caches files locally"
      ],
      "answer": 1,
      "exp": "The description meta tag provides a summary often shown in search engine results."
    },
    {
      "q": "4. Where must all <meta> tags be placed?",
      "options": [
        "Inside <body>",
        "Inside <head>",
        "Inside <footer>",
        "At the very end of the file"
      ],
      "answer": 1,
      "exp": "Meta tags must always be placed within the <head> element."
    }
  ],
  "ch10": [
    {
      "q": "1. Which tag creates a numbered (ordered) list?",
      "options": [
        "<ul>",
        "<ol>",
        "<li>",
        "<dl>"
      ],
      "answer": 1,
      "exp": "<ol> defines an ordered (numbered) list."
    },
    {
      "q": "2. Which tag creates a bulleted (unordered) list?",
      "options": [
        "<ul>",
        "<ol>",
        "<list>",
        "<li>"
      ],
      "answer": 0,
      "exp": "<ul> defines an unordered (bulleted) list."
    },
    {
      "q": "3. What tag represents each individual item inside an <ol> or <ul>?",
      "options": [
        "<item>",
        "<list>",
        "<li>",
        "<dl>"
      ],
      "answer": 2,
      "exp": "<li> represents a list item."
    },
    {
      "q": "4. Which tag defines the term inside a description list <dl>?",
      "options": [
        "<dd>",
        "<dt>",
        "<desc>",
        "<li>"
      ],
      "answer": 1,
      "exp": "<dt> defines the description term, and <dd> defines the description data."
    }
  ],
  "ch11": [
    {
      "q": "1. Which tag defines a table row in HTML?",
      "options": [
        "<td>",
        "<th>",
        "<tr>",
        "<row>"
      ],
      "answer": 2,
      "exp": "<tr> defines a table row."
    },
    {
      "q": "2. Which tag defines bold, centered table header cells?",
      "options": [
        "<head>",
        "<th>",
        "<td>",
        "<caption/gt;"
      ],
      "answer": 1,
      "exp": "<th> defines table header cells, styled bold and centered by default."
    },
    {
      "q": "3. Which attribute allows a table cell to span multiple columns?",
      "options": [
        "rowspan",
        "colspan",
        "col-width",
        "span"
      ],
      "answer": 1,
      "exp": "colspan merges adjacent table columns."
    },
    {
      "q": "4. Which attribute allows a table cell to span multiple rows?",
      "options": [
        "rowspan",
        "colspan",
        "row-height",
        "merge"
      ],
      "answer": 0,
      "exp": "rowspan merges cells vertically across rows."
    }
  ],
  "ch12": [
    {
      "q": "1. Which tag embeds an image in an HTML document?",
      "options": [
        "<image>",
        "<img>",
        "<pic>",
        "<src>"
      ],
      "answer": 1,
      "exp": "<img> is the standard element for embedding images."
    },
    {
      "q": "2. Which attribute specifies the image source path or URL?",
      "options": [
        "href",
        "url",
        "src",
        "link"
      ],
      "answer": 2,
      "exp": "The 'src' attribute specifies image location."
    },
    {
      "q": "3. Why should width and height attributes be provided for <img>?",
      "options": [
        "Prevents layout shift while page loads",
        "Makes images download faster",
        "Required for CSS animations",
        "Enables retina displays"
      ],
      "answer": 0,
      "exp": "Explicit dimensions prevent Cumulative Layout Shift (CLS) during page loading."
    },
    {
      "q": "4. Is <img> a void (self-closing) element in HTML5?",
      "options": [
        "Yes, it does not require a closing tag",
        "No, it must always end with </img>",
        "Only when using SVG",
        "Only in mobile browsers"
      ],
      "answer": 0,
      "exp": "<img> is a void element and cannot contain child elements or a closing tag."
    }
  ],
  "ch13": [
    {
      "q": "1. Which tag defines a hyperlink in HTML?",
      "options": [
        "<link>",
        "<a>",
        "<url>",
        "<href>"
      ],
      "answer": 1,
      "exp": "The <a> (anchor) tag creates hyperlinks."
    },
    {
      "q": "2. How do you instruct a link to open in a new browser tab?",
      "options": [
        "target=\"_blank\"",
        "target=\"_new\"",
        "open=\"window\"",
        "rel=\"external\""
      ],
      "answer": 0,
      "exp": "target=\"_blank\" opens the linked URL in a new browser tab."
    },
    {
      "q": "3. How do you create an internal bookmark link jumping to an element with id=\"tips\"?",
      "options": [
        "href=\"#tips\"",
        "href=\"tips\"",
        "link=\"#tips\"",
        "target=\"tips\""
      ],
      "answer": 0,
      "exp": "href=\"#tips\" jumps to the element with id=\"tips\" on the page."
    },
    {
      "q": "4. Which scheme is used to create an email link in an <a> tag?",
      "options": [
        "email:",
        "send:",
        "mailto:",
        "inbox:"
      ],
      "answer": 2,
      "exp": "mailto: opens the default email client with the specified recipient."
    }
  ],
  "ch14": [
    {
      "q": "1. Which generic block-level container is used for layout and grouping?",
      "options": [
        "<span>",
        "<div>",
        "<section>",
        "<group>"
      ],
      "answer": 1,
      "exp": "<div> is a generic block-level element."
    },
    {
      "q": "2. Which generic inline element is used for styling short text segments?",
      "options": [
        "<span>",
        "<div>",
        "<p>",
        "<em>"
      ],
      "answer": 0,
      "exp": "<span> is an inline container used to style parts of text."
    },
    {
      "q": "3. Which tag represents an extended quotation from another source?",
      "options": [
        "<quote>",
        "<q>",
        "<blockquote>",
        "<cite>"
      ],
      "answer": 2,
      "exp": "<blockquote> represents long quotation blocks, indented by default."
    },
    {
      "q": "4. What is the default display behavior of a <div> element?",
      "options": [
        "inline",
        "block (starts on a new line and takes full width)",
        "flex",
        "none"
      ],
      "answer": 1,
      "exp": "<div> has a default display value of 'block'."
    }
  ],
  "ch15": [
    {
      "q": "1. What color does the hexadecimal code #000000 represent?",
      "options": [
        "White",
        "Red",
        "Black",
        "Blue"
      ],
      "answer": 2,
      "exp": "#000000 represents pure black."
    },
    {
      "q": "2. What color does rgb(255, 255, 255) represent?",
      "options": [
        "Pure White",
        "Pure Black",
        "Transparent",
        "Gray"
      ],
      "answer": 0,
      "exp": "rgb(255, 255, 255) represents pure white."
    },
    {
      "q": "3. In HSL color notation, what do the three values represent?",
      "options": [
        "Hue, Saturation, Lightness",
        "Height, Size, Level",
        "Hex, Standard, Line",
        "Heavy, Soft, Light"
      ],
      "answer": 0,
      "exp": "HSL stands for Hue, Saturation, and Lightness."
    },
    {
      "q": "4. What does the fourth parameter 'a' in rgba(0, 0, 0, 0.5) control?",
      "options": [
        "Accuracy",
        "Alpha opacity / transparency",
        "Angle",
        "Attenuation"
      ],
      "answer": 1,
      "exp": "The alpha channel defines the opacity from 0.0 (transparent) to 1.0 (opaque)."
    }
  ],
  "ch16": [
    {
      "q": "1. Why is the old <font> tag discouraged in modern HTML?",
      "options": [
        "It is deprecated; font styles should be specified with CSS",
        "It is only supported in Internet Explorer",
        "It increases download size by 10x",
        "It requires JavaScript"
      ],
      "answer": 0,
      "exp": "The <font> tag is deprecated in HTML5; typography is managed through CSS."
    },
    {
      "q": "2. Which CSS property replaces the old <font face=\"...\"> attribute?",
      "options": [
        "font-family",
        "font-type",
        "font-style",
        "typeface"
      ],
      "answer": 0,
      "exp": "font-family specifies the typeface in modern CSS."
    },
    {
      "q": "3. Which generic font family does NOT have small decorative strokes on letter ends?",
      "options": [
        "Serif",
        "Sans-serif",
        "Monospace",
        "Cursive"
      ],
      "answer": 1,
      "exp": "Sans-serif fonts have clean strokes without small end projections (serifs)."
    },
    {
      "q": "4. Which CSS property replaces the old <font size=\"...\"> attribute?",
      "options": [
        "font-scale",
        "font-size",
        "text-dimension",
        "size"
      ],
      "answer": 1,
      "exp": "font-size controls text dimensions in modern web standards."
    }
  ],
  "ch17": [
    {
      "q": "1. Which attribute specifies the server endpoint where form data is sent?",
      "options": [
        "target",
        "action",
        "method",
        "submit"
      ],
      "answer": 1,
      "exp": "The 'action' attribute specifies the processing URL for form data."
    },
    {
      "q": "2. Which HTTP method sends form data visibly in the URL query string?",
      "options": [
        "POST",
        "GET",
        "PUT",
        "DELETE"
      ],
      "answer": 1,
      "exp": "GET appends submitted values to the URL query string."
    },
    {
      "q": "3. Which HTTP method is recommended for submitting passwords and secure data?",
      "options": [
        "GET",
        "POST",
        "HEAD",
        "OPTIONS"
      ],
      "answer": 1,
      "exp": "POST sends form data in the HTTP request body rather than the URL."
    },
    {
      "q": "4. Which element binds descriptive text to an input field for accessibility?",
      "options": [
        "<title>",
        "<label>",
        "<caption>",
        "<desc>"
      ],
      "answer": 1,
      "exp": "<label for=\"...\"> binds a clickable label to a form control."
    }
  ],
  "ch18": [
    {
      "q": "1. Which tag plays video files natively in modern HTML5 browsers?",
      "options": [
        "<movie>",
        "<video>",
        "<media>",
        "<player>"
      ],
      "answer": 1,
      "exp": "The <video> tag is the HTML5 standard for video playback."
    },
    {
      "q": "2. Which attribute adds user play, pause, and volume controls?",
      "options": [
        "buttons",
        "controls",
        "interface",
        "player"
      ],
      "answer": 1,
      "exp": "The 'controls' attribute adds browser default media controls."
    },
    {
      "q": "3. Which tag embeds an external webpage into the current document?",
      "options": [
        "<frame>",
        "<iframe>",
        "<embed-page>",
        "<window>"
      ],
      "answer": 1,
      "exp": "<iframe> defines an inline nested browsing frame."
    },
    {
      "q": "4. Which element specifies multiple media formats inside <video> or <audio>?",
      "options": [
        "<src>",
        "<source>",
        "<format>",
        "<track>"
      ],
      "answer": 1,
      "exp": "<source> provides alternate video/audio formats for browser compatibility."
    }
  ],
  "ch19": [
    {
      "q": "1. Which tag plays audio files natively in HTML5?",
      "options": [
        "<sound>",
        "<audio>",
        "<music>",
        "<voice>"
      ],
      "answer": 1,
      "exp": "<audio> is the HTML5 standard element for playing audio."
    },
    {
      "q": "2. Which attribute causes media to restart from the beginning when it finishes?",
      "options": [
        "repeat",
        "loop",
        "cycle",
        "continuous"
      ],
      "answer": 1,
      "exp": "The 'loop' attribute causes media to play repeatedly."
    },
    {
      "q": "3. Why do most modern browsers block autoplay audio unless muted?",
      "options": [
        "To protect users from unexpected loud noise and preserve battery",
        "Technical browser limitations",
        "Audio files cannot load automatically",
        "Copyright restrictions"
      ],
      "answer": 0,
      "exp": "Browsers restrict unmuted autoplay to prevent disruptive user experiences."
    },
    {
      "q": "4. Which attribute mutes audio output by default?",
      "options": [
        "silent",
        "quiet",
        "muted",
        "volume=\"0\""
      ],
      "answer": 2,
      "exp": "The 'muted' attribute silences audio output."
    }
  ],
  "ch20": [
    {
      "q": "1. Is the <marquee> tag recommended in modern web development?",
      "options": [
        "Yes, it is modern HTML5 standard",
        "No, it is obsolete and non-standard; use CSS animations instead",
        "Only in Chrome",
        "Only for news tickers"
      ],
      "answer": 1,
      "exp": "<marquee> is deprecated and non-standard; CSS animations should be used."
    },
    {
      "q": "2. What did the historical <marquee> tag do?",
      "options": [
        "Created a popup window",
        "Scrolled text or images across the viewport",
        "Blurred background images",
        "Played background music"
      ],
      "answer": 1,
      "exp": "<marquee> scrolled text horizontally or vertically."
    },
    {
      "q": "3. Which modern technology replaces marquee effects with superior performance?",
      "options": [
        "CSS @keyframes animations and transitions",
        "XML transforms",
        "HTML <blink>",
        "Flash player"
      ],
      "answer": 0,
      "exp": "CSS @keyframes animations provide smooth, performant, accessible animation."
    },
    {
      "q": "4. Why is continuous auto-scrolling text problematic for accessibility (WCAG)?",
      "options": [
        "Difficult for users with reading, attention, or visual impairments to read",
        "Uses too much CPU",
        "Breaks search engine ranking",
        "Disables keyboard shortcuts"
      ],
      "answer": 0,
      "exp": "WCAG requires that moving or scrolling content can be paused, stopped, or hidden."
    }
  ],
  "ch21": [
    {
      "q": "1. What is the primary benefit of semantic HTML tags?",
      "options": [
        "Gives meaningful structure to search engines and screen readers",
        "Makes web pages load without CSS",
        "Compiles faster into machine code",
        "Only works on desktop computers"
      ],
      "answer": 0,
      "exp": "Semantic HTML conveys clear meaning to browsers, search engines, and screen readers."
    },
    {
      "q": "2. Which tag should enclose the primary, central content of a webpage?",
      "options": [
        "<article>",
        "<main>",
        "<section>",
        "<body>"
      ],
      "answer": 1,
      "exp": "<main> represents the dominant, unique content of the document."
    },
    {
      "q": "3. Which semantic tag represents a self-contained composition like a blog post or news card?",
      "options": [
        "<article>",
        "<section>",
        "<aside>",
        "<div class=\"post\">"
      ],
      "answer": 0,
      "exp": "<article> represents an independently distributable piece of content."
    },
    {
      "q": "4. Which semantic tag represents tangential content like a sidebar or related links?",
      "options": [
        "<aside>",
        "<nav>",
        "<sidebar>",
        "<section>"
      ],
      "answer": 0,
      "exp": "<aside> represents content tangentially related to the content around it."
    }
  ],
  "ch22": [
    {
      "q": "1. What does it mean when an HTML tag is classified as 'deprecated'?",
      "options": [
        "It is outdated, obsolete, and replaced by CSS or newer tags",
        "It causes computer viruses",
        "It works only on Linux",
        "It cannot be written in lowercase"
      ],
      "answer": 0,
      "exp": "Deprecated tags are phased out of official specifications in favor of modern CSS."
    },
    {
      "q": "2. What is the modern CSS alternative to the deprecated <center> tag?",
      "options": [
        "text-align: center; or margin: 0 auto; in CSS",
        "<align center>",
        "<middle>",
        "<box center>"
      ],
      "answer": 0,
      "exp": "Centering in modern web design is handled via CSS text-align or margin auto / flexbox."
    },
    {
      "q": "3. Which modern semantic tag replaces the deprecated <strike> tag?",
      "options": [
        "<del>",
        "<cross>",
        "<remove>",
        "<cut>"
      ],
      "answer": 0,
      "exp": "<del> or CSS text-decoration: line-through replaces <strike>."
    },
    {
      "q": "4. What replaces the old <applet> tag?",
      "options": [
        "Modern HTML5/JS APIs or <object>",
        "<java>",
        "<flash>",
        "<silverlight>"
      ],
      "answer": 0,
      "exp": "<applet> is obsolete and replaced by standard HTML5, JavaScript, or <object>."
    }
  ],
  "ch23": [
    {
      "q": "1. Are HTML5 tag names case-sensitive?",
      "options": [
        "No, but lowercase is universal industry standard and best practice",
        "Yes, all tags must be uppercase",
        "Yes, only headings are case-sensitive",
        "Only inside <body>"
      ],
      "answer": 0,
      "exp": "HTML5 is case-insensitive, but lowercase is universally standard."
    },
    {
      "q": "2. Which tag defines a clickable interactive button?",
      "options": [
        "<button>",
        "<click>",
        "<press>",
        "<submit>"
      ],
      "answer": 0,
      "exp": "<button> creates clickable buttons in HTML."
    },
    {
      "q": "3. Which tag groups related options within a <select> dropdown list?",
      "options": [
        "<optgroup>",
        "<group>",
        "<options>",
        "<list>"
      ],
      "answer": 0,
      "exp": "<optgroup> groups related options inside a <select> menu."
    },
    {
      "q": "4. Which tag defines an interactive disclosure widget that toggles open and closed?",
      "options": [
        "<details>",
        "<accordion>",
        "<toggle>",
        "<collapse>"
      ],
      "answer": 0,
      "exp": "<details> (with <summary>) creates a collapsible disclosure widget natively."
    }
  ],
  "ch24": [
    {
      "q": "1. What does ASCII stand for?",
      "options": [
        "American Standard Code for Information Interchange",
        "Advanced Standard Computer Interface Index",
        "All Systems Code for Internet Integration",
        "Automated System Code for Information Input"
      ],
      "answer": 0,
      "exp": "ASCII stands for American Standard Code for Information Interchange."
    },
    {
      "q": "2. How many standard characters are defined in basic 7-bit ASCII?",
      "options": [
        "64",
        "128 (0 to 127)",
        "256",
        "512"
      ],
      "answer": 1,
      "exp": "Standard 7-bit ASCII defines 128 characters from index 0 to 127."
    },
    {
      "q": "3. What is the decimal ASCII value of the space character?",
      "options": [
        "0",
        "10",
        "32",
        "64"
      ],
      "answer": 2,
      "exp": "Decimal 32 corresponds to the space character in ASCII."
    },
    {
      "q": "4. Which modern universal encoding standard is backward-compatible with 7-bit ASCII?",
      "options": [
        "UTF-8",
        "EBCDIC",
        "ASCII-16",
        "Shift-JIS"
      ],
      "answer": 0,
      "exp": "UTF-8 encodes ASCII characters using the exact same byte values (0-127)."
    }
  ],
  "ch25": [
    {
      "q": "1. What does MIME stand for?",
      "options": [
        "Multipurpose Internet Mail Extensions",
        "Modern Internet Media Encoding",
        "Multi-platform Interface for Media Exchange",
        "Main Information Message Entity"
      ],
      "answer": 0,
      "exp": "MIME stands for Multipurpose Internet Mail Extensions."
    },
    {
      "q": "2. What is the standard MIME type for HTML documents?",
      "options": [
        "text/html",
        "application/html",
        "document/web",
        "text/web"
      ],
      "answer": 0,
      "exp": "'text/html' is the official MIME type for HTML files."
    },
    {
      "q": "3. What is the standard MIME type for JSON data?",
      "options": [
        "application/json",
        "text/json",
        "data/json",
        "object/json"
      ],
      "answer": 0,
      "exp": "'application/json' is the standard MIME type for JSON."
    },
    {
      "q": "4. Which HTTP header indicates the MIME type of a delivered file?",
      "options": [
        "Content-Type",
        "Accept-Encoding",
        "Media-Format",
        "File-Type"
      ],
      "answer": 0,
      "exp": "The 'Content-Type' header informs clients of the MIME type of the resource."
    }
  ],
  "ch26": [
    {
      "q": "1. Why is URL encoding necessary for web addresses?",
      "options": [
        "Converts non-ASCII and reserved characters into percent-encoded bytes for safe transmission",
        "Compresses file sizes on the web",
        "Protects URLs from being bookmarked",
        "Translates URLs into machine code"
      ],
      "answer": 0,
      "exp": "URL encoding replaces unsafe or reserved characters with % followed by two hexadecimal digits."
    },
    {
      "q": "2. What is the URL-encoded percent equivalent of a space character?",
      "options": [
        "%20",
        "%00",
        "%99",
        "%32"
      ],
      "answer": 0,
      "exp": "%20 represents a space character in URL encoding."
    },
    {
      "q": "3. What is the URL-encoded equivalent of the & character?",
      "options": [
        "%26",
        "%38",
        "%amp;",
        "%25"
      ],
      "answer": 0,
      "exp": "%26 is the percent-encoding for an ampersand (&)."
    },
    {
      "q": "4. Which JavaScript function is used to encode a URI query component?",
      "options": [
        "encodeURIComponent()",
        "urlEncode()",
        "escapeURI()",
        "formatURL()"
      ],
      "answer": 0,
      "exp": "encodeURIComponent() encodes special characters for safe URL parameters."
    }
  ],
  "ch27": [
    {
      "q": "1. Which attribute specifies the primary language of an HTML document?",
      "options": [
        "lang",
        "language",
        "locale",
        "translate"
      ],
      "answer": 0,
      "exp": "The 'lang' attribute on <html> specifies the primary document language."
    },
    {
      "q": "2. What is the 2-letter ISO 639-1 code for English?",
      "options": [
        "en",
        "eng",
        "us",
        "uk"
      ],
      "answer": 0,
      "exp": "'en' is the ISO 639-1 code for English."
    },
    {
      "q": "3. What is the 2-letter ISO 639-1 code for Hindi?",
      "options": [
        "hi",
        "hin",
        "in",
        "hn"
      ],
      "answer": 0,
      "exp": "'hi' is the ISO 639-1 code for Hindi."
    },
    {
      "q": "4. Why is setting the lang attribute critical for accessibility?",
      "options": [
        "Helps screen readers select correct pronunciation, accent, and speech synthesis rules",
        "Allows browsers to translate pages without permission",
        "Increases monitor refresh rate",
        "Loads regional CSS automatically"
      ],
      "answer": 0,
      "exp": "The 'lang' attribute guides screen readers in using proper pronunciation rules."
    }
  ]
};

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getQuizForChapter(key, title) {
  if (CHAPTER_QUIZZES[key]) {
    return CHAPTER_QUIZZES[key];
  }
  return [
    {
      q: `1. What is the primary purpose of ${title}?`,
      options: [
        `To properly format and structure content according to ${title} standards`,
        "To replace JavaScript backend logic completely",
        "To compile executable machine code",
        "It is deprecated and should never be used"
      ],
      answer: 0,
      exp: `Understanding ${title} is essential for semantic, accessible HTML.`
    },
    {
      q: `2. Which statement regarding ${title} is true?`,
      options: [
        "HTML elements must follow valid opening and closing syntax",
        "Browsers will refuse to load pages with styling errors",
        "HTML is a compiled programming language",
        "Tags are strictly case-sensitive in HTML5"
      ],
      answer: 0,
      exp: "Valid nesting and proper tag syntax ensure consistent rendering."
    },
    {
      q: `3. Best practice when implementing ${title} features:`,
      options: [
        "Keep presentation (CSS) separated from structural content (HTML)",
        "Write all inline CSS directly inside every tag",
        "Avoid using semantic tags",
        "Never test in more than one browser"
      ],
      answer: 0,
      exp: "Separating content structure (HTML) and presentation (CSS) is a core web standard."
    }
  ];
}

function renderChapterQuizHTML(key, title, indexNumber) {
  const questions = getQuizForChapter(key, title);
  const quizId = `quiz-${key}`;
  const chIndex = chaptersKeys.indexOf(key);
  const hasNext = chIndex < chaptersKeys.length - 1;
  const nextKey = hasNext ? chaptersKeys[chIndex + 1] : null;
  const nextTitle = (nextKey && HTML_TUTORIAL_DATA[nextKey]) ? HTML_TUTORIAL_DATA[nextKey].title : 'Next Chapter';
  const cleanNextTitle = nextTitle.replace(/^HTML\s*[-–]\s*/i, '');

  let questionsHTML = '';
  questions.forEach((item, qIdx) => {
    let optionsHTML = '';
    item.options.forEach((optText, optIdx) => {
      optionsHTML += `
        <button type="button" class="quiz-opt-btn" onclick="checkQuizAnswer(this, ${optIdx})" data-opt="${optIdx}">
          <span>${String.fromCharCode(65 + optIdx)}) ${escapeHTML(optText)}</span>
        </button>
      `;
    });

    questionsHTML += `
      <div class="quiz-question-card" data-correct="${item.answer}" data-exp="${escapeHTML(item.exp || '')}">
        <div class="quiz-question-text">${escapeHTML(item.q)}</div>
        <div class="quiz-options">
          ${optionsHTML}
        </div>
        <div class="quiz-feedback"></div>
      </div>
    `;
  });

  return `
    <!-- START OF QUIZ FOR MODULE ${indexNumber} -->
    <div class="quiz-container" id="${quizId}">
      <div class="quiz-header">
        <h3 class="quiz-header-title">
          <i class="fa-solid fa-circle-question"></i> Chapter ${indexNumber} Quiz: ${escapeHTML(title)}
        </h3>
        <span class="quiz-badge">${questions.length} Questions</span>
      </div>
      
      <div class="quiz-questions-wrap">
        ${questionsHTML}
      </div>

      <div class="quiz-completion-banner" id="banner-${quizId}" style="display: none;"></div>

      <div class="quiz-actions">
        <div class="quiz-left-actions">
          <button type="button" class="quiz-score-btn" onclick="calculateQuizScore('${quizId}')">
            <i class="fa-solid fa-calculator"></i> Calculate Score
          </button>
          <div class="quiz-score-display" id="score-${quizId}">Score: - / ${questions.length}</div>
        </div>
        ${hasNext ? `
          <button type="button" class="quiz-next-chapter-btn" onclick="navigateChapter(1)" title="Go to ${escapeHTML(cleanNextTitle)}">
            Next: ${escapeHTML(cleanNextTitle)} <i class="fa-solid fa-arrow-right"></i>
          </button>
        ` : `
          <button type="button" class="quiz-next-chapter-btn" onclick="window.location.href='index.html'">
            Finish Course <i class="fa-solid fa-trophy"></i>
          </button>
        `}
      </div>
    </div>
    <!-- END OF QUIZ -->
  `;
}

function checkQuizAnswer(btn, chosenIndex) {
  const card = btn.closest('.quiz-question-card');
  if (!card) return;
  const correctIndex = parseInt(card.dataset.correct, 10);
  const explanation = card.dataset.exp || '';
  const feedback = card.querySelector('.quiz-feedback');
  const allButtons = card.querySelectorAll('.quiz-opt-btn');

  allButtons.forEach(b => b.disabled = true);

  if (chosenIndex === correctIndex) {
    btn.classList.add('correct');
    if (feedback) {
      feedback.textContent = `✅ Correct! ${explanation}`;
      feedback.className = 'quiz-feedback show-correct';
    }
    card.dataset.status = 'correct';
  } else {
    btn.classList.add('incorrect');
    if (allButtons[correctIndex]) {
      allButtons[correctIndex].classList.add('correct');
    }
    if (feedback) {
      feedback.textContent = `❌ Incorrect. ${explanation}`;
      feedback.className = 'quiz-feedback show-incorrect';
    }
    card.dataset.status = 'incorrect';
  }

  // Check if all questions in current quiz are answered
  const container = card.closest('.quiz-container');
  if (container) {
    const allCards = container.querySelectorAll('.quiz-question-card');
    let answered = 0;
    let correct = 0;
    allCards.forEach(c => {
      if (c.dataset.status) answered++;
      if (c.dataset.status === 'correct') correct++;
    });

    if (answered === allCards.length) {
      calculateQuizScore(container.id);
      const nextBtn = container.querySelector('.quiz-next-chapter-btn');
      if (nextBtn) {
        nextBtn.classList.add('pulse-ready');
      }
      const banner = container.querySelector('.quiz-completion-banner');
      if (banner) {
        banner.style.display = 'flex';
        const percent = Math.round((correct / allCards.length) * 100);
        banner.innerHTML = `
          <div class="banner-text">
            <strong>🎉 Chapter Quiz Completed!</strong>
            <span>You scored ${correct} out of ${allCards.length} (${percent}%). Ready to move to the next chapter!</span>
          </div>
          <button type="button" class="quiz-banner-next-btn" onclick="navigateChapter(1)">
            Next Chapter <i class="fa-solid fa-arrow-right"></i>
          </button>
        `;
      }
    }
  }
}

function calculateQuizScore(quizId) {
  const container = document.getElementById(quizId);
  if (!container) return;
  const cards = container.querySelectorAll('.quiz-question-card');
  let correctCount = 0;
  let answeredCount = 0;

  cards.forEach(card => {
    if (card.dataset.status === 'correct') correctCount++;
    if (card.dataset.status) answeredCount++;
  });

  const scoreDisplay = document.getElementById(`score-${quizId}`);
  if (scoreDisplay) {
    const percent = Math.round((correctCount / cards.length) * 100);
    let message = '';
    if (percent === 100) message = ' 🌟 Perfect Score!';
    else if (percent >= 75) message = ' 👏 Great Job!';
    else message = ' 💡 Review & Proceed!';

    scoreDisplay.innerHTML = `Score: ${correctCount}/${cards.length} (${percent}%)${message}`;
  }
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
    activeNavItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
  
  // Build and render HTML with Interactive Quiz
  const indexNumber = chaptersKeys.indexOf(key) + 1;
  const quizHTML = renderChapterQuizHTML(key, chapter.title, indexNumber);

  chapterContainer.innerHTML = `
    <div class="chapter-header-box">
      <div class="chapter-tag">Chapter ${indexNumber} of ${chaptersKeys.length}</div>
      <h1 class="main-chapter-title">${chapter.title}</h1>
    </div>
    <div class="chapter-body">
      ${chapter.content}
      ${quizHTML}
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
