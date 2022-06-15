export default {
  template:`
        <div class="rounded border p-2">
          <p>
            <span class="font-black">OBCN :</span>
            <span v-text="obcn"></span>
          </p>
          <p>
            <span class="font-black">Estación :</span>
            <span v-text="name"></span>
          </p>
          <p>
            <span class="font-black">Lugar :</span> 
            <span v-text="location"></span>
          </p>
          <p class="flex justify-between"> 
            <span>Lat: <span v-text="latitude"></span> </span>
            <span>Lng: <span v-text="longitude"></span> </span>
          </p>
          <p>
            <span>Distancia: <span v-text="distance"></span> m</span>
          </p>
        </div>
      `,
  props: ['obcn','name','location','latitude','longitude','distance']
}