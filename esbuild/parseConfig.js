import fs from 'fs'

const Config = fs.readFileSync('nexsis.config.json', 'utf-8')

export default JSON.parse(Config)