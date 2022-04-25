import React, {useEffect, useState} from 'react'

function createHoc(){
    const renderQueue = [] /* 待渲染队列 */
    let isFirstRender = true      /* 是否是队列中的第一个挂载任务 */
    return function Hoc(Component){

        function RenderController(props){  /* RenderController 用于真正挂载原始组件  */
            const { renderNextComponent ,...otherprops  } = props
            useEffect(()=>{
                renderNextComponent() /* 通知执行下一个需要挂载的组件任务 */
            },[])
            return <Component  {...otherprops}  />
        }

        return class Wrap extends React.Component{
            constructor(props){
                super(props)
                this.state = {
                    isRender:false
                }
            }
            renderNextComponent=()=>{  /* 从更新队列中，取出下一个任务，进行挂载 */
                if(renderQueue.length > 0 ){
                    // console.log('22222 挂载下一个组件', this.props.name, [...renderQueue])
                    const nextRender = renderQueue.shift()
                    // ****** 特别注意 *********
                    // 若待渲染队列 renderQueue 被清空，则需要重置 isFirstRender，否则会导致后续显示组件 D, E 无效
                    if(!renderQueue.length) {
                        isFirstRender = true
                    }
                    nextRender.tryRender()
                }
            }
            componentDidMount(){ 
                // console.log(11111,  this.props.name)
                const tryRender = ()=>{
                    // console.log('333 tryRender', this.props.name)
                    this.setState({
                        isRender:true
                    })
                }
                tryRender.displayName = this.props.name
                renderQueue.push({
                    tryRender,
                    name: this.props.name
                })
                 /* 如果是第一个挂载任务，那么需要 */
                isFirstRender && this.renderNextComponent()
                isFirstRender = false
            }
            render(){
                const { isRender } = this.state
                return isRender ? <RenderController {...this.props} renderNextComponent={this.renderNextComponent}  /> : <div />
            }
        }
    }
}


export default createHoc;