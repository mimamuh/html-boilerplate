/* eslint-disable compat/compat */
module.exports = {
	prompt: ({ inquirer, args }) => {
		const questions = [];

		if (typeof args.category !== 'string') {
			questions.push({
				type: 'input',
				name: 'category',
				message: "What's the category?",
			});
		}

		if (typeof args.name !== 'string') {
			questions.push({
				type: 'input',
				name: 'name',
				message: "What's name?",
			});
		}

		questions.push({
			type: 'confirm',
			name: 'withJS',
			message: 'With .js file?',
			default: false,
		});

		if (questions.length === 0) {
			return Promise.resolve({ allow: true });
		}
		return inquirer.prompt(questions);
	},
};
