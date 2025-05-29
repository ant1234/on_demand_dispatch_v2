import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { successMsg, setUserData, getUserData } from '@/helper/utils';
import { postData } from '@/helper/http';


export const useLoginStore = defineStore('login', () => {

  const currentStep = ref('currentStep');
  const LoginStep1 = ref('LoginStep1');
  const LoginStep2 = ref('LoginStep2');
  
  const stepOneInput = ref({
    email: '',
  });

  const stepTwoInput = ref({
    password: '',
  });

  const rulesStepOneInput = {
    email: { required, email },
  };

  const rulesStepTwoInput = {
    password: { required },
  };

  const vStepOne$ = useVuelidate(rulesStepOneInput, stepOneInput);
  const vStepTwo$ = useVuelidate(rulesStepTwoInput, stepTwoInput);

  const loading = ref(false);

  async function next() {

    const isValid = await vStepOne$.value.$validate();
    if (!isValid) {
      return;
    }

    currentStep.value = LoginStep2.value;
  }

  function previous() {
    currentStep.value = LoginStep1.value;
  }

  async function signIn() {

    const isValid = await vStepTwo$.value.$validate();
    if (!isValid) {
      return;
    }

    try {

      loading.value = true;
      const data = await postData('/login', {
        ...stepOneInput.value,
        ...stepTwoInput.value
      });

      setUserData(data);

      window.location.href = '/app/welcome';

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

  async function logout() {

    try {

      loading.value = true;

      const userData = getUserData();

      const data = await postData('/logout', {
        userId: userData?.user?.id,
      });

      localStorage.clear();

      window.location.href = '/app/login';

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
          LoginStep1, 
          LoginStep2,
          stepOneInput,
          stepTwoInput,
          vStepOne$,
          vStepTwo$,
          rulesStepOneInput,
          rulesStepTwoInput,
          loading,
          next, 
          previous, 
          signIn,
          logout,
        }
});



if(import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLoginStore, import.meta.hot));
}