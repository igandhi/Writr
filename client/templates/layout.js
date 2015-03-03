Template.layout.events({
	'submit .new-title': function(event) {
		var text = event.target.text.value;
		Meteor.call('addStory', text);
		event.target.text.value = "";
		
		return false;
	},
	
	'click [data-action=logout]': function () {
    	AccountsTemplates.logout();
  	}
});

Template.layout.helpers({
	name: function (user) {
      var name = '';
      if (user && user.profile && user.profile.name) {
        name = user.profile.name;
      }
      else if (user && user.username) {
        name = user.username;
      }
      return name;
    }
});

Template.layout.rendered = function () {
    IonSideMenu.snapper.settings({disable: 'right'});
};