import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';


export const useSignUpStore = defineStore('signup', () => {

  const currentStep = ref('currentStep');
  const SignUpStep1 = ref('SignUpStep1');
  const SignUpStep2 = ref('SignUpStep2');
  const SignUpStep3 = ref('SignUpStep2');

  function moveStepOne() {
    currentStep.value = SignUpStep2.value;
  }

  function moveStepTwo() {
    currentStep.value = SignUpStep2.value;
  }

  function moveStepThree() {
    currentStep.value = SignUpStep3.value;
  }

  return {currentStep, SignUpStep1, SignUpStep2, SignUpStep3, moveStepOne, moveStepTwo, moveStepThree}
});

if(import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSignUpStore, import.meta.hot));
}