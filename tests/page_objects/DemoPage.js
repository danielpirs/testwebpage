/**
 * Page Object Model for the Demo Controls Page.
 * Encapsulates selectors and interactions for each section.
 */
export class DemoPage {
  constructor(page) {
    this.page = page;
    this.url = process.env.APP_URL || 'http://localhost:5173';

    // Header
    this.header = page.getByTestId('app-header');
    this.title = page.getByTestId('app-title');
    this.subtitle = page.getByTestId('app-subtitle');

    // Buttons section
    this.buttonsSection = page.getByTestId('buttons-section');
    this.primaryBtn = page.getByTestId('btn-primary');
    this.secondaryBtn = page.getByTestId('btn-secondary');
    this.dangerBtn = page.getByTestId('btn-danger');
    this.disabledBtn = page.getByTestId('btn-disabled');
    this.buttonStatus = page.getByTestId('button-status');

    // Text section
    this.textSection = page.getByTestId('text-section');
    this.staticText = page.getByTestId('static-text');
    this.textInput = page.getByTestId('text-input');
    this.textareaInput = page.getByTestId('textarea-input');
    this.inputEcho = page.getByTestId('input-echo');

    // Dropdown section
    this.dropdownSection = page.getByTestId('dropdown-section');
    this.dropdownSelect = page.getByTestId('dropdown-select');
    this.dropdownStatus = page.getByTestId('dropdown-status');

    // Radio section
    this.radioSection = page.getByTestId('radio-section');
    this.radioStatus = page.getByTestId('radio-status');

    // Checkbox section
    this.checkboxSection = page.getByTestId('checkbox-section');

    // Modal section
    this.modalSection = page.getByTestId('modal-section');
    this.openInfoModalBtn = page.getByTestId('open-info-modal');
    this.openWarningModalBtn = page.getByTestId('open-warning-modal');
    this.openConfirmModalBtn = page.getByTestId('open-confirm-modal');

    // Modal elements
    this.modal = page.getByTestId('modal');
    this.modalOverlay = page.getByTestId('modal-overlay');
    this.modalTitle = page.getByTestId('modal-title');
    this.modalMessage = page.getByTestId('modal-message');
    this.modalCloseBtn = page.getByTestId('modal-close-btn');
    this.modalOkBtn = page.getByTestId('modal-ok-btn');

    // Footer
    this.footer = page.getByTestId('app-footer');
  }

  async navigate() {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('networkidle');
  }

  async clickRadio(color) {
    await this.page.getByTestId(`radio-${color.toLowerCase()}`).click();
  }

  async getRadioStatus() {
    return this.radioStatus.textContent();
  }

  async clickCheckbox(item) {
    await this.page.getByTestId(`checkbox-${item.toLowerCase()}`).click();
  }

  async isCheckboxChecked(item) {
    return this.page.getByTestId(`checkbox-${item.toLowerCase()}`).isChecked();
  }
}
