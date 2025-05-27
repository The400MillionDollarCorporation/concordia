import { Image } from '~/shared'
import s from './home.module.scss'
import { Lines } from './lines'

const Claude = () => {
  const path = '"${absolutePath}'
  return (
    <section id="integrate-with-claude" className={s['claude']}>
      <Lines />
      <h1 data-paragraph>
        Integrate with Claude <br /> Desktop
      </h1>
      <Image
        data-reveal
        src="/claude.svg"
        width={358}
        height={129}
        alt="claude"
      />
      <p data-paragraph>
        Add the following configuration to your <br />{' '}
        <em>`claude_desktop_config.json</em>
      </p>
      <pre data-reveal>{`{
  "mcpServers": {
    "solanaTracker": {
      "command": "node",
      "args": [${path}/build/index.js"],
      "env": {
        "SOLANA_RPC_URL": "https://your-rpc-endpoint.com"
      }
    }
  }
}`}</pre>
    </section>
  )
}

export default Claude
