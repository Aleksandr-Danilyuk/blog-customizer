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
	const [articleState, setArticleState] = useState(defaultArticleState);
	const appliedStyles: AppStyles = convertToCSSStyles(articleState);

	return (
		<main className={clsx(styles.main)} style={appliedStyles}>
			<ArticleParamsForm
				currentParams={articleState}
				onApply={setArticleState}
			/>
			<Article />
		</main>
	);
};
