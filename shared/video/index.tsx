import React from 'react'
import cn from '~/libs/cn'
import { useStore } from '~/libs/store'
import s from './video.module.scss'

interface VideoProps {
	className?: string
	src: string

	thumbnail?: string
	mp4?: string
	webm?: string
	// eslint-disable-next-line no-unused-vars
	onLoad?: (src?: string) => void
	[x: string]: any
}

export const Video = React.forwardRef<HTMLVideoElement, VideoProps>(
	(
		{ className, mp4, webm, src, onLoad, thumbnail, width, height, style = {}, ...props },
		ref
	) => {
		const isMp4 = src?.endsWith('.mp4')
		const isWebm = src?.endsWith('.webm')
		const avifSupport = useStore(({ avifSupport }) => avifSupport)

		return (
			<video
				ref={ref || null}
				className={cn(className, s.video)}
				style={{ ...style, '--width': width, '--height': height }}
				muted
				autoPlay
				loop
				playsInline
				preload='auto'
				onCanPlay={() => {
					onLoad?.(src)
				}}
				{...props}
				{...(thumbnail
					? { poster: `${thumbnail}?fm=${avifSupport ? 'avif' : 'webp'}&q=70` }
					: {})}>
				{webm && <source src={webm} type='video/webm' />}
				{mp4 && <source src={mp4} type='video/mp4' />}
				{!webm && !mp4 && (
					<>
						{isWebm && <source src={src} type='video/webm' />}
						{isMp4 && <source src={src} type='video/mp4' />}
					</>
				)}
				Your browser does not support the video tag.
			</video>
		)
	}
)

Video.displayName = 'Video'
