Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading'
});

Router.route('/', {
	name: 'allStories',
	waitOn: function() {
		return [Meteor.subscribe('allStories'),
			   Meteor.subscribe('userData')];
	}
});

Router.route('/myStories', {
	name: 'myStories',
	waitOn: function() {
		return [Meteor.subscribe('myStories')];	
	}
});

Router.route('/story/:_id', {
	name: 'storyPage',
	waitOn: function() {
		return [Meteor.subscribe('singleStory', this.params._id),
			   Meteor.subscribe('storyAddendums', this.params._id)];
	}
});

Router.route('/user/:_id', {
	name: 'userProfile',
	waitOn: function() {
		return [Meteor.subscribe('userStories', this.params._id),
			   Meteor.subscribe('userAddendums', this.params._id),
			   Meteor.subscribe('userProfile', this.params._id)];
	},
	data: function() {
		return {
			user: Meteor.users.findOne({_id: this.params._id})
		}
	}
});

Router.route('/aboutUs', {
	name: 'aboutUs'
});

Router.route('/allUsers', {
	name: 'allUsers',
	waitOn: function() {
		return [Meteor.subscribe('allUsers')];
	}
});