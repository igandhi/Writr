Template.storyPage.helpers({
	story: function() {
		res = Stories.findOne();
		Session.set('storyTitle', res.title);
		return res;
	},
	
	name: function (user) {
		console.log(user);
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

Template.storyPage.events({
	'click .vote': function() {
		if (!Meteor.user()) {
			IonModal.open('_loginModal');
			window.plugins.toast.showShortBottom('Please login to vote');
			return;
		}
		Meteor.call('upvote', this._id);
	},
	
	'click .share': function() {
		var message = {
			text: 'Check out my story "' + Session.get('storyTitle') + '" on Writr!'
		};
		console.log(message.text);
		console.log(Session.get('storyTitle'));
		window.socialmessage.send(message);	
	},
	
	'click .bigText': function() {
		var fontSize = $('.storyFont').css('font-size').split('px')[0];
		var fontInt = parseInt(fontSize) + 2;
		fontSize = fontInt + 'px';	
		if(fontInt < 25)
			$('.storyFont').css('font-size',fontSize);
		
	},
	
	'click .smallText': function() {
		var fontSize = $('.storyFont').css('font-size').split('px')[0];
		var fontInt = parseInt(fontSize) - 2;
		fontSize = fontInt + 'px';	
		if(fontInt > 12)
			$('.storyFont').css('font-size',fontSize);
		
	}
});