import del from 'del'

import { build } from './paths.json'

export const clean = () => del(build.ROOT)
