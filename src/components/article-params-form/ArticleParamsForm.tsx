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
	OptionType,
} from 'src/constants/articleProps';
import { Separator } from '../separator';
import { useOutsideClickClose } from '../hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	handleFormData: (formData: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	handleFormData,
}: ArticleParamsFormProps) => {
	//состояние формы
	const [isOpened, setOpened] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);

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

	const handleOnChange = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setFormState((prevState) => ({ ...prevState, [field]: value }));
		};
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const customArticleState: ArticleStateType = {
			fontFamilyOption: formState.fontFamilyOption,
			fontColor: formState.fontColor,
			backgroundColor: formState.backgroundColor,
			contentWidth: formState.contentWidth,
			fontSizeOption: formState.fontSizeOption,
		};
		handleFormData(customArticleState);
	};

	const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		handleFormData(defaultArticleState);
	};

	return (
		<>
			<ArrowButton handler={handleArrowBtnClick} containerState={isOpened} />
			<aside
				ref={rootRef}
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
						selected={formState.fontFamilyOption}
						onChange={handleOnChange('fontFamilyOption')}
						title={'Шрифт'}
					/>
					<RadioGroup
						selected={formState.fontSizeOption}
						name='radio'
						onChange={handleOnChange('fontSizeOption')}
						options={fontSizeOptions}
						title={'размер шрифта'}
					/>
					<Select
						options={fontColors}
						selected={formState.fontColor}
						onChange={handleOnChange('fontColor')}
						title={'Цвет шрифта'}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={handleOnChange('backgroundColor')}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={handleOnChange('contentWidth')}
						title='Ширина контента'
					/>
					<div style={{ height: '107px' }}></div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
