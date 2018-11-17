import React, { Component } from 'react';
import axios from 'axios';
import '../App.css'
class User extends Component {
  constructor(props){
    super();
    this.state={
      data:[],
      f:0,
      q:1
    }
    this.handleChange=this.handleChange.bind(this);
  }
  handleChange(e){
    this.setState({f:1})
    let username=e.target.value;
    this.setState({userName:username})
    console.log(username);
    console.log(this.state.userName);
    axios.get("https://api.github.com/users/"+username).then(res=>{
          console.log(res.data);
          this.setState({data:res.data,
          f:0
        })
        console.log(res.status);
     })
    .catch(err=>{
      console.log(err);
      this.setState({
        data:[],
        q:0,
        f:0
      })
    });
  }

  render() {
    console.log(this.state.q);
    let data=this.state.data;
    return (

    <div>
        <div className="row center">  <lable>Search username:<input type="text" name="user" onChange={this.handleChange} /></lable></div>
        {this.state.f==1?
        <div className="row center loader"></div>
        :data.login?
         <div className="center card">
         <div className="card-body">
         <h4 className="card-title">{data.name}</h4>
        <img src={data.avatar_url} className="img-width" />
        <div className="row"><button className="btn"><a href={data.html_url}>Github profile</a></button></div>
       </div>
       </div>:this.state.q==0?<div className="row center"><h1>User does not exist</h1></div>:null}
      </div>
    );
  }
}

export default User;
