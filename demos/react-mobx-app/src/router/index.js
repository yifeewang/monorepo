import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useNavigate, useParams } from "react-router-dom";
import App from '../pages/App/App'
import Rule from '../pages/Rule'

// 由于useNavigate 等hooks不能再class组件中引入，所以只能通过props穿进去
const WrapComps = (props)=> {
  let navigate = useNavigate();
  let params = useParams();
  let Element = props.el
  return <Element params={params} navigate={navigate} {...props} />
}

class ReactMap extends React.Component {

  render() {
      console.log('reactmap', this.props)
    return (
      <Router history={this.props.history}>
        <Routes>
            <Route exact path="/" element={<WrapComps el={App}/>} />
            <Route exact path="/rules" element={<WrapComps el={Rule}/>} />
        </Routes>
      </Router>
    )
  }
}

export default ReactMap;