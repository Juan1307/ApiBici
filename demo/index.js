import { createApp, ref, reactive, computed, toRefs } from 'vue';
import TheList from './components/TheList.js';

((d) => {
  const focusInputId = (id) => setTimeout(() => d.getElementById(id).focus(), 130);
  
  const app = createApp({
    components:{ List: TheList },
    setup(){

      const valPrm = reactive({ latitude: false, longitude: false, distance: false });
      const stations = ref({ data:[], total:0, engine:'vacio' });
      const disabled = ref(false);

      const cleanValidate = (data) => Object.keys(data).map((key) => { valPrm[key] = false });
      const checkValidate = (data) => {
        const currentKey = Object.entries(data).find(([key, val]) => isNaN(Number(val)) || !val.length );

        if(currentKey) {
          const [ key ] = currentKey; 
          focusInputId(key); valPrm[key] = true;
        }
        return !currentKey;
      };

      const sendDataToApi = (evt) => {
        const formData = new FormData(evt.target); 
        const formProps = Object.fromEntries(formData);

        cleanValidate(formProps);
        if(!checkValidate(formProps)) return;
        
        disabled.value = true;
        callApiStations(formProps); //execute call api
      };

      async function callApiStations(data) {
        const { latitude, longitude, distance } = data;
        //api url
        const response = await fetch(`https://api-bici.vercel.app/api/stations?latitude=${latitude}&longitude=${longitude}&distance=${distance}`);
        const responseData = await response.json();
              stations.value = responseData;

        disabled.value = false;
      }

      return { ...toRefs(valPrm), disabled, stations,
                sendDataToApi };
    }
  });

  app.component('error-text', {
    template: `<small :class="classError">Ooops valor invalido.</small>`,
    props:{
      error:{ require: true, type: Boolean,
              default(){ 
                return false; 
              } }
    },
    setup(props){
      const classError = computed(() => props.error ? 'text-red-400' : 'hidden');
      return { classError };
    }
  });
  app.mount('#root');

})(document);