import { Todo } from "./todo.class";
import { divTodoList, funcTodosDone, todosFilter } from "../js/componentes"
import {} from './todo.class' 

export class TodoList {
    constructor() {
        // this.todos = [];
        this.loadLocalStorage();
    }

    newTodo( todo ){
        this.todos.push(todo);
        this.saveLocalStorage();
    }

    deleteTodo( id ) {
        this.todos = this.todos.filter(todo => todo.id != id);
        this.saveLocalStorage();

    }

    toggleTodo( id ) {
        for ( const todo of this.todos ) {
            if (todo.id == id) {
                todo.completado = !todo.completado;
                this.saveLocalStorage();
                break;
            }
        }
    }

    deleteCompleted() {
        this.todos = this.todos.filter(todo => !todo.completado);
        this.saveLocalStorage();
        for( let i = divTodoList.children.length-1; i >= 0 ; i-- ){
            const element = divTodoList.children[i];
            
            if( element.classList.contains('completed') ){
                divTodoList.removeChild(element);
            }
        }
    }

    saveLocalStorage(){
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    loadLocalStorage(){
        this.todos = ( localStorage.getItem('todo') ) ? JSON.parse( localStorage.getItem('todo')) : []; 
        this.todos = this.todos.map( Todo.fromJson);
        // funcTodosDone();
    }
}