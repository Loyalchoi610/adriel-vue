import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(Vuex)

let firebaseConfig = {
  apiKey: 'AIzaSyA3r63OBSnMXnFsQ466pY5I6nxUtvX8Rtk',
  authDomain: 'adriel-vue.firebaseapp.com',
  databaseURL: 'https://adriel-vue.firebaseio.com',
  projectId: 'adriel-vue',
  storageBucket: 'adriel-vue.appspot.com',
  messagingSenderId: '112051604813',
  appId: '1:112051604813:web:9ff24dfe0cacf0433b3b04'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default new Vuex.Store({
  state: {
    Todo: [],
    Doing: [],
    Done: [],
    db: firebase.firestore()
  },

  mutations: {
    addTodoItem (state, todoItem) {
      state[todoItem.type].push(todoItem)
    },
    removeTodoItem (state, {type, index}) {
      state[type].splice(index, 1)
    },
  },
  actions: {
    loadTodos ({ commit, state }) {
      return new Promise(resolve => {
        state.db.collection('Todo')
          .orderBy("regDate","desc")
          .get()
          .then(docs => {
          docs.forEach(doc => {
            let data = doc.data()
            data.id = doc.id
            commit('addTodoItem', data)
          })
          resolve()
        })

      })
    },
    loadDoings ({ commit, state }) {
      return new Promise(resolve => {
        state.db.collection('Doing')
          .orderBy("regDate","desc")
          .get()
          .then(docs => {
          docs.forEach(doc => {
            let data = doc.data()
            data.id = doc.id
            commit('addTodoItem', data)
          })
          resolve()
        })
      })
    },
    loadDones ({ commit, state }) {
      return new Promise(resolve => {
        state.db.collection('Done')
          .orderBy("regDate","desc")
          .get()
          .then(docs => {
          docs.forEach(doc => {
            let data = doc.data()
            data.id = doc.id
            commit('addTodoItem', data)
          })
          resolve()
        })
      })
    },
    updateTodo ({ commit, state }, {todoItem,index}) {
      let oldCollectionName = todoItem.type, oldId = todoItem.id
      let newCollectionName = todoItem.type === 'Todo' ? 'Doing' : 'Done'

      return new Promise((resolve, reject) => {
        state.db.runTransaction(transaction => {
            let newId = state.db.collection(newCollectionName).doc().id
            transaction.delete(state.db.collection(oldCollectionName).doc(todoItem.id))
            todoItem.id = newId
            todoItem.type = newCollectionName
            transaction.set(state.db.collection(newCollectionName).doc(newId),todoItem)
            return Promise.resolve('success')
          }
        ).then(() => {
          commit('removeTodoItem', { type: oldCollectionName, index})
          commit('addTodoItem', todoItem)
          resolve()
        }).catch( err => {
          console.log('Transaction failed ', err)
          todoItem.id = oldId
          todoItem.type = oldCollectionName
          reject()
        })

      })
    },
    addTodoItem ({ commit, state }, todoItem) {
      return new Promise(resolve => {
        state.db.collection('Todo').add(todoItem).then(doc => {
            todoItem.id = doc.id
            commit('addTodoItem', todoItem)
            resolve()
          }
        )
      })
    }
  }
})
