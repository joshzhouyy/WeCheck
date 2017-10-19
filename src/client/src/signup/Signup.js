import React from 'react'
import './Signup.css'

const Signup = () => (

	<div className='popup'>
		<div className='popup_inner'>
			
				<label id="emaila"><b>Email</b></label>
				 <input type="text" placeholder="Enter Email" name="email" required/>
				 <label id="name"><b>Name</b></label>
				 <input type="text" placeholder="Enter Name" name="name" required/>
				 <label><b>Password</b></label>
				 <input type="password" placeholder="Enter Password" name="psw" required/>
				 <label><b>Repeat Password</b></label>
				 <input type="password" placeholder="Repeat Password" name="psw-repeat" required/>
				 <div className="clearfix">
				 	<button type="button"  className="cancelbtn">Cancel</button>
				 	<button type="submit" className="signupbtn">Sign Up</button>
				 </div>
			
		</div>
	</div>

)

export default Signup
