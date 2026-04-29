import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

/* --------   Мои элементы ----------    --- */
import clsx from 'clsx';

import { Separator } from 'src/ui/separator';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';

import { useState } from 'react';

import * as articleProps from 'src/constants/articleProps';

/* --------  / Мои элементы ----------    --- */

import styles from './ArticleParamsForm.module.scss';



export const ArticleParamsForm = () => {
	const [backgroundColors, setBackgroundColors] = useState<articleProps.OptionType>(articleProps.defaultArticleState.backgroundColor); /* -----   описываем общие стейты и сеттеры к стейтам ------ */
	const [contentWidthArr, setСontentWidthArr] = useState<articleProps.OptionType>(articleProps.defaultArticleState.contentWidth);
	const [fontFamilyOptions, setFontFamilyOptions] = useState<articleProps.OptionType>(articleProps.defaultArticleState.fontFamilyOption);
	const [fontColors, setFontColors] = useState<articleProps.OptionType>(articleProps.defaultArticleState.fontColor);
	const [optionType, setOptionType] = useState<articleProps.OptionType>(articleProps.defaultArticleState.fontSizeOption);
	
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
					<h2 style={{fontFamily: 'Open Sans', fontSize: '30px', fontWeight: 800, textTransform: 'uppercase', }}>задайте параметры</h2>
					<Select 
						selected = {fontFamilyOptions}
						options = {articleProps.fontFamilyOptions}
						onChange = {setFontFamilyOptions}
						title = 'шрифт'
					/>
					<RadioGroup
						name = {""}
						options = {articleProps.fontSizeOptions}
						selected = {optionType}
						onChange = {setOptionType}
						title = 'размер шрифта'
					/>
					<Select 
						selected = {fontColors}
						options = {articleProps.fontColors}
						onChange = {setFontColors}
						title = 'цвет шрифта'
					/>
					<Separator />
					<Select 
						selected = {backgroundColors}
						options = {articleProps.backgroundColors}
						onChange = {setBackgroundColors}
						title = 'цвет фона'
					/>
					<Select 
						selected = {contentWidthArr}
						options = {articleProps.contentWidthArr}
						onChange = {setСontentWidthArr}
						title = 'ширина контента'
					/>
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
