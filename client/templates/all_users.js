Template.allUsers.helpers({
	users: function() {
		return Meteor.users.find({}, {'sort': {'createdAt': 1}});
	},
	
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