import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { postData } from '@/helper/http';
import { showError, successMsg } from '@/helper/utils';


export const useSignUpStore = defineStore('signup', () => {

  const currentStep = ref('currentStep');
  const SignUpStep1 = ref('SignUpStep1');
  const SignUpStep2 = ref('SignUpStep2');
  const SignUpStep3 = ref('SignUpStep2');
  const loading = ref(false);


  const stepOneInput = ref({
    name: '',
    email: '',
  });

  const stepTwoInput = ref({
    password: '',
  });

  const stepThreeInput = ref({
    opt_code: '',
  });

  const rulesStepOneInput = {
    name: { required },
    email: { required, email },
  };

  const rulesStepTwoInput = {
    password: { required },
  };

  const rulesStepThreeInput = {
    opt_code: { required },
  };

  const vStepOne$ = useVuelidate(rulesStepOneInput, stepOneInput);
  const vStepTwo$ = useVuelidate(rulesStepTwoInput, stepTwoInput);
  const vStepThree$ = useVuelidate(rulesStepThreeInput, stepThreeInput);

  async function moveStepTwo() {
    const isValid = await vStepOne$.value.$validate();
    if (!isValid) {
      return;
    }
    currentStep.value = SignUpStep2.value;
  }

  async function moveStepOne() {
    currentStep.value = SignUpStep1.value;
  }

  async function moveStepThree() {

    const isValid = await vStepTwo$.value.$validate();
    
    if (!isValid) {
      return;
    }

    try {

      loading.value = true;

      const data = await postData('/users', {...stepOneInput.value, ...stepTwoInput.value });
      successMsg(data?.message);

      loading.value = false;

      currentStep.value = SignUpStep3.value;

    } catch (error) {
      loading.value = false;
      for(const message in error) {
        showError(message);
      }
    }
  }

  async function signUpUser() {
    const isValid = await vStepThree$.value.$validate();
    if (!isValid) {
      return;
    }

    try {
      // Call the API to sign up the user
      const res = await fetch('/api/users/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: stepOneInput.value.name,
          email: stepOneInput.value.email,
          password: stepTwoInput.value.password,
          opt_code: stepThreeInput.value.opt_code,
        }),
      });

      return res.json();
    }
    catch (error) {
      // Handle error
      console.error('Error signing up:', error);
      return;
    }
    // Call the API to sign up the user
    // Reset the form and state
  }

  return {
    currentStep, 
    SignUpStep1, 
    SignUpStep2, 
    SignUpStep3, 
    stepOneInput, 
    stepTwoInput,
    stepThreeInput,
    vStepOne$,
    vStepTwo$,
    vStepThree$, 
    loading,
    moveStepOne, 
    moveStepTwo, 
    moveStepThree,
    signUpUser,
  };
});

if(import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSignUpStore, import.meta.hot));
}