//TODO: fix permissions
Stories.permit(['insert', 'update', 'remove']).never().apply();

Meteor.publish('allStories', function() {
	return Stories.find({});
});

Meteor.publish('myStories', function() {
	return Stories.find({
		userId: this.userId
	});
});

Meteor.publish('userData', function () {
    return Meteor.users.find({_id: this.userId},
        {fields: {'services': 1}});
});

Meteor.publish('allUsers', function() {
	return Meteor.users.find();
});

Meteor.publish('userProfile', function(userId) {
	return Meteor.users.find({_id: userId});
});

Meteor.publishComposite('singleStory', function(id) {
	return {
		find: function() {
			return Stories.find({_id: id});
		},
		children: [
			{
				find: function(story) {
					return Meteor.users.find({_id: story.userId});
				}
			}
		]
	};
});

Meteor.publish('storyAddendums', function(id) {
	return Addendums.find({storyId: id});
});

Meteor.publish('userStories', function(id) {
	return Stories.find({userId: id});
});

Meteor.publishComposite('userAddendums', function(id) {
	return {
		find: function() {
			return Addendums.find({userId: id});
		},
		children: [
			{
				find: function(addendum) {
					return Stories.find({_id: addendum.storyId});
				}
			}
		]
	};
});