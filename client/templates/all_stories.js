Session.setDefault('sort', 'createdAt');

Meteor.call('totalUsers', function(err, res) {
	Session.set('totalUsers', res);
});
			
Template.allStories.helpers({
	stories : function() {
		return Stories.find({}, {"sort": [[Session.get('sort'), 'desc']]});
	}
});