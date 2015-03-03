// Collection of all stories
Stories = new Mongo.Collection('stories');
// Collection of all contributions to stories
Addendums = new Mongo.Collection('addendums');

Stories.helpers({
	author: function() {
		return Meteor.users.findOne({_id: this.userId});
	},
	
	dateCreated: function () {
    	return moment(this.createdAt).format('MMM Do YYYY hh:mm A');
	},
	
	dateCreatedFromNow: function() {
		return moment(this.createdAt).fromNow();	
	},
	
	lastEditedTime: function() {
		return moment(this.lastEditedAt).fromNow();	
	},
	
	lastEditedAuthor: function() {
		return Meteor.users.findOne({_username: this.lastEditedBy});
	},
});

Addendums.helpers({
	story: function() {
		return Stories.findOne({_id: this.storyId});
	},
	
	dateLastEdited: function () {
    	return moment(this.createdAt).format('MMM Do YYYY hh:mm A');
	}
});

Meteor.users.helpers({
	dateJoined: function() {
		return moment(this.createdAt).format('MMM Do YYYY');
	}
});

storySchema = new SimpleSchema({
	title: {
		type: String,
		max: 40
	},
	summary: {
		type: String,
		max: 40
	},
	text: {
		type: String,
		optional: true
	},
	createdAt: {
		type: Date,
		optional: true
	},
	userId: {
		type: String,
		optional: true
	},
	username: {
		type: String,
		optional: true
	},
	lastEditedBy: {
		type: String,
		optional: true
	},
	lastEditedAt: {
		type: Date,
		optional: true
	},
	upvoters: {
		type: [String],
		optional: true
	},
	votes: {
		type: Number,
		optional: true
	}
});

Meteor.methods({
	addStory: function(doc) {
		// make sure user is logged in before adding new story
		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}
		
		Stories.insert({
			title: doc.title,
			summary: doc.summary,
			text: "",
			createdAt: new Date(),
			userId: Meteor.userId(),
//			username: Meteor.user().username,
			username: function (user) {
				var name = '';
				if (user && user.profile && user.profile.name) {
					name = user.profile.name;
				} else if (user && user.username) {
					name = user.username;
				}
				return name;
			}(Meteor.user()),
			lastEditedBy: "",
			lastEditedAt: "",
			upvoters: [],
			votes: 0
		}, function(err, doc) {
			if (Meteor.isClient) {
				if (err) {
					window.plugins.toast.showShortBottom('Unable to create story. Please try again.');
				} else {
					IonPopover.hide();
					Router.go('storyPage', {_id: doc});
				}
			}
		});
	},
	
	appendStory: function(id, newText) {
		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}
		
		var storyObj = Stories.findOne(id);
		Stories.update(
			id,
			{$set: 
				{
					text: storyObj.text + newText,
					lastEditedBy: function (user) {
						var name = '';
						if (user && user.profile && user.profile.name) {
							name = user.profile.name;
						} else if (user && user.username) {
							name = user.username;
						}
						return name;
					}(Meteor.user()),
					lastEditedAt: new Date()
			 	}
			}
		);
	},
	
	newAddendum: function(storyId, text) {
		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}
		
		Addendums.insert({
			storyId: storyId,
			userId: Meteor.userId(),
			username: function (user) {
				var name = '';
				if (user && user.profile && user.profile.name) {
					name = user.profile.name;
				} else if (user && user.username) {
					name = user.username;
				}
				return name;
			}(Meteor.user()),
			createdAt: new Date(),
			text: text
		});
	},
	
	upvote: function(id) {
		var success = Stories.update({
			_id: id,
			upvoters: {$ne: this.userId}
		}, {
			$addToSet: {upvoters: this.userId},
			$inc: {votes: 1}
		});
		
		if (! success) {
			if (Meteor.isClient) {
				window.plugins.toast.showShortBottom('You have already upvoted this story');
			}
		}
	},
	
	totalUsers: function() {
		return Stories.find().count();
	}
});

