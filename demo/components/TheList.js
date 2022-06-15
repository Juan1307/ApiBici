import { ref, computed } from 'vue';
import TheListCard from './TheListCard.js';

export default {
  template:`<div class="flex flex-col mt-5">
      <label for="search">Buscar Estación</label>
      <input type="text" id="search" v-model="search" class="px-2 w-full md:w-1/2 py-1 border rounded bg-gray-100 transition-colors focus:outline-none focus:bg-white" placeholder="Ingrese nombre">
        
      <main class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 my-4">
        <TheListCard v-for="item of arrayFiltered" :key="item.id" 
          :name="item.name" :obcn="item.obcn" :location="item.location"
          :latitude="item.latitude" :longitude="item.longitude" :distance="item.distance" ></TheListCard>
      </main>

      <p v-show="!arrayFiltered.length" class="text-center font-black"> Ooops sin resultados. </p>
    </div>`,
  components:{ TheListCard },
  props:{ data:{ type: Array } },
  setup(props){
    const search = ref('');

    const arrayFiltered = computed(() => {
      const currentValue = search.value.toLowerCase(); 
      
      return props.data.filter(({name}) => {
        const currentName= name.toLowerCase();
        return currentName.includes(currentValue)
      });
    });

    return { search, arrayFiltered };
   }
}