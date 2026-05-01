import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import clsx from 'clsx';

import { Separator } from 'src/ui/separator';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';

import { useState } from 'react';

import * as articleProps from 'src/constants/articleProps';


import styles from './ArticleParamsForm.module.scss';

type Params = {
	'--font-family': articleProps.OptionType;
	'--font-size': articleProps.OptionType;
	'--font-color': articleProps.OptionType;
	'--container-width': articleProps.OptionType;
	'--bg-color': articleProps.OptionType;
};

export const ArticleParamsForm = ({
	currentParams,
	onParamsChange,
	onSubmit,
}: {
	currentParams: Params;
	onParamsChange: (params: Params) => void;
	onSubmit: () => void;
}) => {
	const [formOpen, setFormOpen] = useState(false);

	const updateParam = (key: keyof Params, value: articleProps.OptionType) => {
		const newParams = { ...currentParams, [key]: value };
		onParamsChange(newParams);
	};
	/*
	const [backgroundColors, setBackgroundColors] = useState<articleProps.OptionType>(articleProps.defaultArticleState.backgroundColor); 
	const [contentWidthArr, setСontentWidthArr] = useState<articleProps.OptionType>(articleProps.defaultArticleState.contentWidth);
	const [fontFamilyOptions, setFontFamilyOptions] = useState<articleProps.OptionType>(articleProps.defaultArticleState.fontFamilyOption);
	const [fontColors, setFontColors] = useState<articleProps.OptionType>(articleProps.defaultArticleState.fontColor);
	const [optionType, setOptionType] = useState<articleProps.OptionType>(articleProps.defaultArticleState.fontSizeOption);
	
	const [formOpen, setFormOpen] = useState(false);

	const [extStyle, setExtStyle] = useState({currentParams});
	setExtStyle({			
			'--font-family': fontFamilyOptions,
			'--font-size': optionType,
			'--font-color': fontColors,
			'--container-width': contentWidthArr,
			'--bg-color': backgroundColors});
*/
	/* const [containerStyles, setContainerStyles] = useState(styles.container);
/* --------   Мои элементы ----------   -placeholder = string ---  .container_open */
	const handleReset = () => {
		const defaultParams = {
			'--font-family': articleProps.defaultArticleState.fontFamilyOption,
			'--font-size': articleProps.defaultArticleState.fontSizeOption,
			'--font-color': articleProps.defaultArticleState.fontColor,
			'--container-width': articleProps.defaultArticleState.contentWidth,
			'--bg-color': articleProps.defaultArticleState.backgroundColor,
		};
		onParamsChange(defaultParams);
	};

	return (
		<>
			<ArrowButton
				isOpen={formOpen}
				onClick={() => {
					setFormOpen(!formOpen);
				}}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: formOpen, // добавляем container_open, если formOpen === true
				})}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						onSubmit();
					}}>
					<h2
						style={{
							fontFamily: 'Open Sans',
							fontSize: '30px',
							fontWeight: 800,
							textTransform: 'uppercase',
						}}>
						задайте параметры
					</h2>
					<Select
						selected={currentParams['--font-family']}
						options={articleProps.fontFamilyOptions}
						onChange={(optionType) => updateParam('--font-family', optionType)}
						title='шрифт'
					/>
					<RadioGroup
						name={''}
						options={articleProps.fontSizeOptions}
						selected={currentParams['--font-size']}
						onChange={(optionType) => updateParam('--font-size', optionType)}
						title='размер шрифта'
					/>
					<Select
						selected={currentParams['--font-color']}
						options={articleProps.fontColors}
						onChange={(optionType) => updateParam('--font-color', optionType)}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={currentParams['--bg-color']}
						options={articleProps.backgroundColors}
						onChange={(optionType) => updateParam('--bg-color', optionType)}
						title='цвет фона'
					/>
					<Select
						selected={currentParams['--container-width']}
						options={articleProps.contentWidthArr}
						onChange={(optionType) =>
							updateParam('--container-width', optionType)
						}
						title='ширина контента'
					/>
					{/* 
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
					/>*/}
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
