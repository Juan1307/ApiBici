export default {
  template:`
        <div class="rounded border p-2">
          <p>
            <span class="font-black">OBCN :</span> {{ obcn }}
          </p>
          <p>
            <span class="font-black">Estacion :</span> {{ name }}
          </p>
          <p>
            <span class="font-black">Lugar :</span> {{ location }}
          </p>
          <p class="flex justify-between"> 
            <span>Lat: {{ latitude }}</span>
            <span>Lng: {{ longitude }}</span>
          </p>
          <p>
            <span>Distancia: {{ distance }} m</span>
          </p>
        </div>
      `,
  props: ['obcn','name','location','latitude','longitude','distance']
}