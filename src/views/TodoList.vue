<template>
    <div>
        <header>
            <div class="todo">나의 해야할 일들</div>
            <router-link  to="/TodoForm" class="register">새로운 TODO 등록</router-link>
        </header>
        <section id="container">
            <section class= "row">
                <section class="col-4">
                    <div id="todo">
                        <div class="card_title">TODO</div>

                        <div class="card_content" v-for="(item, index) in $store.state.Todo" v-bind:key="item.id">
                            <div class="title">
                                <h1>{{item.title}}</h1>
                            </div>
                            <div class="content">
                                {{name_regDate}}: {{getYearMonthDay(item.regDate)}}, {{item.name}}, {{name_priority}} {{item.sequence}}
                                <button class="btn_todo" v-on:click="moveTodoItem('Todo',index)">→</button>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="col-4">
                    <div id="doing">
                        <div class="card_title">DOING</div>
                        <div class="card_content" v-for="(item, index) in $store.state.Doing" v-bind:key="item.id">
                            <div class="title">
                                <h1>{{item.title}}</h1>
                            </div>
                            <div class="content">
                                {{name_regDate}}: {{getYearMonthDay(item.regDate)}}, {{item.name}}, {{name_priority}} {{item.sequence}}
                                <button class="btn_todo" v-on:click="moveTodoItem('Doing',index)">→</button>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="col-4">
                    <div id="done">
                        <div class="card_title">DONE</div>
                        <div v-bind:key="item.id" class="card_content" v-for="item in $store.state.Done">
                            <div class="title">
                                <h1>{{item.title}}</h1>
                            </div>
                            <div class="content">
                                {{name_regDate}}: {{getYearMonthDay(item.regDate)}}, {{item.name}}, {{name_priority}} {{item.sequence}}
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </section>
    </div>
</template>

<script>
  export default {
    name: 'TodoList',
    methods: {
      getYearMonthDay: function (timestamp) {
        let date = timestamp.toDate()
        let mm = date.getMonth() + 1
        let dd = date.getDate()
        return [date.getFullYear() + '.',
          (mm>9 ? '' : '0') + mm + '.',
          (dd>9 ? '' : '0') + dd
        ].join('');
      },
      moveTodoItem: function (type,index) {
        let todoItem = this.$store.state[type][index]
        this.$store.dispatch('updateTodo',{todoItem, index}).then()
      },
    },
    data(){
      return {
        name_regDate: unescape('%uB4F1%uB85D%uB0A0%uC9DC'),
        name_priority: unescape('%uC6B0%uC120%uC21C%uC704')
      }
    }
  }
</script>

<style scoped>
    @import "../assets/css/list.css";
</style>
