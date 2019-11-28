import React, {Component} from 'react';

class Subscriptions extends Component {
    constructor(){
        super()

        this.state = {
            email:'',
            error:false,
            success:false
        }
    }


    clearMessages() {
        setTimeout(function(){
                this.setState({
                    error:false,
                    success:false
                })
            }.bind(this),3000)
    }
    

    saveSubscription = (email) => {
        const URL_EMAIL = 'http://localhost:3004/subcriptions'

        fetch(URL_EMAIL, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email})
        }).then(res=>res.json())
        .then(()=>{
            this.setState({
                email:'',
                success:true
            })
        });
    }


    handleSumbmit = (event) => {
        event.preventDefault();
        let email = this.state.email;
        let regex = /\S+@\S+\.\S+/;

        if(regex.test(email)){
            this.saveSubscription(email);
        }else{
            this.setState({error:true})
        }
        this.clearMessages()
    }

    onChangeInput = (event) => {
        this.setState({
            email:event.target.value
        })
    }


    render() {
        return (
            <div className="subcribe_panel">
                <h3>Subscribe to us</h3>
                <div>
                    <form onSubmit={this.handleSumbmit}>
                        <input type="text" 
                        value={this.state.email} 
                        placeholder="yourmail@gmail.com" 
                        onChange={this.onChangeInput}/>
                        <div className={this.state.error ? "error show" : "error"}>Check your mail</div>
                        <div className={this.state.success ? "success show" : "success"}>Thank you</div>
                    </form>
                </div>

                <small>
                The National Basketball Association is a men's professional basketball league in North America, composed of 30 teams.
                &#169; sanathsunkad@gmail.com 
                </small>
            </div>
        )
    }
}

export default Subscriptions;