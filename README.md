# testwebpage

A sample React demo page with common UI controls, tested with Cucumber.js and Playwright.

![Demo Controls Page](https://github.com/user-attachments/assets/89b99ce9-e6d2-4719-8e77-59cea5a95d98)
![Modal Popup](https://github.com/user-attachments/assets/d052a434-a8a3-431c-b8f6-8db7042078e7)

## Project Structure

```
├── .github/
│   └── workflows/
│       └── ci.yml          # GitHub Actions CI workflow
├── webapp/                 # React application (Vite)
│   ├── src/
│   │   ├── App.jsx         # Main page with all demo controls
│   │   ├── App.css         # Styling
│   │   └── components/
│   │       └── Modal.jsx   # Reusable modal component
│   └── package.json
└── tests/                  # Cucumber.js + Playwright tests
    ├── features/
    │   └── demo_page.feature       # Gherkin feature file
    ├── step_definitions/
    │   └── steps.js                # Step implementations
    ├── page_objects/
    │   └── DemoPage.js             # Page Object Model
    ├── support/
    │   └── world.js                # Cucumber world (browser setup)
    ├── cucumber.json               # Cucumber configuration
    └── package.json
```

## Demo Page Controls

The demo page (`http://localhost:5173`) contains the following UI elements:

| Section | Controls |
|---|---|
| **Buttons** | Primary, Secondary, Danger, Disabled |
| **Text & Input** | Static text, Text input, Textarea |
| **Dropdown** | Fruit selector (5 options) |
| **Radio Buttons** | Colour selector (Red, Green, Blue, Yellow, Purple) |
| **Checkboxes** | Interest selector (5 options) |
| **Popups / Modals** | Info, Warning, Confirm modal dialogs |

---

## Running the Web Page Manually

### Prerequisites
- [Node.js](https://nodejs.org/) 18+

### Steps

```bash
# 1. Install dependencies
cd webapp
npm install

# 2. Start the development server
npm run dev
```

The page is available at **http://localhost:5173**.

To create a production build:

```bash
npm run build
npm run preview   # serves the production build at http://localhost:4173
```

---

## Running the Tests Manually

### Prerequisites
- Node.js 18+
- The webapp dev server must be running (see above)

### Install test dependencies & browser

```bash
cd tests
npm install
npx playwright install chromium
```

### Run all tests (Chrome / Chromium)

```bash
npm test
# or explicitly:
BROWSER=chrome npm test
```

### Run against Lightpanda

[Lightpanda](https://lightpanda.io) is a lightweight headless browser that implements the Chrome DevTools Protocol (CDP). It must be downloaded and started separately.

1. **Download Lightpanda** (Linux x86-64):

   ```bash
   curl -L -o /usr/local/bin/lightpanda \
     https://github.com/lightpanda-io/browser/releases/latest/download/lightpanda-x86_64-linux
   chmod +x /usr/local/bin/lightpanda
   ```

2. **Start the Lightpanda CDP server** (port 9222):

   ```bash
   lightpanda serve --host 127.0.0.1 --port 9222
   ```

3. **Run the tests** (in a separate terminal, with the webapp also running):

   ```bash
   cd tests
   BROWSER=lightpanda npm test
   ```

### Test report

After a test run, an HTML report is written to `tests/reports/cucumber-report.html`. Open it in your browser:

```bash
open tests/reports/cucumber-report.html   # macOS
xdg-open tests/reports/cucumber-report.html  # Linux
```

---

## CI – GitHub Actions

The workflow at `.github/workflows/ci.yml` runs automatically on every push and pull request:

| Job | Description |
|---|---|
| `build-webapp` | Builds the React app with `npm run build` |
| `test-chrome` | Starts the dev server and runs all Cucumber tests in Chromium |
| `test-lightpanda` | Downloads Lightpanda, starts it, and runs all tests |

Test reports (HTML) are uploaded as workflow artifacts after each run.
