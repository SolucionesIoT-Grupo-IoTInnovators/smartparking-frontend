<script>
import {SignInRequest} from "../model/sign-in.request.js";
import {useAuthenticationStore} from "../services/authentication.store.js";

export default {
  name: "sign-in",
  data() {
    return {
      email: "",
      password: "",
      submitted: false
    };
  },
  methods: {
    async onSignIn() {
      this.submitted = true;

      if (!this.email || !this.password) {
        return;
      }

      let authenticationStore = useAuthenticationStore();
      let signInRequest = new SignInRequest(this.email, this.password);
      const message = await authenticationStore.signIn(signInRequest, this.$router);
      if (message) {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: message,
          life: 3000
        });
      }
    }
  }
}
</script>

<template>
  <div class="flex flex-column justify-content-center align-items-center min-h-screen px-4">
    <img src="../../assets/images/smartparking_logo.png" alt="Logo" class="w-15rem mb-3 surface-card p-2" />
    <form @submit.prevent="onSignIn" class="w-full text-center" style="max-width: 400px">
      <div class="p-fluid surface-card p-4 border-round shadow-2">
        <h3 class="text-3xl mt-0">{{ $t("sign-in.title") }}</h3>
        <div class="mb-4">
          <pv-float-label>
            <pv-input-text id="email" v-model="email" :class="{'p-invalid': submitted && !email }" class="w-full"/>
            <label for="email">{{ $t("sign-in.email") }}</label>
          </pv-float-label>
          <small v-if="submitted && !email" class="p-error">{{ $t("sign-in.emailRequired") }}</small>
        </div>

        <div class="mb-4">
          <pv-float-label>
            <pv-input-text id="password" type="password" v-model="password" :class="{'p-invalid': submitted && !password }" class="w-full" />
            <label for="password">{{ $t("sign-in.password") }}</label>
          </pv-float-label>
          <small v-if="submitted && !password" class="p-error">{{ $t("sign-in.passwordRequired") }}</small>
        </div>

        <pv-button type="submit" class="w-full font-bold uppercase">{{ $t("sign-in.button") }}</pv-button>

        <p class="text-center mt-4 bg-none">
          {{ $t("sign-in.noAccount") }}
          <router-link to="/sign-up" class="text-blue-500">{{ $t("sign-in.signUpLink") }}</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<style scoped>
.bg-none {
  background: none;
}
</style>