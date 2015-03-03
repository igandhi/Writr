AutoForm.addHooks('_newStoryModal', {
	onSuccess: function() {
		IonModal.close()
	}
}, true);

Template._newStoryModal.helpers({
	storySchema: function() {
		return storySchema;
	}
});