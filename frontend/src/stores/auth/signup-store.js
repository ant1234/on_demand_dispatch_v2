import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'


export const useSignUpStore = defineStore('signup', () => {

  const currentStep = ref('currentStep');
  const SignUpStep1 = ref('SignUpStep1');
  const SignUpStep2 = ref('SignUpStep2');
  const SignUpStep3 = ref('SignUpStep2');

  const stepOneInput = ref({
    name: '',
    email: '',
  });

  const v$ = useVuelidate({
    name: { required },
    email: { required, email },
  }, stepOneInput);

  async function moveStepOne() {
    const isValid = await v$.value.$validate();
    if (!isValid) {
      return;
    }
    currentStep.value = SignUpStep2.value;
  }

  function moveStepTwo() {
    currentStep.value = SignUpStep2.value;
  }

  function moveStepThree() {
    currentStep.value = SignUpStep3.value;
  }

  return {currentStep, SignUpStep1, SignUpStep2, SignUpStep3, stepOneInput, v$, moveStepOne, moveStepTwo, moveStepThree}
});

if(import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSignUpStore, import.meta.hot));
}