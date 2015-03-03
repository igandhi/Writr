Template.userProfile.helpers({
	userStories: function(user) {
		return Stories.find({userId: user._id});
	},
	
	count: function(user) {
		return Stories.find({userId: user._id}).count();
	},
	
	userAddendums: function() {
		return Addendums.find();
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