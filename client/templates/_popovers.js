Template._storyPopover.events({
	'click .sort': function() {
		if (Session.equals('sort', 'createdAt')) {
			Session.set('sort', 'votes');
		} else {
			Session.set('sort', 'createdAt');
		}
	}
});