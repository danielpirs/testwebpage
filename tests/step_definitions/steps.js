import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { DemoPage } from '../page_objects/DemoPage.js';

// ==================== Background ====================

Given('I am on the demo controls page', async function () {
  this.demoPage = new DemoPage(this.page);
  await this.demoPage.navigate();
});

// ==================== Header ====================

Then('I should see the page title {string}', async function (expectedTitle) {
  await expect(this.demoPage.title).toBeVisible();
  await expect(this.demoPage.title).toHaveText(expectedTitle);
});

Then('I should see the page subtitle', async function () {
  await expect(this.demoPage.subtitle).toBeVisible();
});

// ==================== Buttons ====================

Then('I should see the buttons section', async function () {
  await expect(this.demoPage.buttonsSection).toBeVisible();
});

Then('the primary button should be visible', async function () {
  await expect(this.demoPage.primaryBtn).toBeVisible();
});

Then('the secondary button should be visible', async function () {
  await expect(this.demoPage.secondaryBtn).toBeVisible();
});

Then('the danger button should be visible', async function () {
  await expect(this.demoPage.dangerBtn).toBeVisible();
});

Then('the disabled button should be disabled', async function () {
  await expect(this.demoPage.disabledBtn).toBeDisabled();
});

When('I click the primary button', async function () {
  await this.demoPage.primaryBtn.click();
});

When('I click the secondary button', async function () {
  await this.demoPage.secondaryBtn.click();
});

When('I click the danger button', async function () {
  await this.demoPage.dangerBtn.click();
});

// ==================== Text & Input ====================

When('I type {string} in the text input', async function (text) {
  // Use page.evaluate() with native value setter to trigger React's onChange
  // in both Chrome and Lightpanda. pressSequentially/fill don't reliably fire
  // React synthetic events in Lightpanda.
  // We reset React's internal _valueTracker to ensure it detects the value change.
  await this.page.evaluate(({ selector, value }) => {
    const input = document.querySelector(selector);
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype, 'value'
    ).set;
    nativeInputValueSetter.call(input, value);
    const tracker = input._valueTracker;
    if (tracker) tracker.setValue('');
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }, { selector: '[data-testid="text-input"]', value: text });
});

Then('the input echo should show {string}', async function (expected) {
  await expect(this.demoPage.inputEcho).toBeVisible();
  await expect(this.demoPage.inputEcho).toContainText(expected);
});

Then('the textarea should be visible', async function () {
  await expect(this.demoPage.textareaInput).toBeVisible();
});

When('I type {string} in the textarea', async function (text) {
  await this.demoPage.textareaInput.fill(text);
});

Then('the textarea should contain {string}', async function (expected) {
  await expect(this.demoPage.textareaInput).toHaveValue(expected);
});

// ==================== Dropdown ====================

Then('the dropdown should be visible', async function () {
  await expect(this.demoPage.dropdownSelect).toBeVisible();
});

When('I select {string} from the dropdown', async function (option) {
  const value = option.toLowerCase();
  const browserName = process.env.BROWSER || 'chrome';

  if (browserName === 'lightpanda') {
    // Lightpanda has a bug where <option> element values are garbled, so Playwright's
    // selectOption can't find matching options. As a workaround, we call React's
    // useState dispatch function directly through the fiber tree.
    // NOTE: This depends on selectedFruit being the first useState hook in App.jsx.
    // If the hook order changes, this will need to be updated.
    await this.page.evaluate((val) => {
      const select = document.querySelector('[data-testid="dropdown-select"]');
      const fiberKey = Object.keys(select).find(k => k.startsWith('__reactFiber'));
      let fiber = select[fiberKey];
      while (fiber) {
        if (fiber.memoizedState && fiber.stateNode === null) {
          let hook = fiber.memoizedState;
          if (hook && hook.queue && hook.queue.dispatch) {
            hook.queue.dispatch(val);
            return;
          }
        }
        fiber = fiber.return;
      }
    }, value);
    // Wait for React to re-render with the new state
    await this.page.waitForFunction(
      (text) => {
        const el = document.querySelector('[data-testid="dropdown-status"]');
        return el && el.textContent.includes(text);
      },
      value,
      { timeout: 5000 }
    );
  } else {
    await this.demoPage.dropdownSelect.selectOption({ value });
  }
});

Then('the dropdown status should show {string}', async function (expected) {
  await expect(this.demoPage.dropdownStatus).toBeVisible();
  await expect(this.demoPage.dropdownStatus).toContainText(expected);
});

// ==================== Radio Buttons ====================

Then('the radio section should be visible', async function () {
  await expect(this.demoPage.radioSection).toBeVisible();
});

When('I select the {string} radio button', async function (color) {
  await this.demoPage.clickRadio(color);
});

Then('the radio status should show {string}', async function (expected) {
  await expect(this.demoPage.radioStatus).toBeVisible();
  await expect(this.demoPage.radioStatus).toContainText(expected);
});

// ==================== Checkboxes ====================

Then('the checkbox section should be visible', async function () {
  await expect(this.demoPage.checkboxSection).toBeVisible();
});

When('I check the {string} checkbox', async function (item) {
  const checkbox = this.page.getByTestId(`checkbox-${item.toLowerCase()}`);
  if (!(await checkbox.isChecked())) {
    await checkbox.click();
  }
});

When('I uncheck the {string} checkbox', async function (item) {
  const checkbox = this.page.getByTestId(`checkbox-${item.toLowerCase()}`);
  if (await checkbox.isChecked()) {
    await checkbox.click();
  }
});

Then('the {string} checkbox should be checked', async function (item) {
  const checkbox = this.page.getByTestId(`checkbox-${item.toLowerCase()}`);
  await expect(checkbox).toBeChecked();
});

Then('the {string} checkbox should be unchecked', async function (item) {
  const checkbox = this.page.getByTestId(`checkbox-${item.toLowerCase()}`);
  await expect(checkbox).not.toBeChecked();
});

// ==================== Modal ====================

When('I click the {string} button', async function (buttonText) {
  await this.page.getByRole('button', { name: buttonText, exact: true }).click();
});

Then('a modal should open with title {string}', async function (expectedTitle) {
  await expect(this.demoPage.modal).toBeVisible();
  await expect(this.demoPage.modalTitle).toHaveText(expectedTitle);
});

Then('the modal message should contain {string}', async function (expectedText) {
  await expect(this.demoPage.modalMessage).toContainText(expectedText);
});

When('I close the modal', async function () {
  await this.demoPage.modalCloseBtn.click();
});

When('I click the modal OK button', async function () {
  await this.demoPage.modalOkBtn.click();
});

Then('the modal should be closed', async function () {
  await expect(this.demoPage.modal).not.toBeVisible();
});

// ==================== Footer ====================

Then('the page footer should be visible', async function () {
  await expect(this.demoPage.footer).toBeVisible();
});
