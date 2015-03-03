Template.layout.events({
	'submit .story-append': function(event) {
		var text = event.target.text.value.trim();
		
		if (text.charAt(text.length-1) === '.') {
			text = ' ' + text.charAt(0).toUpperCase() + text.substring(1);
			Meteor.call('appendStory', this._id, text);
			Meteor.call('newAddendum', this._id, text);
			event.target.text.value = "";
		} else {
			window.plugins.toast.showShortBottom('Text must end in a period (.)');
		}

		return false;
	}
});