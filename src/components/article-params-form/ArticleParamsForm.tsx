import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import clsx from 'clsx';

import { Separator } from 'src/ui/separator';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';

import { useState, useEffect, useRef } from 'react';

import * as articleProps from 'src/constants/articleProps';
import { defaultArticleState, ArticleStateType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = ({
	currentParams,
	onSubmit,
	onReset,
}: {
	currentParams: ArticleStateType;
	onSubmit: (params: ArticleStateType) => void;
	onReset: () => void;
}) => {
	const [localParams, setLocalParams] = useState(currentParams);
	const [isFormOpen, setFormOpen] = useState(false);
	const formRef = useRef<HTMLElement>(null);
	const buttonRef = useRef<HTMLDivElement>(null);

	// обработчик клика по документу
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				formRef.current &&
				!formRef.current.contains(event.target as Node) &&
				buttonRef.current &&
				!buttonRef.current.contains(event.target as Node)
			) {
				setFormOpen(false); // закрываем форму, если клик был вне сайдбара
			}
		};

		document.addEventListener('click', handleClickOutside, true); // устанавливаем обработчик
		return () => {
			document.removeEventListener('click', handleClickOutside, true); // снимаем обработчик при размонтировании
		};
	}, []);

	const updateParam = (key: keyof ArticleStateType, value: articleProps.OptionType) => {
		const newParams = { ...localParams, [key]: value };
		setLocalParams(newParams);
	};

	const handleReset = () => {
		setLocalParams(defaultArticleState); // сбрасываем локальные параметры до значений по умолчанию
		onReset(); // вызываем сброс из App
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(localParams);
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
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' size={31} weight={800} uppercase>
						задайте параметры
					</Text>
					<Select
						selected={localParams.fontFamilyOption}
						options={articleProps.fontFamilyOptions}
						onChange={(optionType) =>
							updateParam('fontFamilyOption', optionType)
						}
						title='шрифт'
					/>
					<RadioGroup
						name={'font-size'}
						options={articleProps.fontSizeOptions}
						selected={localParams.fontSizeOption}
						onChange={(optionType) => updateParam('fontSizeOption', optionType)}
						title='размер шрифта'
					/>
					<Select
						selected={localParams.fontColor}
						options={articleProps.fontColors}
						onChange={(optionType) => updateParam('fontColor', optionType)}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={localParams.backgroundColor}
						options={articleProps.backgroundColors}
						onChange={(optionType) =>
							updateParam('backgroundColor', optionType)
						}
						title='цвет фона'
					/>
					<Select
						selected={localParams.contentWidth}
						options={articleProps.contentWidthArr}
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
