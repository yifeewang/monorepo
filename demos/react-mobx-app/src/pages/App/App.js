import React from 'react';
import logo from '@/logo.svg';
import './App.css';
import {observer, inject} from 'mobx-react';

// class中使用mobx
// 观察者
@inject('test', 'todolist') 
@observer
class App extends React.Component  {
    state = {
        name: ''
    }
    toRule = () => {
        console.log('torule') 
        this.props.navigate("/rules"); 
    }
    onChange =(id) => {
        console.log(111, id)
        const {todolist} = this.props
        todolist.setList(id)
    }
    onTextChange = (e) => {
        console.log('onTextChange', e.target.value)
        this.setState({
            name: e.target.value
        })
    }
    addList = () => {
        if(!this.state.name) return 
        const {todolist} = this.props
        todolist.addList(this.state.name)
    }
    render() {
        console.log(1111, this.props)
        const {todolist} = this.props

        return (
          <div className="App">
            <header className="App-header">
                <button onClick={this.toRule}>规则页</button>
                <div className="App-addtodo">
                    <input value={this.state.name} onChange={this.onTextChange} type="text"/>
                    <button onClick={this.addList}>增加</button>
                </div>
                <ul className="App-ul">
                    {
                        todolist.list.slice().map(item => {
                            return (
                                <li key={item.id} className="App-li" onClick={() => {this.onChange(item.id)}}>
                                    <input type='checkbox' onChange={()=>{}} checked={item.hasDone}/>
                                    <div className={`todo-name ${item.hasDone ? 'todo-line' : ''}`}>{item.name}</div>
                                </li>
                            )
                        })
                    }
                </ul>
            </header>
          </div>
        );
    }
}

export default App;
