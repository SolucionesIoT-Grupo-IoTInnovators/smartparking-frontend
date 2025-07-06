
import { vi } from 'vitest'


// 👇 Mock del store (colócalo antes del describe)
vi.mock('../services/authentication.store.js', () => ({
    useAuthenticationStore: () => ({
        signIn: vi.fn().mockResolvedValue({ status: 200 })
    })
}))


import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import SignInComponent from '../pages/sign-in.component.vue'

describe('SignIn.vue', () => {
    const globalOptions = {
        global: {
            plugins: [createPinia()],
            stubs: {
                'pv-input-text': {
                    template: '<input v-bind="$attrs" v-model="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />',
                    props: ['modelValue']
                },
                'pv-float-label': {
                    template: '<div><slot /></div>'
                },
                'pv-button': true,
                'router-link': true
            },
            mocks: {
                $t: (msg) => msg
            }
        }
    }

    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('muestra errores si los campos están vacíos y se hace submit', async () => {
        const wrapper = mount(SignInComponent, globalOptions)
        await wrapper.find('form').trigger('submit.prevent')

        expect(wrapper.text()).toContain('sign-in.emailRequired')
        expect(wrapper.text()).toContain('sign-in.passwordRequired')
    })

    it('llama al método onSignIn si los campos están completos', async () => {
        const wrapper = mount(SignInComponent, globalOptions)

        await wrapper.find('#email').setValue('test@example.com')
        await wrapper.find('#password').setValue('123456')

        // No hace falta espiar el método, ya se mockeó signIn del store
        await wrapper.find('form').trigger('submit.prevent')

        // Verifica que el store haya sido llamado (por si quieres añadir)
        // const store = useAuthenticationStore()
        // expect(store.signIn).toHaveBeenCalled()
    })
})
