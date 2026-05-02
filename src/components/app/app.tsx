import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from './../../constants/articleProps';

import styles from './app.module.scss';

export type AppStyles = {
	[key: string]: string;
};

// Связываем OptionType и стили
const convertToCSSStyles = (params: typeof defaultArticleState) => ({
  '--font-family': params.fontFamilyOption.value,
  '--font-size': params.fontSizeOption.value,
  '--font-color': params.fontColor.value,
  '--container-width': params.contentWidth.value,
  '--bg-color': params.backgroundColor.value,
});


export const App = () => {
	/* Используется поднятие состояния state lifting */
	const [styleParams, setStyleParams] = useState(defaultArticleState);

	
  	const appliedStyles: AppStyles = convertToCSSStyles(styleParams);

	const handleSubmit = (params: typeof defaultArticleState) => {
		setStyleParams(params);
	};


	// Функция для сброса и применения стилей !!!
  const handleReset = () => {
	setStyleParams(defaultArticleState);
  };

	return (
		<main
			className={clsx(styles.main)}
			style={appliedStyles as React.CSSProperties}>
			<ArticleParamsForm
				currentParams={styleParams}
				onSubmit={handleSubmit} 
				onReset={handleReset} // передаём функцию сброса в форму
			/>
			<Article styles={appliedStyles} />
		</main>
	);
};
