import clsx from 'clsx';
import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

interface ArrowButtonProps {
	containerState: boolean;
	handler: OnClick;
}

export const ArrowButton = ({ containerState, handler }: ArrowButtonProps) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			onClick={handler}
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, {
				[styles.container_open]: containerState,
			})}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, {
					[styles.arrow_open]: containerState,
				})}
			/>
		</div>
	);
};
