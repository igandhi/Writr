Template._profileHeader.helpers({
	
	count: function(user) {
		return Stories.find({userId: user._id}).count();
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