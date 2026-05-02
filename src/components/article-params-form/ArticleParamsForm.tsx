import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import clsx from 'clsx';

import { Separator } from 'src/ui/separator';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';

import { useState, useEffect, useRef } from 'react';
//import { AppStyles } from '../app/app';

import * as articleProps from 'src/constants/articleProps';
import { defaultArticleState } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

//type Params = {
//	'--font-family': articleProps.OptionType;
//	'--font-size': articleProps.OptionType;
//	'--font-color': articleProps.OptionType;
//	'--container-width': articleProps.OptionType;
////	'--bg-color': articleProps.OptionType;
//};



type Params = typeof defaultArticleState;

const convertParamsToStyles = (params: Params) => ({
  '--font-family': params.fontFamilyOption.value,
  '--font-size': params.fontSizeOption.value,
  '--font-color': params.fontColor.value,
  '--container-width': params.contentWidth.value,
  '--bg-color': params.backgroundColor.value,
});


export const ArticleParamsForm = ({
	currentParams,
	onParamsChange,
	onSubmit,
	onReset
}: {
	currentParams: typeof defaultArticleState;
	onParamsChange: (params: typeof defaultArticleState) => void;
	onSubmit: (params: Params) => void;
	onReset: () => void;
}) => {
	const [isFormOpen, setFormOpen] = useState(false);
	const formRef = useRef<HTMLElement>(null);
	const buttonRef = useRef<HTMLDivElement>(null);

	  // обработчик клика по документу
  	useEffect(() => {
    	const handleClickOutside = (event: MouseEvent) => {
			if (formRef.current && 
				!formRef.current.contains(event.target as Node) &&
        		buttonRef.current &&
        		!buttonRef.current.contains(event.target as Node)) {
				setFormOpen(false); // закрываем форму, если клик был вне сайдбара
			}
		};

		document.addEventListener('click', handleClickOutside, true); // устанавливаем обработчик
		return () => {
			document.removeEventListener('click', handleClickOutside); // снимаем обработчик при размонтировании
		};
	}, []);


	const updateParam = (key: keyof Params, value: articleProps.OptionType) => {
		const newParams = { ...currentParams, [key]: value };
		onParamsChange(newParams);
	};

	const handleReset = () => {
		onReset(); // вызываем функцию сброса из App
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Преобразуем OptionType в строки только при submit
		//const newStyles: AppStyles = {
		//	'--font-family': currentParams['--font-family'].value,
		//	'--font-size': currentParams['--font-size'].value,
		//	'--font-color': currentParams['--font-color'].value,
		//	'--container-width': currentParams['--container-width'].value,
		//	'--bg-color': currentParams['--bg-color'].value,
		//};
		//onSubmit(newStyles);
		onSubmit(currentParams);
	};

	return (
		<>
			<div ref={buttonRef}>
				<ArrowButton
					isOpen={isFormOpen}
					onClick={() => {
						setFormOpen(!isFormOpen);
					}}
				/>
			</div>
			<aside
				ref={formRef} // привязываем реф к контейнеру формы
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen, // добавляем container_open, если isFormOpen === true
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					>
					<Text as='h2' size={31} weight={800} uppercase>
						задайте параметры
					</Text>
					<Select
						//selected={currentParams['--font-family']}
						selected={currentParams.fontFamilyOption}
						options={articleProps.fontFamilyOptions}
						//onChange={(optionType) => updateParam('--font-family', optionType)}
						onChange={(optionType) => updateParam('fontFamilyOption', optionType)}
						title='шрифт'
					/>
					<RadioGroup
						name={'font-size'}
						options={articleProps.fontSizeOptions}
						//selected={currentParams['--font-size']}
						//onChange={(optionType) => updateParam('--font-size', optionType)}
						selected={currentParams.fontSizeOption}
						onChange={(optionType) => updateParam('fontSizeOption', optionType)}
						title='размер шрифта'
					/>
					<Select
						//selected={currentParams['--font-color']}
						selected={currentParams.fontColor}
						options={articleProps.fontColors}
						//onChange={(optionType) => updateParam('--font-color', optionType)}
						onChange={(optionType) => updateParam('fontColor', optionType)}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						//selected={currentParams['--bg-color']}
						selected={currentParams.backgroundColor}
						options={articleProps.backgroundColors}
						//onChange={(optionType) => updateParam('--bg-color', optionType)}
						onChange={(optionType) => updateParam('backgroundColor', optionType)}
						title='цвет фона'
					/>
					<Select
						//selected={currentParams['--container-width']}
						selected={currentParams.contentWidth}
						options={articleProps.contentWidthArr}
						//onChange={(optionType) => updateParam('--container-width', optionType)}
						onChange={(optionType) => updateParam('contentWidth', optionType)}
						title='ширина контента'
					/>
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
