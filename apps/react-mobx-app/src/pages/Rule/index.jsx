import React from 'react'
import { useobserver, Observer, useLocalStore } from 'mobx-react';
import { toJS } from 'mobx'; 
import store from '@/store';

// hooks使用mobx
export default function Index(props) {
    const toRule = () => {
        console.log('torule')
        props.navigate("/"); 
    }
    const localStore = useLocalStore(() => store);
    console.log('rules', toJS(localStore.todolist.list))
    return <Observer>{() => <span>rules</span>}</Observer>
}
