import FrontLayout from '@/layout/frontLayout'
import { gsap } from '~/libs/gsap'
import { useTextAnimation } from '~/libs/animations'
import { usePageTransition } from '@14islands/react-page-transitions'
import { useStore } from '~/libs/store'

import { fetchCmsQuery } from '~/libs/contentful/api'
import { caseStudyEntryQuery } from '~/libs/contentful/queries/works.graphql'
import { Link } from '~/shared'
import { slugify } from '~/libs/slugify'

const CasePage: any = ({ work, nextCase }) => {
  const preloaded = useStore(({ preloaded }) => preloaded)
  const preloadDuration = useStore(({ preloadDuration }) => preloadDuration)
  const { showTextAnimation, resetTextAnimation, hideTextAnimation } =
    useTextAnimation(`[data-animation="about-text-${slugify(work.name)}"]`)

  usePageTransition({
    onEnter() {
      resetTextAnimation()
    },
    onEntering() {
      gsap
        .timeline({
          delay: preloaded ? 0 : preloadDuration,
        })
        .call(() => showTextAnimation())
    },
    onExiting: async ({ done }) => {
      gsap.timeline().call(() =>
        hideTextAnimation().then(() => {
          done()
        })
      )
    },
  })

  return (
    <FrontLayout page="about">
      <section>
        <h1 data-animation={`about-text-${slugify(work.name)}`}>{work.name}</h1>
        <h1 data-animation={`about-text-${slugify(work.name)}`}>Paragraph</h1>
        <Link href={`/works/${slugify(nextCase.name)}`}>{nextCase.name}</Link>
      </section>
    </FrontLayout>
  )
}

export default CasePage

export async function getStaticPaths() {
  const [{ caseStudyCollection }] = await Promise.all([
    fetchCmsQuery(caseStudyEntryQuery, {
      preview: false,
    }),
  ])

  const paths = caseStudyCollection.items.map((caseStudy) => ({
    params: {
      slug: slugify(caseStudy.name),
      id: caseStudy.sys.id,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const slug = context.params.slug.toString()

  // @ts-ignore
  const [{ caseStudyCollection }] = await Promise.all([
    fetchCmsQuery(caseStudyEntryQuery, {
      preview: false,
    }),
  ])

  const work = caseStudyCollection.items.find(
    (curr) => slugify(curr.name) === slug
  )
  const caseIndex = caseStudyCollection.items.findIndex(
    (curr) => slugify(curr.name) === slug
  )

  const nextCase =
    caseIndex + 1 === caseStudyCollection.items.length
      ? caseStudyCollection.items[0]
      : caseStudyCollection.items[caseIndex + 1]

  return {
    props: {
      // key: work.sys.id,
      work,
      nextCase,
    },
  }
}
