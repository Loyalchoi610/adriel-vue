import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(Vuex)

// 변하지 않는 상수로 활용하는 데이터라면 const를 써주는게 좋을 것 같습니다.
// 잘 아실것같지만 이러한 파일은 .env에서 관리해서 사용하시는게 좋습니다.
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
  // state를 작성하실때 첫문자 대소문자 사용 여부는 통일하시는것이 좋을 것 같습니다.

  mutations: {
    addTodoItem (state, todoItem) {
      state[todoItem.type].push(todoItem)
    },
    // Todo 아이템을 추가할때 소팅처리가 안되어있어서 리스트를 다시 부를때 꼬이는 지점이 있는 것 같습니다. 
    removeTodoItem (state, {type, index}) {
      state[type].splice(index, 1)
    },
  },
  // Promise를 적절히 잘 사용하신 것 같습니다.
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
