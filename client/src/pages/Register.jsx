import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    return (
        <div align="center">
            <h2>Register User</h2>

            <div className="container mt-3">
                <table border="1">
                    <tr>
                        <td>Email :- </td>
                        <td><input type="text" /></td>
                    </tr>
                    <tr>
                        <td>Email :- </td>
                        <td><input type="text" /></td>
                    </tr>
                    <tr>
                        <td>Password :- </td>
                        <td><input type="text" /></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><input type="button" value="Login" /></td>
                    </tr>
                </table>
                <Link to={`/`}>Sign In</Link>
            </div>
        </div>
    )
}

export default Register
