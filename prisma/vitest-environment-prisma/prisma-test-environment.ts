import { Environment } from 'vitest'

export default <Environment> {
    name: 'prisma',
    setup: async () => (
        { teardown() {
            console.log('Teardown')
        } }
    ) ,
    transformMode: 'ssr',
}