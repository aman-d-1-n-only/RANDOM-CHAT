import Vue from 'vue'
import Router from 'vue-router'
import Gmaps from '@/components/Home/Gmaps'
import Viewprofile from '@/components/Profile/Viewprofile'
import Signup from '@/components/Auth/Signup'
import Login from '@/components/Auth/Login'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'Gmaps',
            component: Gmaps,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/signup',
            name: 'Signup',
            component: Signup
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/profile/:id',
            name: 'Viewprofile',
            component: Viewprofile,
            meta: {
                requiresAuth: true
            }
        }

    ]
})

router.beforeEach((to, from, next) => {
    //check if route require path
    if (to.matched.some(rec => rec.meta.requiresAuth)) {
        //check auth state of user
        let user = firebase.auth().currentUser
        if (user) {
            //user signed in,proceed to route
            next()
        } else {
            //no user signed in redirect ton login
            next({ name: 'Login' })
        }
    } else {
        //for the routes that don't have requiresAuth set to true
        next()
    }
})

export default router