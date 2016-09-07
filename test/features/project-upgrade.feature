Feature: Project Upgrade Functionality

  Scenario: Enter payment information
    Given I am logged in for upgradeUser
    And A project exists with the ${random-title>upgradeProject.title} and ${random-description>upgradeProject.description}
    And I am on the ${upgradeProject.title} project overview page
    When I click the Upgrade Project link
    Then I see the .project-upgrade-dialog modal
    And the Submit button is disabled
    When I enter Test Person in the #cardholderName field
    And I enter 4111111111111111 in the #ccNumber field
    And I select 02 in #ccExpiryMonth
    And I select 25 in #ccExpiryYear
    And I enter 123 in the #securityCode field
    When I click the Submit button
    Then I see Visa ending in 1111

  Scenario: Defaults to Team Pro
    Given I am logged in for upgradeUser
    And I am on the ${upgradeProject.title} project overview page
    When I click the Upgrade Project link
    Then I see Team Pro

  Scenario: Upgrades to Independent
    Given I am logged in for upgradeUser
    And I am on the ${upgradeProject.title} project overview page
    When I click the Upgrade Project link
    And I select Independent Plan in #ngdialog1-aria-labelledby
    And I click the Change plan to Independent button
    Then I see #project-plan-display with the text Independent

  Scenario: Upgrades to Team Pro
    Given I am logged in for upgradeUser
    And I am on the ${upgradeProject.title} project overview page
    When I click the Upgrade Project link
    And I select Team Pro Plan in #ngdialog1-aria-labelledby
    And I click the Change plan to Team Pro button
    Then I see #project-plan-display with the text Team Pro

  Scenario: Upgrades to Commercial
    Given I am logged in for upgradeUser
    And I am on the ${upgradeProject.title} project overview page
    When I click the Upgrade Project link
    And I select Commercial Plan in #ngdialog1-aria-labelledby
    And I click the Change plan to Commercial button
    Then I see #project-plan-display with the text Commercial

  Scenario: Downgrades to Team Pro
    Given I am logged in for upgradeUser
    And I am on the ${upgradeProject.title} project overview page
    When I click the Upgrade Project link
    And I select Team Pro Plan in #ngdialog1-aria-labelledby
    And I click the Change plan to Team Pro button
    Then I see #project-plan-display with the text Team Pro

  Scenario: Downgrades to Independent
    Given I am logged in for upgradeUser
    And I am on the ${upgradeProject.title} project overview page
    When I click the Upgrade Project link
    And I select Independent Plan in #ngdialog1-aria-labelledby
    And I click the Change plan to Independent button
    Then I see #project-plan-display with the text Independent

  Scenario: Downgrades to Basic
    Given I am logged in for upgradeUser
    And I am on the ${upgradeProject.title} project overview page
    When I click the Upgrade Project link
    And I select Basic Plan in #ngdialog1-aria-labelledby
    And I click the Change plan to Basic button
    Then I see #project-plan-display with the text Basic
