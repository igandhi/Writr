Session.setDefault('sort', 'Date');

Template.myStories.helpers({
	stories : function() {
		return Stories.find({}, {"sort": [[Session.get('sort'), 'desc']]});
	}
});