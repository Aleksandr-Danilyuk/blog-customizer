import { CSSProperties } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from './../../constants/articleProps';

import styles from './app.module.scss';


import { useState } from 'react';


type AppStyles = {
  [key: string]: string;
};

export const App = () => {
	{/* Используется поднятие состояния state lifting */}
	const [styleParams, setStyleParams] = useState({
		'--font-family': defaultArticleState.fontFamilyOption,
		'--font-size': defaultArticleState.fontSizeOption,
		'--font-color': defaultArticleState.fontColor,
		'--container-width': defaultArticleState.contentWidth,
		'--bg-color': defaultArticleState.backgroundColor,
  	});

	// Преобразуем объекты OptionType в строки для CSS
   const [appliedStyles, setAppliedStyles] = useState<AppStyles> ({
    '--font-family': styleParams['--font-family'].value,
    '--font-size': styleParams['--font-size'].value,
    '--font-color': styleParams['--font-color'].value,
    '--container-width': styleParams['--container-width'].value,
    '--bg-color': styleParams['--bg-color'].value,
  });



	const handleParamsChange = (newParams: typeof styleParams) => {setStyleParams(newParams);};

	const handleSubmit = () => {
		// Преобразуем OptionType в строки только при submit
		const newStyles: AppStyles = {
		'--font-family': styleParams['--font-family'].value,
		'--font-size': styleParams['--font-size'].value,
		'--font-color': styleParams['--font-color'].value,
		'--container-width': styleParams['--container-width'].value,
		'--bg-color': styleParams['--bg-color'].value,
		};
		setAppliedStyles(newStyles);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={appliedStyles as React.CSSProperties}>
			<ArticleParamsForm currentParams={styleParams} onParamsChange={handleParamsChange} onSubmit={handleSubmit}/>
			<Article styles={appliedStyles}/>
		</main>
	);
};

