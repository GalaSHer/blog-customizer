import clsx from 'clsx';
import { CSSProperties, useState } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import 'src/styles/index.scss';
import styles from 'src/styles/index.module.scss';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { Article } from '../article/Article';

export const App = () => {
	const [styleState, setStyleState] = useState(defaultArticleState);

	const handleStyleState = (articleStateObject: ArticleStateType) => {
		setStyleState(articleStateObject);
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': styleState.fontFamilyOption.value,
					'--font-size': styleState.fontSizeOption.value,
					'--font-color': styleState.fontColor.value,
					'--container-width': styleState.contentWidth.value,
					'--bg-color': styleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm handleFormData={handleStyleState} />
			<Article />
		</div>
	);
};
