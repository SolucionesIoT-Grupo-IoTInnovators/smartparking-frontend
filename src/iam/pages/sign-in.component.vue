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
    onSignIn() {
      this.submitted = true;

      if (!this.email || !this.password) {
        return;
      }

      let authenticationStore = useAuthenticationStore();
      let signInRequest = new SignInRequest(this.email, this.password);
      authenticationStore.signIn(signInRequest, this.$router);
    }
  }
}
</script>

<template>
  <div class="flex flex-column justify-content-center align-items-center min-h-screen px-4">
    <div class="text-center mb-5">
      <img src="../../assets/images/smartparking_logo.jpeg" alt="Logo" class="w-15rem h-10rem mb-3" />
      <h3 class="text-3xl m-0">Sign In to SmartParking</h3>
    </div>

    <form @submit.prevent="onSignIn" class="w-full" style="max-width: 400px">
      <div class="p-fluid surface-card p-4 border-round shadow-2">
        <div class="mb-4">
          <pv-float-label>
            <pv-input-text id="email" v-model="email" :class="{'p-invalid': submitted && !email }" class="w-full"/>
            <label for="email">Email</label>
          </pv-float-label>
          <small v-if="submitted && !email" class="p-error">Email is required.</small>
        </div>

        <div class="mb-4">
          <pv-float-label>
            <pv-input-text id="password" type="password" v-model="password" :class="{'p-invalid': submitted && !password }" class="w-full" />
            <label for="password">Password</label>
          </pv-float-label>
          <small v-if="submitted && !password" class="p-error">Password is required.</small>
        </div>

        <pv-button type="submit" class="w-full font-bold uppercase">Sign In</pv-button>

        <p class="text-center mt-4 bg-none">
          Don't have an account?
          <router-link to="/sign-up" class="text-blue-500">Sing Up</router-link>
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