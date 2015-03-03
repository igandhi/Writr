AccountsTemplates.removeField('email');
var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.addFields([
	{
	
		_id: 'email',
		type: 'email',
		required: true,
		displayName: 'email',
		re: /.+@(.+){2,}\.(.+){2,}/,
      	errStr: 'Invalid email',
	},
	{
		_id: 'username',
		type: 'text',
		displayName: 'username',
		required: true,
		minLength: 5,
	}
]);

AccountsTemplates.addField(pwd);

AccountsTemplates.configure({
	negativeValidation: false,
	negativeFeedback: false,
	positiveValidation: false,
	positiveFeedback: false,
	onSubmitHook: function(error, state) {
		if (error) {
			console.log(error);
		} else {
			IonModal.close();
		}
	}
});

AccountsTemplates.configureRoute('signIn', {
	redirect: function() {
		if (Meteor.user()) {
			Router.go('/');
		}
	}
});

Avatar.options = {
	fallbackType: 'initials'
};

Meteor.Spinner.options = {
	color: '#3fb396'
};