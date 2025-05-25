import { useRouter } from 'next/router'
import { useRef, useEffect } from 'react'

export const useRouteChange = () => {
	const { asPath } = useRouter()
	const currentPathRef = useRef<string | null>('')
	const previousPathRef = useRef<string | null>('')

	useEffect(() => {
		previousPathRef.current = currentPathRef.current
		currentPathRef.current = asPath
	}, [asPath])

	return { currentRoute: currentPathRef.current, previousRoute: previousPathRef.current }
}
