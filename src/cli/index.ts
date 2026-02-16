import { createServer } from 'node:http'
import { Command } from 'commander'
import { createServer as createApp } from '../server/httpServer.js'
import { generatePassword } from '../server/password.js'

const program = new Command()
  .name('codex-web-local')
  .description('Web interface for Codex app-server')
  .option('-p, --port <port>', 'port to listen on', '3000')
  .option('--password <pass>', 'set a specific password')
  .option('--no-password', 'disable password protection')
  .parse()

const opts = program.opts<{ port: string; password: string | boolean }>()
const port = parseInt(opts.port, 10)

let password: string | undefined
if (opts.password === false) {
  password = undefined
} else if (typeof opts.password === 'string') {
  password = opts.password
} else {
  password = generatePassword()
}

const { app, dispose } = createApp({ password })
const server = createServer(app)

server.listen(port, () => {
  const lines = [
    '',
    'Codex Web Local is running!',
    '',
    `  Local:    http://localhost:${String(port)}`,
  ]

  if (password) {
    lines.push(`  Password: ${password}`)
  }

  lines.push('')
  console.log(lines.join('\n'))
})

function shutdown() {
  console.log('\nShutting down...')
  server.close(() => {
    dispose()
    process.exit(0)
  })
  // Force exit after timeout
  setTimeout(() => {
    dispose()
    process.exit(1)
  }, 5000).unref()
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
