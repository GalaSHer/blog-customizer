import clsx from 'clsx';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Separator } from '../separator';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	onFormSubmit: (formData: ArticleStateType) => void;
	onFormReset: (formData: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	onFormSubmit,
	onFormReset,
}: ArticleParamsFormProps) => {
	//состояние формы и ее параметров
	const [isOpened, setOpened] = useState(false);
	const [fontFamilyState, setFontFamilyState] = useState(fontFamilyOptions[0]);
	const [fontSizeState, setFontSizeState] = useState(fontSizeOptions[0]);
	const [fontColorState, setFontColorState] = useState(fontColors[0]);
	const [backgroundColorState, setBackgroundColor] = useState(
		backgroundColors[0]
	);
	const [contentWidthState, setContentWidth] = useState(contentWidthArr[0]);

	//обработчики событий
	const handleArrowBtnClick = () => {
		setOpened(!isOpened);
	};

	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isOpened,
		rootRef: rootRef,
		onChange: setOpened,
		onClose: () => setOpened(false),
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const customArticleState: ArticleStateType = {
			fontFamilyOption: fontFamilyState,
			fontColor: fontColorState,
			backgroundColor: backgroundColorState,
			contentWidth: contentWidthState,
			fontSizeOption: fontSizeState,
		};
		onFormSubmit(customArticleState);
	};

	const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFontFamilyState(defaultArticleState.fontFamilyOption);
		setFontSizeState(defaultArticleState.fontSizeOption);
		setFontColorState(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);

		onFormReset(defaultArticleState);
	};

	return (
		<div ref={rootRef}>
			<ArrowButton handler={handleArrowBtnClick} containerState={isOpened} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpened,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<h2 className={styles.title}>Задайте параметры</h2>
					<Select
						options={fontFamilyOptions}
						selected={fontFamilyState}
						onChange={setFontFamilyState}
						title='Шрифт'
					/>
					<RadioGroup
						selected={fontSizeState}
						name='radio'
						onChange={setFontSizeState}
						options={fontSizeOptions}
						title='размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={fontColorState}
						onChange={setFontColorState}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={backgroundColorState}
						onChange={setBackgroundColor}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={contentWidthState}
						onChange={setContentWidth}
						title='Ширина контента'
					/>
					<div style={{ height: '107px' }}></div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
