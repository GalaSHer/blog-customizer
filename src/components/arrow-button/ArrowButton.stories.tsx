import type { Meta, StoryObj } from '@storybook/react';

import { ArrowButton } from './ArrowButton';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

function handler() {
	console.log('click');
}

export const ArrowButtonStory: Story = {
	render: () => {
		return (
			<>
				<ArrowButton containerState={false} handler={handler} />
			</>
		);
	},
};
