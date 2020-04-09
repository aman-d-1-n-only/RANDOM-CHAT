<template>
    <div class="map">
        <div class="google-map" id="map">

        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import db from  '@/Firebase/init'
export default {
        name:'Gmaps',
        data(){
            return{
             lat:53,
             lng:-2,
            }
        },
        methods:{
            renderMap(){
            const map =  new google.maps.Map(document.getElementById('map'),{
                center:{lat:this.lat  ,lng:this.lng},
                zoom:6,
                maxZoom:15,
                minZoom:3,
                streetViewControl:false
            })

            db.collection('users').get()
             .then(users => {
                 users.docs.forEach(doc => {
                  let data = doc.data()
                  if(data.geolocation){
                      let marker = new  google.maps.Marker({
                          position:{lat:data.geolocation.lat,
                                   lng:data.geolocation.lng},
                         map
                      })
                    //add click event to marker
                    marker.addListener('click', () => {
                       this.$router.push({name:'Viewprofile',params:{id:doc.id }})
                    })
                  }
                 })
             })
            }
        },
        mounted(){
            //geolocation api to read geolocation of user then rendre the map acc. to that
            //getting the user
            let user =firebase.auth().currentUser
            console.log(user)

            //first checking does browser user using support the geolocation api or not
            
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(pos =>{
                    this.lat = pos.coords.latitude
                    this.lng = pos.coords.longitude
                    //finding the user record and then updating it
                    db.collection('users').where('user_id','==',user.uid).get()
                    .then(snapshot => {
                    snapshot.forEach( doc =>  {
                    // console.log(doc.id) Now we have the user so now we will update id
                    db.collection('users').doc(doc.id).update({
                        geolocation:{
                            lat:pos.coords.latitude,
                            lng:pos.coords.longitude
                        }
                    })
                 })
             }).then( () => {
                this.renderMap()
             })

                    
                },(err) => {
                    console.log(err)
                    this.renderMap()
                },{maximumAge:60000,timeout:3000})
            }else{
                //position center by default 
                 this.renderMap()
            }
           
         
           
            }
    }
</script>

<style >
.google-map{
    width:100%;
    height: 100%;
    margin:0 auto;
    background:#fff;
    position:absolute;
    top:0;
    left:0;
    z-index:-1;
}
</style>