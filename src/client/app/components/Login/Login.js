import { Button } from 'react-bootstrap';


class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:''
    }
  }
  render() {
    return (
      <div>
          <label><b>Username</b></label>
          <input type="text" placeholder="Enter Username" name="uname" onChange = {(event,newValue) => this.setState({username:newValue})}/>
          <label><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" onChange = {(event,newValue) => this.setState({password:newValue})}/>
      </div>  
    );  
  }
}


export default Login;