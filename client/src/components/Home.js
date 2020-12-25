import React, { Component } from 'react'


class Home extends Component {
    render() {
        return (

            <div>


                <blockquote class="blockquote text-center">
                    <h1 class="mt-5">Membership Management App</h1>
                </blockquote>

                <hr class="mt-5" />

                <div class="alert alert-primary mt-5" role="alert">
                    <a class="navbar-brand mx-auto" href="/login">Login</a>

                    <div class="float-right"> <a class="navbar-brand mx-auto" align="right" href="/Register">Register</a> </div>

                </div>


                <hr class="mt-5" />


            </div>


        )
    }
}


export default Home;