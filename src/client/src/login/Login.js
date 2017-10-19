import React from 'react'
import './Login.css'

const Login = () => (

	<div className='popupl'>
		<div className='popup_innerl'>
	
		<label id="emaila"><b>Email</b></label>
		 <input type="password" placeholder="Enter Email" name="psw" required/>
		 <label><b> Password</b></label>
		 <input type="password" placeholder="Enter Password" name="psw-repeat" required/>
		 <div className="clearfix">
		 	<button type="button"  className="cancelbtn">Cancel</button>
		 	<button type="submit" className="signupbtn">Login In</button>
		 </div>
	
		</div>
	</div>
 



)

export default Login