import{ createRouter, createWebHashHistory } from 'vue-router'
import About from './About'
import Movie from './Movie'
import Search from './Search'
import Notfound from './Notfound'

export default createRouter({
  // Hash
  // https://google.com/#/search
  history:createWebHashHistory(),
  scrollBehavior(){
    return {
      top : 0
    }
  },
  // Pages
  // https://google.com/
  routes:[
    {
      path:'/',
      component:Search
    },
    {
      path:'/about',
      component:About
    },
    {
      path:'/movie/:id',
      component:Movie
    },
    {
      path:'/:notFound(.*)',
      component:Notfound
    }
  ]
})