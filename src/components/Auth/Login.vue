<template>
    <div class="login container">
        <form  @submit.prevent ="login" class="card-panel">
            <h2 class="deep-purple-text center">Log-in</h2>
               <div class="field">
                <label for="email">E-mail:</label>
                <input type="email" name="email" v-model="email">
            </div>
            <div class="field">
                <label for="password">Password:</label>
                <input type="password" name="password" v-model="password">
            </div>
            <p v-if="feedback" class="red-text center">{{feedback}}</p>
            <div class="field">
                <button class="btn deep-purple">
                    Log-in
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    name:'Login',
    data() {
        return{
            email:null,
            password:null,
            feedback:null,
        }
    },
    methods:{
        login(){
            if(this.email && this.password){
             firebase.auth().signInWithEmailAndPassword(this.email,this.password)
             .then(cred => {
                 this.$router.push({name:'Gmaps'})
             }).catch(err => {
                 this.feedback=err.message
             })
             this.feedback=null
            }else{
                this.feedback="Please fill in the both fields"
            }
        }
    }
}
</script>

<style  scoped>
.login{
    max-width: 400px;
    margin-top:60px;
}
.login h2{
    font-size:2.4em;
}
.login .field{
    margin-bottom:16px;
}
</style>