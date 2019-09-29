import Vue from 'vue'
import Router from 'vue-router'
import TodoList from '../views/TodoList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TodoList',
      component: TodoList
    },
    {
      path: '/TodoForm',
      name: 'Todoform',

      component: () => import('../views/TodoForm.vue')
      // 최적화를 위해 코드 스플릿 처리는 좋은 방법인 것 같습니다.
    }
  ]
})
