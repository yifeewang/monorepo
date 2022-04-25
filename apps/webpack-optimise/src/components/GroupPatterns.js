import React, {isValidElement} from 'react'
//首先如果如上组合模式的写法，会被 jsx 编译成 React element 形态，Item 可以通过 Groups 的 props.children 访问到。
//但是这是针对单一节点的情况，事实情况下，外层容器可能有多个子组件的情况
const GroupPatterns = (props) => {
    console.log('GroupPatterns', props.children  ) // Groups element
    console.log( props.children.props ) // { name : 'React进阶实践指南》' }
    return  props.children
}
//这种情况下，props.children 就是一个数组结构，如果想要访问每一个的 props ，那么需要通过 React.Children.forEach 遍历 props.children。
const GroupPatterns2 = (props) => {
    // console.log( 1111, props.children  ) // Groups element
    React.Children.forEach(props.children,item=>{
        console.log('React.Children', item )  //依次打印 props
    })
    return  props.children
}
//1.隐式混入 props
//这个是组合模式的精髓所在，就是可以通过 React.cloneElement 向 children 中混入其他的 props，那么子组件就可以使用容器父组件提供的特有的 props 。我们来看一下具体实现：
//用 React.cloneElement 创建一个新的 element，然后混入其他的 props -> author 属性，React.cloneElement 的第二个参数，会和之前的 props 进行合并 （ merge ）。
const GroupPatterns3 = (props) => {
    console.log('GroupPatterns', props.children  ) // Groups element
    const newChilren = React.cloneElement(props.children,{ author:'alien' })
    console.log('newChilren', newChilren  ) // Groups element
    return  props.children
}

//这里还是 Groups 只有单一节点的情况，那么直接在原来的 children 基础上加入新属性不就可以了吗？ 像如下这样：
//props.children.props.author = 'alien'
//这样会报错，对于 props ，React 会进行保护，我们无法对 props 进行拓展。所以要想隐式混入 props ，只能通过 cloneElement 来实现。

//2.控制渲染
//组合模式可以通过 children 方式获取内层组件，也可以根据内层组件的状态来控制其渲染。比如如下的情况：
//实际处理这个很简单，也是通过遍历 children ，然后通过对比 props ，选择需要渲染的 children 。 接下来一起看一下如何控制：
const GroupPatterns4 = (props) => {
    const newChildren = []
    React.Children.forEach(props.children,(item)=>{
        console.log(' React.Children', item)
        const { type ,props } = item || {}
        const {isShow = true} = props || {}
        console.log('isValidElement', isValidElement(item) , type.name === 'GroupPatternsItem' , isShow )
        if(isValidElement(item) && type.name === 'GroupPatternsItem' && isShow  ){
            newChildren.push(item)
        }
    })
    console.log(' React.newChildren', newChildren)
    return  newChildren
}
//通过 newChildren 存放满足要求的 React Element ，通过 Children.forEach 遍历 children 。
//通过 isValidElement 排除非 element 节点；type指向 Item函数内存，排除非 Item 元素；获取 isShow 属性，只展示 isShow = true 的 Item，最终效果满足要求。

//3.内外层通信
//组合模式可以轻松的实现内外层通信的场景，原理就是通过外层组件，向内层组件传递回调函数 callback ，内层通过调用 callback 来实现两层组合模式的通信关系。
const GroupPatterns5 = (props) => {
    const handleCallback = (val) =>  {
        console.log(' children 内容：',val )
    };
    let newChilren = [];
    React.Children.forEach(props.children,(item)=>{
        console.log(' React.Children', item)
        newChilren.push(React.cloneElement( item , { callback:handleCallback } ))
    })
    console.log(' React.newChildren5', newChilren, props.children)
    return <div>{newChilren}</div>
}
//Groups 向 Item 组件中隐式传入回调函数 callback，将作为新的 props 传递。
//Item 可以通过调用 callback 向 Groups传递信息。实现了内外层的通信。

//4.复杂的组合场景
//组合模式还有一种场景，在外层容器中，进行再次组合，这样组件就会一层一层的包裹，一次又一次的强化。这里举一个例子：

const GroupPatterns6 = (props) => {
    let newChilren = [];
    React.Children.forEach(props.children,(item)=>{
        console.log(' React.Children', item)
        newChilren.push(React.cloneElement( item , { author:'wyf' } ))
    })
    return (
        <Wrap>
            {newChilren}
        </Wrap>
    )
}

function Wrap(props) {
    const handleCallback = (val) =>  {
        console.log(' children 内容：',val )
    };
    let newChilren = [];
    React.Children.forEach(props.children,(item)=>{
        console.log(' React.Children', item)
        newChilren.push(React.cloneElement( item , { callback:handleCallback, desc: `let us learn ${item.props.name}!`} ))
    })
    console.log(' React.GroupPatterns6', newChilren, props.children)
    return newChilren
}

const GroupPatternsItem = (props) => {
    console.log('GroupPatternsItem', props) // {name: "《React进阶实践指南》", author: "alien"}
    return <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign:'left', width: '100%', marginBottom: '20px'}}> 
                <div>
                    名称: {props.name}
                    <button onClick={()=> props.callback(`let us learn ${props.name}!`)} >点击</button>
                </div> 
                <div>作者: {props.author}</div> 
                <div>对大家说: {props.desc}</div> 
           </div>
}
GroupPatternsItem.displayName = 'item'
//在 Groups 组件里通过 Wrap 再进行组合。经过两次组合，把 author 和 mes 混入到 props 中。
//这种组合模式能够一层层强化原始组件，外层组件不用过多关心内层到底做了些什么? 只需要处理 children 就可以，同样内层 children 在接受业务层的 props 外，还能使用来自外层容器组件的状态，方法等。

//5 注意细节
//组合模式也有很多细节值得注意，首先最应该想到的就是对于 children 的类型校验，
//因为组合模式，外层容器组件对 children 的属性状态是未知的。如果在不确定 children 的状态下，如果直接挂载，就会出现报错等情况。
//所以验证 children 的合法性就显得非常重要。
//比如如下，本质上形态是属于 render props 形式。

{/* <Groups>
   {()=>  <Item  isShow name="《React进阶实践指南》" />}
</<Groups> */}

// function Groups (props){
//     return props.children
// }

//这种情况，如果 Groups 直接用 children 挂载的话。会报 Functions are not valid as a React child 的错误。那么需要在 Groups 做判断，我们来一起看一下：

// function Groups (props){
//     return  React.isValidElement(props.children)
//      ? props.children
//      : typeof props.children === 'function' ?
//        props.children() : null
// }

//首先判断 children 是否是 React.element ，如果是那么直接渲染，如果不是，那么接下来判断是否是函数，如果是函数，那么直接函数，如果不是那么直接渲染 null 就可以了。


export {
    GroupPatternsItem,
    GroupPatterns,
    GroupPatterns2,
    GroupPatterns3,
    GroupPatterns4,
    GroupPatterns5,
    GroupPatterns6
}