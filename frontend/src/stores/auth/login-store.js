import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';


export const useLoginStore = defineStore('login', () => {

  const currentStep = ref('currentStep');
  const LoginStep1 = ref('LoginStep1');
  const LoginStep2 = ref('LoginStep2');

  function next() {
    currentStep.value = LoginStep2.value;
  }

  function previous() {
    currentStep.value = LoginStep1.value;
  }

  return {currentStep, LoginStep1, LoginStep2, next, previous}
});

if(import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLoginStore, import.meta.hot));
}