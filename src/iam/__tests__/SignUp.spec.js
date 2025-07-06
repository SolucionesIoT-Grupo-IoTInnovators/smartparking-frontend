import { mount } from '@vue/test-utils'
import { vi } from 'vitest'
import SignUpComponent from '../pages/sign-up.component.vue'

// Mock del servicio de autenticación
const mockSignUpDriver = vi.fn().mockResolvedValue({ status: 201 })
const mockSignUpOwner = vi.fn().mockResolvedValue({ status: 201 })

vi.mock('../services/authentication.service.js', () => {
    return {
        AuthenticationService: vi.fn().mockImplementation(() => ({
            signUpDriver: mockSignUpDriver,
            signUpOwner: mockSignUpOwner,
        })),
    }
})

describe('SignUp.vue', () => {
    const globalOptions = {
        global: {
            stubs: {
                'pv-input-text': {
                    template: `<input v-bind="$attrs" v-model="modelValue" @input="$emit('update:modelValue', $event.target.value)" />`,
                    props: ['modelValue']
                },
                'pv-password': {
                    template: `<input type="password" v-bind="$attrs" v-model="modelValue" @input="$emit('update:modelValue', $event.target.value)" />`,
                    props: ['modelValue']
                },
                'pv-radio-button': {
                    template: `<input type="radio" v-bind="$attrs" v-model="modelValue" @change="$emit('update:modelValue', $event.target.value)" />`,
                    props: ['modelValue']
                },
                'pv-float-label': { template: `<div><slot /></div>` },
                'pv-button': true,
                'router-link': true,
                'pv-toast': true
            },
            mocks: {
                $t: (msg) => msg,
                $toast: {
                    add: vi.fn()
                },
                $router: {
                    push: vi.fn()
                }
            }
        }
    }

    beforeEach(() => {
        mockSignUpDriver.mockClear()
        mockSignUpOwner.mockClear()
    })

    it('muestra errores si el formulario está vacío y se hace submit', async () => {
        const wrapper = mount(SignUpComponent, globalOptions)

        await wrapper.find('form').trigger('submit.prevent')

        expect(wrapper.text()).toContain('sign-up.nameRequired')
        expect(wrapper.text()).toContain('sign-up.emailRequired')
        expect(wrapper.text()).toContain('sign-up.passwordRequired')
    })

    it('llama a signUpDriver cuando el rol es driver y los campos están completos', async () => {
        const wrapper = mount(SignUpComponent, globalOptions)
        await wrapper.setData({
            form: {
                fullName: 'Juan Pérez',
                email: 'juan@example.com',
                password: '123456',
                confirmPassword: '123456',
                city: 'Lima',
                country: 'Perú',
                phone: '999999999',
                role: 'driver',
                dni: '12345678',
                companyName: '',
                ruc: ''
            }
        })

        await wrapper.find('form').trigger('submit.prevent')

        expect(mockSignUpDriver).toHaveBeenCalled()
    })

    it('llama a signUpOwner cuando el rol es owner y los campos están completos', async () => {
        const wrapper = mount(SignUpComponent, globalOptions)
        await wrapper.setData({
            form: {
                fullName: 'Empresa SAC',
                email: 'empresa@example.com',
                password: '123456',
                confirmPassword: '123456',
                city: 'Lima',
                country: 'Perú',
                phone: '999999999',
                role: 'owner',
                dni: '',
                companyName: 'Mi Empresa',
                ruc: '12345678901'
            }
        })

        await wrapper.find('form').trigger('submit.prevent')

        expect(mockSignUpOwner).toHaveBeenCalled()
    })
})
