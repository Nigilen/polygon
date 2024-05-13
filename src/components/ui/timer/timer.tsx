import { ChangeEvent, FC, ReactElement } from 'react';
import styles from './timer.module.css';
import resetSVG from '../../../assets/svg/cross.svg';
import uploadSVG from '../../../assets/svg/upload.svg';

export type TTimerProps = {
	values: {
		s: number;
		m: number;
		h: number;
	};
	timer: {
		s: number;
		m: number;
		h: number;
	};
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleReset: () => void;
	handleStart: () => void;
	handleSend: () => void;
	captionBtn: ReactElement;
	disabledInput: boolean;
	isSetTime: boolean;
	barValue: number;
};

export const TimerUI: FC<TTimerProps> = ({
	values,
	timer,
	handleChange,
	handleReset,
	handleStart,
	handleSend,
	captionBtn,
	disabledInput,
	isSetTime,
	barValue,
}) => (
	<>
		<div className={styles.wrap}>
			<div className={styles.wrapper}>
				{!disabledInput && (
					<div className={styles.inputs}>
						<input
							type='number'
							name={'h'}
							value={values.h}
							min={0}
							max={60}
							onChange={handleChange}
							disabled={disabledInput}
							className={styles.input}
							onFocus={(e) => e.target.select()}
						/>
						<span className={styles.semicolon}>:</span>
						<input
							type='number'
							name={'m'}
							value={values.m}
							min={0}
							max={60}
							onChange={handleChange}
							disabled={disabledInput}
							className={styles.input}
							onFocus={(e) => e.target.select()}
						/>
						<span className={styles.semicolon}>:</span>
						<input
							type='number'
							name={'s'}
							value={values.s}
							min={0}
							max={60}
							onChange={handleChange}
							disabled={disabledInput}
							className={styles.input}
							onFocus={(e) => e.target.select()}
						/>
					</div>
				)}
				{disabledInput && (
					<>
						<div className={styles.inputs}>
							<div className={styles.input}>
								{String(timer.h).padStart(2, '0')}
							</div>
							<span className={styles.semicolon}>:</span>
							<div className={styles.input}>
								{String(timer.m).padStart(2, '0')}
							</div>
							<span className={styles.semicolon}>:</span>
							<div className={styles.input}>
								{String(timer.s).padStart(2, '0')}
							</div>
						</div>

						{/* <div>
						<Tags />
					</div> */}
					</>
				)}

				{disabledInput && (
					<svg
						width='581'
						height='591'
						viewBox='0 0 641 591'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						className={styles.circle}
					>
						<g filter='url(#filter0_ddi_170_219)'>
							<circle
								cx='50%'
								cy='50%'
								r='214'
								strokeLinecap='round'
								stroke='#686868'
								strokeWidth='25'
								shapeRendering='crispEdges'
								strokeDasharray='1350'
								strokeDashoffset={barValue}
							/>
						</g>
						<defs>
							<filter
								id='filter0_ddi_170_219'
								x='-39.5'
								y='0.5'
								width='590'
								height='590'
								filterUnits='userSpaceOnUse'
								colorInterpolationFilters='sRGB'
							>
								<feFlood floodOpacity='0' result='BackgroundImageFix' />
								<feColorMatrix
									in='SourceAlpha'
									type='matrix'
									values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
									result='hardAlpha'
								/>
								<feOffset dx='-24' dy='24' />
								<feGaussianBlur stdDeviation='24' />
								<feComposite in2='hardAlpha' operator='out' />
								<feColorMatrix
									type='matrix'
									values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
								/>
								<feBlend
									mode='normal'
									in2='BackgroundImageFix'
									result='effect1_dropShadow_170_219'
								/>
								<feColorMatrix
									in='SourceAlpha'
									type='matrix'
									values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
									result='hardAlpha'
								/>
								<feOffset dx='-12' dy='8' />
								<feGaussianBlur stdDeviation='8' />
								<feComposite in2='hardAlpha' operator='out' />
								<feColorMatrix
									type='matrix'
									values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
								/>
								<feBlend
									mode='normal'
									in2='effect1_dropShadow_170_219'
									result='effect2_dropShadow_170_219'
								/>
								<feBlend
									mode='normal'
									in='SourceGraphic'
									in2='effect2_dropShadow_170_219'
									result='shape'
								/>
								<feColorMatrix
									in='SourceAlpha'
									type='matrix'
									values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
									result='hardAlpha'
								/>
								<feOffset dx='12' dy='-8' />
								<feGaussianBlur stdDeviation='8' />
								<feComposite
									in2='hardAlpha'
									operator='arithmetic'
									k2='-1'
									k3='1'
								/>
								<feColorMatrix
									type='matrix'
									values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
								/>
								<feBlend
									mode='normal'
									in2='shape'
									result='effect3_innerShadow_170_219'
								/>
							</filter>
						</defs>
					</svg>
				)}
			</div>
			<div className={styles.buttons}>
				<button
					className={styles.button}
					type='button'
					onClick={handleStart}
					disabled={isSetTime}
				>
					{captionBtn}
				</button>
				{disabledInput && (
					<>
						<button
							className={styles.button}
							type='button'
							onClick={handleReset}
						>
							<img src={resetSVG} />
						</button>
						<button
							className={styles.button}
							type='button'
							onClick={handleSend}
						>
							<img src={uploadSVG} />
						</button>
					</>
				)}
			</div>
		</div>
	</>
);
