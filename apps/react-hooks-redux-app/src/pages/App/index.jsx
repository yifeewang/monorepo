import React, { useEffect, useState } from 'react'
import { AppType } from '@infras/shared/types'
import { sum } from '@infras/shared/utils'
import { Component as MyComponent } from '@infras/ui/react'
// import {useSelector, useDispatch} from 'react-redux';
import { selectedSize } from '@/store/actions/appActions/appActionCreator'
import logo from '@/logo.svg'
import './App.css'
import {
//  组合模式
  GroupPatterns,
  GroupPatterns2,
  GroupPatterns3,
  GroupPatterns4,
  GroupPatterns5,
  GroupPatterns6,
  GroupPatternsItem,
// render props
  Children,
  Container,
// hoc
  createHoc,
// 类组件继承
  PRoute
} from '@/components'

const loadingHoc = createHoc()
function CompA(){
    console.log('组件A')
    useEffect(()=>{
        console.log('组件A挂载完成')
    },[])
    return <div>组件 A </div>
}
function CompB(){
    console.log('组件B')
    useEffect(()=>{
        console.log('组件B挂载完成')
    },[])
    return <div>组件 B </div>
}
function CompC(){
    console.log('组件C')
    useEffect(()=>{
        console.log('组件C挂载完成')
    },[])
    return  <div>组件 C </div>
}

function CompD(){
    console.log('组件D')
    useEffect(()=>{
        console.log('组件D挂载完成')
    },[])
    return  <div>组件 D </div>
}
function CompE(){
    console.log('组件E')
    useEffect(()=>{
        console.log('组件E挂载完成')
    },[])
    return  <div>组件 E </div>
}

const ComponentA = loadingHoc(React.memo(CompA))
const ComponentB = loadingHoc(React.memo(CompB))
const ComponentC = loadingHoc(React.memo(CompC))
const ComponentD = loadingHoc(React.memo(CompD))
const ComponentE = loadingHoc(React.memo(CompE))

function Test1 (){
    return <div>权限路由测试一</div>
}

function Test2 (){
    return <div>权限路由测试二</div>
}

function Test3(){
    return <div>权限路由测试三</div>
}

// useSelector useDispatch  navigate 统统在路由层处理传递下来

function Index(props) {
    const [ isShow, setIsShow ] = useState(false)
  console.log('index', props)
  const aProps = {
    book:'《React render props》'
  }
  return (
    <div className='App'>
      <header className='App-header'>
          {/* 组合模式 */}
        {/* <GroupPatterns2>
          <GroupPatternsItem name='《React进阶实践指南》' />
          <GroupPatternsItem name='《React设计模式》' />
          <GroupPatternsItem isShow name='《React进阶实践指南》' />
          <GroupPatternsItem isShow={false} name='《Nodejs深度学习手册》' />
          <div>hello,world</div>
        </GroupPatterns2> */}

        {/* render props */}
        {/* <Container>
            {
                (cProps) => <Children {...cProps} {...aProps}/>
            }
        </Container> */}

        {/* hoc  */}
        <ComponentA name={'a'}/>
        <ComponentB name={'b'}/>
        <ComponentC name={'c'}/>
        {isShow && <ComponentD name={'d'}/>}
        {isShow && <ComponentE name={'e'}/>}
        <button onClick={()=> setIsShow(true)} > 挂载组件D ，E </button>

        {/* 类组件继承  */}
      </header>
    </div>
  )
}

export default Index
