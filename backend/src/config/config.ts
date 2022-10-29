//Basics types: ['dev', 'stag', 'prod']
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev'

interface App {
  port: number
}
interface Db {
  host: string
  port: number
  name: string
}
interface EnvConfigs {
  app: App
  db: Db
}
interface EnvConfig {
  dev: EnvConfigs
  stag: EnvConfigs
}

const dev = {
  app: {
    port: 3000,
  },
  db: {
    host: 'localhost',
    port: 27017,
    name: 'db',
  },
}

const stag = {
  app: {
    port: 3000,
  },
  db: {
    host: 'localhost',
    port: 27017,
    name: 'test',
  },
}

const config: EnvConfig = {
  dev,
  stag,
}

export default (): EnvConfigs => config[env as keyof EnvConfig]
