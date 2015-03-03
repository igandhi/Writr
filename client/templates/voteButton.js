Template.voteButton.events({
  'click': function (event, template) {
    event.preventDefault();

    if (!Meteor.user()) {
    	IonModal.open('_loginModal');
		window.plugins.toast.showShortBottom('Please login to vote');
		return;
    }
    Meteor.call('upvote', this._id);
  }
});