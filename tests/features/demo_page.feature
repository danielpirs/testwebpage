Feature: Demo Controls Page

  As a tester
  I want to verify all UI controls on the demo page
  So that I can confirm the page works correctly

  Background:
    Given I am on the demo controls page

  Scenario: Page header is visible
    Then I should see the page title "Demo Controls Page"
    And I should see the page subtitle

  Scenario: Buttons section is visible
    Then I should see the buttons section
    And the primary button should be visible
    And the secondary button should be visible
    And the danger button should be visible
    And the disabled button should be disabled

  Scenario: Clicking primary button shows a modal
    When I click the primary button
    Then a modal should open with title "Button Clicked"
    And the modal message should contain "Primary"
    When I close the modal
    Then the modal should be closed

  Scenario: Clicking secondary button shows a modal
    When I click the secondary button
    Then a modal should open with title "Button Clicked"
    And the modal message should contain "Secondary"
    When I click the modal OK button
    Then the modal should be closed

  Scenario: Clicking danger button shows a modal
    When I click the danger button
    Then a modal should open with title "Button Clicked"
    And the modal message should contain "Danger"
    When I close the modal
    Then the modal should be closed

  Scenario: Text input accepts and echoes text
    When I type "Hello, World!" in the text input
    Then the input echo should show "Hello, World!"

  Scenario: Textarea is visible and editable
    Then the textarea should be visible
    When I type "Multiple lines of text" in the textarea
    Then the textarea should contain "Multiple lines of text"

  Scenario: Dropdown allows selecting a fruit
    Then the dropdown should be visible
    When I select "Apple" from the dropdown
    Then the dropdown status should show "apple"

  Scenario: Dropdown shows different selections
    When I select "Banana" from the dropdown
    Then the dropdown status should show "banana"
    When I select "Cherry" from the dropdown
    Then the dropdown status should show "cherry"

  Scenario: Radio buttons can be selected
    Then the radio section should be visible
    When I select the "Red" radio button
    Then the radio status should show "red"

  Scenario: Selecting different radio buttons
    When I select the "Blue" radio button
    Then the radio status should show "blue"
    When I select the "Green" radio button
    Then the radio status should show "green"

  Scenario: Checkboxes can be checked and unchecked
    Then the checkbox section should be visible
    When I check the "Sports" checkbox
    Then the "Sports" checkbox should be checked
    When I uncheck the "Sports" checkbox
    Then the "Sports" checkbox should be unchecked

  Scenario: Multiple checkboxes can be selected
    When I check the "Music" checkbox
    And I check the "Travel" checkbox
    Then the "Music" checkbox should be checked
    And the "Travel" checkbox should be checked

  Scenario: Open info modal from modal section
    When I click the "Open Info Modal" button
    Then a modal should open with title "Information"
    And the modal message should contain "informational popup"
    When I close the modal
    Then the modal should be closed

  Scenario: Open warning modal from modal section
    When I click the "Open Warning Modal" button
    Then a modal should open with title "Warning"
    And the modal message should contain "warning message"
    When I close the modal
    Then the modal should be closed

  Scenario: Open confirm modal from modal section
    When I click the "Open Confirm Modal" button
    Then a modal should open with title "Confirm Action"
    And the modal message should contain "Are you sure"
    When I close the modal
    Then the modal should be closed

  Scenario: Page footer is visible
    Then the page footer should be visible
