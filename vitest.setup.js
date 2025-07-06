import { vi } from 'vitest'

// Stub global para i18n ($t)
vi.stubGlobal('$t', (msg) => msg)
