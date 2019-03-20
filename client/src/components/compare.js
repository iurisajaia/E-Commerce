import React, { Component } from 'react'


export default class Compare extends Component {
    state = {
        details:[]
    }
    componentDidMount() {
        let details = [];
        if (localStorage.getItem("details")) {
            details = JSON.parse(localStorage.getItem("details"));
            this.setState({details})
        }
    }
    removeItem = (id)=> {
        const items = this.state.details.filter((el,i) => {
            return el._id !== id
        })
        localStorage.setItem('details',JSON.stringify(items))
        this.setState({details:items})
    }
  render() {
      console.log(this.state.details)
    const result = this.state.details.length ? (
        this.state.details.map((el,i) => {
            return (<div key={this.state.details[i]._id} style={{border:'1px solid red',margin:'10px',width:'300px'}}>
                <div>{this.state.details[i].title}</div>,
                <img style={{width:'200px'}} src={this.state.details[i].imageUrl} alt={this.state.details[i].title}/>
                <div>{this.state.details[i].description}</div>
                <button onClick={()=> this.removeItem(this.state.details[i]._id)}>Remove</button>
                </div>)
        })
    ):(
        <h2>Empey List</h2>
    )
    return (
      <div style={{display:'flex',justifyContent:'center',flexWrap:"wrap"}}>
       <h2 style={{width:"100%"}}>Compare Products</h2>
      {result}
      </div>
    )
  }
}
