import React from 'react'

const Login = () => {
    return (
        <div align="center">
            <h2>Login User</h2>

            <div className="container mt-3">
                <table border="1">
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
            </div>




        </div>
    )
}

export default Login
