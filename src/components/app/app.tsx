import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from './../../constants/articleProps';

import styles from './app.module.scss';

export type AppStyles = {
	[key: string]: string;
};

export const App = () => {
	{
		/* Используется поднятие состояния state lifting */
	}
	const [styleParams, setStyleParams] = useState({
		'--font-family': defaultArticleState.fontFamilyOption,
		'--font-size': defaultArticleState.fontSizeOption,
		'--font-color': defaultArticleState.fontColor,
		'--container-width': defaultArticleState.contentWidth,
		'--bg-color': defaultArticleState.backgroundColor,
	});

	// Преобразуем объекты OptionType в строки для CSS
	const [appliedStyles, setAppliedStyles] = useState<AppStyles>({
		'--font-family': styleParams['--font-family'].value,
		'--font-size': styleParams['--font-size'].value,
		'--font-color': styleParams['--font-color'].value,
		'--container-width': styleParams['--container-width'].value,
		'--bg-color': styleParams['--bg-color'].value,
	});

	const handleParamsChange = (newParams: typeof styleParams) => {
		setStyleParams(newParams);
	};


	// Функция для сброса и применения стилей !!!
  const handleReset = () => {
    // Сбрасываем на параметры по умолчанию
    const defaultParams = {
		'--font-family': defaultArticleState.fontFamilyOption,
		'--font-size': defaultArticleState.fontSizeOption,
		'--font-color': defaultArticleState.fontColor,
		'--container-width': defaultArticleState.contentWidth,
		'--bg-color': defaultArticleState.backgroundColor,
    };
    setStyleParams(defaultParams);

    // Сразу применяем эти параметры как стили
    const resetStyles: AppStyles = {
      '--font-family': defaultParams['--font-family'].value,
      '--font-size': defaultParams['--font-size'].value,
      '--font-color': defaultParams['--font-color'].value,
      '--container-width': defaultParams['--container-width'].value,
      '--bg-color': defaultParams['--bg-color'].value,
    };
    setAppliedStyles(resetStyles);
  };

	return (
		<main
			className={clsx(styles.main)}
			style={appliedStyles as React.CSSProperties}>
			<ArticleParamsForm
				currentParams={styleParams}
				onParamsChange={handleParamsChange}
				onSubmit={setAppliedStyles}
				//onSubmit={handleSubmit}
				onReset={handleReset} // передаём функцию сброса в форму
			/>
			<Article styles={appliedStyles} />
		</main>
	);
};
