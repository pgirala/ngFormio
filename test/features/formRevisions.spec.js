module.exports = function (actions,tags) {
  tags('smoke').describe('Form Versioning Test',function() {
    actions.logout();
    actions.iAmLoggedInFor('formVersioning');
    actions.userExistsWith('${random-name>formVersioning.name}','${random-email>formVersioning.email}','${random-password>formVersioning.password}');
    actions.goToPage('#/');
    actions.clickOnClass('#user-menu');
    actions.clickOnElementWithText(' Payment Info');
    actions.checkingUrlEndsWith('#/profile/payment/view');
    actions.clickOnElementWithText('Add Credit Card');
    actions.enterTextInField('#cardholderName','Test');
    actions.enterTextInField('#ccNumber','4111111111111111');
    actions.enterTextInField('#securityCode','411');
    actions.clickOnClass('#form-group-ccExpiryMonth');
    actions.clickOnElementWithText('01');
    actions.clickOnClass('#form-group-ccExpiryYear');
    actions.clickOnElementWithText('25');
    actions.clickOnClass('#submit');
    actions.waitForActionToComplete(2000);
    actions.goToPage('#/');
    actions.clickOnElementWithText('New Project');
    actions.enterTextInField('#title','formRevisionsProject');
    actions.clickOnElementWithText(' Create Project');
    actions.clickOnElementWithText('Trial');
    actions.upgradeToPlan("Enterprise");
    actions.clickOnButton(' Confirm Billing Change');
    actions.waitForActionToComplete(2000);
    actions.iSeeTextIn("a.project-plan.label-commercial","Enterprise");
    actions.clickOnElementWithText('Forms');
    actions.checkingUrlEndsWith('/form/');
    actions.clickOnElementWithText(' New Form');
    actions.clickOnElementWithText('API Web Form');
    actions.enterTextInField('#title','Test Form');
    actions.clickOnElementWithText('Create Form');
  // actions.clickOnClass('.toast-message');
    actions.clickOnElementWithText(' Revisions');
    actions.clickOnElementWithText('Disabled');
    actions.iSeeText('Enabled - Use current form version when viewing submissions.');
    actions.iSeeText('Enabled - Use original form version when viewing submissions.');
    actions.clickOnElementWithText('Enabled - Use current form version when viewing submissions.');
  // actions.clickOnClass('.toast-message');
    actions.clickOnElementWithText(' Edit');
    actions.iSeeText('Save Draft');
    actions.iSeeText('Publish');
    actions.iDonotSeeText('Save Form');
    actions.clickOnElementWithText(' Revisions');
    actions.clickOnElementWithText('Enabled - Use current form version when viewing submissions.');
    actions.clickOnElementWithText('Disabled');
  // actions.clickOnClass('.toast-message');
    actions.clickOnElementWithText(' Edit');
    actions.iDonotSeeText('Save Draft');
    actions.iDonotSeeText('Publish');
    actions.iSeeText('Save Form');
    actions.clickOnElementWithText(' Revisions');
    actions.clickOnElementWithText('Disabled');
    actions.iSeeText('Enabled - Use current form version when viewing submissions.');
    actions.iSeeText('Enabled - Use original form version when viewing submissions.');
    actions.clickOnElementWithText('Enabled - Use current form version when viewing submissions.');
  // actions.clickOnClass('.toast-message');
    actions.clickOnElementWithText(' Edit');
    actions.dragTo('HTML Element', 'formarea');
    actions.iSeeText('HTML Element Component');
    actions.enterTextInFieldIndex('#content',1, 'Version 0');
    actions.clickOnElementWithText('Save');
    actions.waitForActionToComplete(1000);
    actions.dragTo('Text Field', 'formarea');
    actions.iSeeText('Text Field Component');
    actions.enterTextInField('#label', 'Field A');
    actions.clickOnElementWithText('Save');
    actions.waitForActionToComplete(1000);
    actions.enterTextInField('xpath://*[@id="form-group-note"]/textarea','Test Note Version 0');
    actions.clickSave('Publish');
  // actions.clickOnClass('.toast-message');
    actions.clickOnElementWithText(' Revisions');
    actions.clickOnElementWithText('1');
    actions.switchTab();
    actions.iSeeText('form');
    actions.closeWindow();
    actions.iSeeText('${formVersioning.name}')
    actions.iSeeText('Test Note Version 0');
    actions.clickOnElementWithText('Use');
    actions.iSeeText('Version 0');
    actions.iSeeText('Field A ');
    actions.enterTextInField('#fieldA','Test Submission');
    actions.clickOnButton('Submit');
  // actions.clickOnClass('.toast-message');
    actions.clickOnElementWithText(' Revisions');
    actions.clickOnElementWithTextIndex('Use',1);
    actions.iDonotSeeText('Version 0');
    actions.iDonotSeeText('Field A ');
    actions.clickOnElementWithText(' Revisions');
    actions.clickOnElementWithTextIndex('Use',2);
    actions.iDonotSeeText('Version 0');
    actions.iDonotSeeText('Field A ');
    actions.clickOnElementWithText(' Revisions');
    actions.clickOnElementWithTextIndex('Data',1);
    actions.iSeeText('1 - 1 of 1 items');
    actions.clickOnElementWithText(' Revisions');
    actions.clickOnElementWithTextIndex('Data',2);
    actions.iDonotSeeText('Test Submission');
    actions.clickOnElementWithText(' Revisions');
    actions.clickOnElementWithTextIndex('Data',3);
    actions.iDonotSeeText('Test Submission');
    actions.clickOnElementWithText(' Revisions');
    actions.clickOnElementWithText('Restore');
    actions.iSeeText('Version 0');
    actions.iSeeText('Field A ');
    actions.clickOnElementWithText(' Revisions');
    actions.clickOnButton('Cancel Changes');
    actions.clickOnElementWithTextIndex('Restore',1);
    actions.iDonotSeeText('Version 0');
    actions.iDonotSeeText('Field A ');
    actions.clickOnElementWithText(' Revisions');
    actions.clickOnButton('Cancel Changes');
    actions.clickOnElementWithTextIndex('Restore',2);
    actions.iDonotSeeText('Version 0');
    actions.iDonotSeeText('Field A ');

    actions.clickOnElementWithText(' Revisions');
    actions.clickOnButton('Cancel Changes');
    actions.clickOnElementWithText('Restore');
    actions.iSeeText('Version 0');
    actions.iSeeText('Field A ');

    actions.dragTo('HTML Element', 'formarea');
    actions.iSeeText('HTML Element Component');
    actions.enterTextInFieldIndex('#content',1, 'Version 1');
    actions.clickOnElementWithText('Save');
    actions.waitForActionToComplete(1000);
    actions.dragTo('Text Field', 'formarea');
    actions.iSeeText('Text Field Component');
    actions.enterTextInField('#label', 'Field A1');
    actions.clickOnElementWithText('Save');
    actions.waitForActionToComplete(1000);
    actions.enterTextInField('xpath://*[@id="form-group-note"]/textarea','Test Note Version 1');
    actions.clickSave('Publish');
  // actions.clickOnClass('.toast-message');
    actions.clickOnElementWithText(' Revisions');
    actions.iSeeText('4');
    actions.iSeeText('Test Note Version 0');
    actions.iSeeText('Test Note Version 1');
    actions.clickOnElementWithText('Use');
    actions.iSeeText('Version 0');
    actions.iSeeText('Field A ');
    actions.iSeeText('Version 1');
    actions.iSeeText('Field A1 ');
    actions.clickOnElementWithText(' Revisions');
    actions.clickOnElementWithTextIndex('Use',1);
    actions.iDonotSeeText('Version 1');
    actions.iDonotSeeText('Field A1 ');
    actions.clickOnElementWithText(' Revisions');
    actions.clickOnElementWithText(' Use');
    actions.iSeeText('Version 0');
    actions.iSeeText('Field A ');
    actions.iSeeText('Version 1');
    actions.iSeeText('Field A1 ');


    actions.clickOnElementWithText(' Edit');
    actions.dragTo('HTML Element', 'formarea');
    actions.iSeeText('HTML Element Component');
    actions.enterTextInFieldIndex('#content',1, 'Version 2');
    actions.clickOnElementWithText('Save');
    actions.waitForActionToComplete(1000);
    actions.dragTo('Text Field', 'formarea');
    actions.iSeeText('Text Field Component');
    actions.enterTextInField('#label', 'Field A2');
    actions.clickOnElementWithText('Save');
    actions.waitForActionToComplete(1000);
    actions.dragTo('Number', 'formarea');
    actions.iSeeText('Number Component');
    actions.enterTextInField('#label', 'Number 2');
    actions.clickOnElementWithText('Save');
    actions.waitForActionToComplete(1000);
    actions.enterTextInField('xpath://*[@id="form-group-note"]/textarea','Test Note Version 2');
    actions.clickSave('Publish');
  // actions.clickOnClass('.toast-message');
    actions.clickOnElementWithText(' Revisions');
    actions.iSeeText('5');

    actions.iSeeText('Test Note Version 0');
    actions.iSeeText('Test Note Version 1');
    actions.iSeeText('Test Note Version 2');
    actions.clickOnElementWithText('Use');
    actions.iSeeText('Version 0');
    actions.iSeeText('Field A ');
    actions.iSeeText('Version 1');
    actions.iSeeText('Field A1 ');
    actions.iSeeText('Version 2');
    actions.iSeeText('Field A2 ');
    actions.iSeeText('Number 2 ');
    actions.clickOnElementWithText(' Revisions');
    actions.clickOnElementWithTextIndex('Use',1);
    actions.iDonotSeeText('Version 2');
    actions.iDonotSeeText('Field A2 ');
    actions.iDonotSeeText('Number 2 ');
    actions.iSeeText('Version 0');
    actions.iSeeText('Field A ');
    actions.iSeeText('Version 1');
    actions.iSeeText('Field A1 ');
    actions.clickOnElementWithText(' Revisions');
    actions.clickOnElementWithTextIndex('Use',2);
    actions.iDonotSeeText('Version 2');
    actions.iDonotSeeText('Field A2 ');
    actions.iDonotSeeText('Number 2 ');
    actions.iSeeText('Version 0');
    actions.iSeeText('Field A ');
    actions.iDonotSeeText('Version 1');
    actions.iDonotSeeText('Field A1 ');
    actions.clickOnElementWithText(' Revisions');
    actions.clickOnElementWithText(' Use');
    actions.iSeeText('Version 0');
    actions.iSeeText('Field A ');
    actions.iSeeText('Version 1');
    actions.iSeeText('Field A1 ');
    actions.iSeeText('Version 2');
    actions.iSeeText('Field A2 ');
    actions.iSeeText('Number 2 ');

    actions.clickOnElementWithText(' Revisions');
    actions.clickOnElementWithTextIndex('Restore',2);
    actions.iSeeText('Version 0');
    actions.iSeeText('Field A ');
    actions.clickSave('Publish');
  // actions.clickOnClass('.toast-message');
    actions.clickOnElementWithText(' Use');
    actions.iDonotSeeText('Version 2');
    actions.iDonotSeeText('Field A2 ');
    actions.iDonotSeeText('Number 2 ');
    actions.iSeeText('Version 0');
    actions.iSeeText('Field A ');
    actions.iDonotSeeText('Version 1');
    actions.iDonotSeeText('Field A1 ');
    actions.clickOnElementWithText(' Revisions');
    actions.iSeeText('5');
    actions.clickOnElementWithTextIndex('Use',2);
    actions.iSeeText('Version 0');
    actions.iSeeText('Field A ');
    actions.iSeeText('Version 1');
    actions.iSeeText('Field A1 ');
    actions.enterTextInField('#fieldA','Test 1');
    actions.enterTextInField('#fieldA1','Test 2');
    actions.clickOnButton('Submit');
  // actions.clickOnClass('.toast-message');
    actions.iSeeText('Version 0');
    actions.iSeeText('Field A ');
    actions.iDonotSeeText('Version 1');
    actions.iDonotSeeText('Field A1 ');
    actions.clickOnElementWithText(' Revisions');
    actions.clickOnElementWithTextIndex('Data',3);
    actions.iSeeText('Field A');
    actions.iDonotSeeText('Field A1');
    actions.clickOnElementWithText(' Revisions');
    actions.clickOnElementWithTextIndex('Use',1);
    actions.enterTextInField('#fieldA','Test 2.1');
    actions.enterTextInField('#fieldA1','Test 2.2');
    actions.enterTextInField('#fieldA2','Test 2.3');
    actions.enterTextInField('#number2','2');
    actions.clickOnButton('Submit');
  // actions.clickOnClass('.toast-message');
    actions.iDonotSeeText('Version 2');
    actions.iDonotSeeText('Field A2 ');
    actions.iDonotSeeText('Number 2 ');
    actions.iSeeText('Version 0');
    actions.iSeeText('Field A ');
    actions.iDonotSeeText('Version 1');
    actions.iDonotSeeText('Field A1 ');
    actions.clickOnElementWithText(' Revisions');
    actions.clickOnElementWithTextIndex('Data',2);
    actions.iSeeText('Field A');
    actions.iDonotSeeText('Field A1');
    actions.iDonotSeeText('Field A2');
    actions.iDonotSeeText('Number 2');
    actions.clickOnElementWithText(' Revisions');
    actions.clickOnElementWithText(' Data');
    actions.iSeeText('Test 2.1');
    actions.iSeeText('Test 1');
    actions.iSeeText('Test Submission');
    actions.clickOnElementWithText(' Revisions');
    actions.clickOnElementWithText('Restore');
    actions.iSeeText('Version 0');
    actions.iSeeText('Field A ');
    actions.dragTo('Password', 'formarea');
    actions.iSeeText('Password Component');
    actions.enterTextInField('#label', 'Draft Password');
    actions.clickOnElementWithText('Save');
    actions.waitForActionToComplete(1000);
    actions.enterTextInField('xpath://*[@id="form-group-note"]/textarea','Draft Version');
    actions.clickSave('Save Draft');
  // actions.clickOnClass('.toast-message');
    actions.clickOnElementWithText(' Revisions');
    actions.clickOnButton('Cancel Changes');
    actions.iSeeText('draft');
    actions.iSeeText('Draft Version');
    actions.clickOnElementWithText(' Edit');
    actions.iSeeText('Version 0');
    actions.iSeeText('Field A ');
    actions.clickSave('Publish');
  // actions.clickOnClass('.toast-message');
    actions.clickOnElementWithText(' Revisions');
    actions.clickOnElementWithText(' Edit');
    actions.iSeeText('Version 0');
    actions.iSeeText('Field A ');
    actions.clickSave('Publish');
  // actions.clickOnClass('.toast-message');
    actions.clickOnElementWithText(' Revisions');
    actions.iSeeText('7');
    actions.iDonotSeeText('draft');
    actions.clickOnElementWithText(' Use');
    actions.iSeeText('Version 0');
    actions.iSeeText('Field A ');
    actions.iSeeText('Draft Password ');
  });
}