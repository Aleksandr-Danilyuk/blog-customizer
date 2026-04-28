import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

/* --------   Мои элементы ----------    --- */
import clsx from 'clsx';

import { Separator } from 'src/ui/separator';
import { Select } from 'src/ui/select';
import { useState } from 'react';

import * as articleProps from 'src/constants/articleProps';

/* --------  / Мои элементы ----------    --- */

import styles from './ArticleParamsForm.module.scss';



export const ArticleParamsForm = () => {
	const [backgroundColors, setBackgroundColors] = useState<articleProps.OptionType | null>(null); /* --------   описываем общие стейты и сеттеры к стейтам ----------    --- */
	const [formOpen, setFormOpen] = useState(false);
	/* const [containerStyles, setContainerStyles] = useState(styles.container);
/* --------   Мои элементы ----------   -placeholder = string ---  .container_open */

	return (
		<>
			<ArrowButton isOpen={formOpen} onClick={() => {
				setFormOpen(!formOpen);
			}} /> 
			<aside className={clsx(styles.container, {
				[styles.container_open]: formOpen // добавляем container_open, если formOpen === true
			})}> { /* <aside className={styles.container}> </aside> */}
				<form className={styles.form}>
					<Select 
						selected = {backgroundColors}
						options = {articleProps.backgroundColors}
						onChange = {setBackgroundColors}
						title = 'цвет фона изменить'
					/>
					<Separator />
					{/* --------  / Мои элементы ----------    --- */}
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
