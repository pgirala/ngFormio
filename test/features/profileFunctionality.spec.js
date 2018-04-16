module.exports = function (actions) {
  describe('User Profile Functionality',function(){
    describe('Profile navigation',function(){
      actions.logout();
      actions.iAmLoggedInFor('profileuser1');
      actions.goToPage('#/');
      actions.clickOnElement('#user-menu');
      actions.clickOnElementWithText(' Profile');
      actions.checkingUrlIamOn("#/profile/view");
      actions.iSeeText("User Profile");
      actions.iSeeValueIn("#profile-username","Username: ${profileuser1.name}");
      actions.iSeeValueIn("#profile-email","Email: ${profileuser1.email}");
      actions.clickOnElementWithText('Edit');
      actions.checkingUrlIamOn("#/profile/edit");
      actions.enterTextInField('#fullName','Test');
      actions.clickOnElementWithText('Submit');
      actions.checkingUrlIamOn("#/profile/edit");
      actions.iSeeValueIn('#fullName','Test');
      actions.enterTextInField('#name','${random-name>profileuser1.name}');
      actions.clickOnElementWithText('Submit');
      actions.checkingUrlIamOn("#/profile/edit");
      actions.iSeeValueIn('#name','${profileuser1.name}');
      actions.iSeeValueIn('#user-menu','${profileuser1.name}');
      actions.enterTextInField('#email','${random-email>profileuser1.email}');
      actions.clickOnElementWithText('Submit');
      actions.checkingUrlIamOn("#/profile/edit");
      actions.iSeeValueIn('#email','${profileuser1.email}');
      actions.enterTextInField('#password','password');
      actions.clickOnElementWithText('Submit');
      actions.checkingUrlIamOn("#/profile/edit");
      actions.iSeeValueIn('#password','password');
      actions.logout();
      actions.enterTextInField('.login-container #email', '${profileuser1.email}');
      actions.enterTextInField('.login-container #password', 'password');
      actions.clickOnElementWithText('LOG IN');
      actions.logout();
    });
  });
};
