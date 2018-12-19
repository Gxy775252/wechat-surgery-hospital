import Vue from 'vue'
import Vuex from 'vuex'
// import * as util from 'https://res.wx.qq.com/open/js/jweixin-1.2.0.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ],
    count: 1
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    },
    getTodoById: (state) => (id) => {
      return state.todos.find(todo => todo.id === id)
    }
  },
  mutations: {
    changeAge(state, n){
      console.log('执行了吗？', state.count += n.amount)
    },
    hash(state, name){
      console.log(name,'222')
      // state.commit(name)
    }
  },
  actions: {

  }
})
