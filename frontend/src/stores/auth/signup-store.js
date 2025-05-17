import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { postData } from '@/helper/http';
import { showError, successMsg, setUserData } from '@/helper/utils';


export const useSignUpStore = defineStore('signup', () => {

  const currentStep = ref('currentStep');
  const SignUpStep1 = ref('SignUpStep1');
  const SignUpStep2 = ref('SignUpStep2');
  const SignUpStep3 = ref('SignUpStep2');
  const loading = ref(false);


  const stepOneInput = ref({
    name: 'joohn',
    email: 'joohn@gmail.com',
  });

  const stepTwoInput = ref({
    password: '',
  });

  const stepThreeInput = ref({
    otp_code: '',
  });

  const rulesStepOneInput = {
    name: { required },
    email: { required, email },
  };

  const rulesStepTwoInput = {
    password: { required },
  };

  const rulesStepThreeInput = {
    otp_code: { required },
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

      loading.value = true;
      const data = await postData('/users/verify-email', {
        ...stepOneInput.value,
        ...stepThreeInput.value
      });

      setUserData(data);

      window.location.href = '/app/dashboard';

      successMsg(data?.message);

      loading.value = false;

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