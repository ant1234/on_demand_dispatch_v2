import { defineStore } from 'pinia';
import { ref } from 'vue';


export const useLoginStore = defineStore('login', () => {

  const currentStep = ref('currentStep');
  const RegistrationStep1 = ref('RegistrationStep1');
  const RegistrationStep2 = ref('RegistrationStep2');

  function next() {
    currentStep.value = RegistrationStep2.value;
  }

  function previous() {
    currentStep.value = RegistrationStep1.value;
  }

  return {currentStep, RegistrationStep1, RegistrationStep2, next, previous}
});