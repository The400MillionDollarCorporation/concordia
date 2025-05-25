export const shuffleByString = (): void => {
	// Set effect velocity in ms
	const velocity: number = 50

	const shuffleElement: any = document.querySelectorAll('[data-hover-shuffle="string"]')

	shuffleElement.forEach((item: Element) => {
		item.setAttribute('data-text', item.textContent || '')
	})

	const shuffle = (o: any[]): any[] => {
		for (
			let j: number, x: any, i: number = o.length;
			i;
			j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
		);
		return o
	}

	const shuffleText = (element: Element, originalText: string): void => {
		let elementTextArray: string[] = []
		let randomText: string[] | string = []

		for (let i = 0; i < originalText.length; i++) {
			elementTextArray.push(originalText.charAt(i))
		}

		const repeatShuffle = (times: number, index: number): void => {
			if (index === times) {
				element.textContent = originalText
				return
			}

			setTimeout(() => {
				randomText = shuffle(elementTextArray)
				for (let i = 0; i < index; i++) {
					randomText[i] = originalText[i]
				}
				randomText = randomText.join('')
				element.textContent = randomText
				index++
				repeatShuffle(times, index)
			}, velocity)
		}
		repeatShuffle(element.textContent?.length || 0, 0)
	}

	shuffleElement.forEach((item: Element) => {
		item.addEventListener('mouseenter', () => {
			shuffleText(item, item.getAttribute('data-text') || '')
		})
	})
}

export const shuffleByWords = (): void => {
	// Set effect velocity in ms
	const velocity: number = 50

	const shuffleElement: any = document.querySelectorAll('[data-hover-shuffle="word"]')

	shuffleElement.forEach((item: Element) => {
		item.setAttribute('data-text', item.textContent || '')
	})

	const shuffle = (o: any[]): any[] => {
		for (
			let j: number, x: any, i: number = o.length;
			i;
			j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
		);
		return o
	}

	const shuffleText = (element: Element, originalText: string): void => {
		const words = originalText.split(' ')
		let shuffledWords = words.map((word) => {
			let wordArray = Array.from(word)
			return shuffle(wordArray).join('')
		})

		const repeatShuffle = (times: number, index: number): void => {
			if (index === times) {
				setTimeout(() => {
					element.textContent = originalText
				}, velocity)
				return
			}

			setTimeout(() => {
				shuffledWords = shuffledWords.map((word) => {
					let wordArray = Array.from(word)
					return shuffle(wordArray).join('')
				})
				element.textContent = shuffledWords.join(' ')
				index++
				repeatShuffle(times, index)
			}, velocity)
		}
		repeatShuffle(element.textContent?.length || 0, 0)
	}

	shuffleElement.forEach((item: Element) => {
		item.addEventListener('mouseenter', () => {
			shuffleText(item, item.getAttribute('data-text') || '')
		})
	})
}
