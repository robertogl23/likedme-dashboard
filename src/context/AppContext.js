import React,{createContext,Component} from 'react'
import {getFetch} from '../api/app'
export const AppContext = createContext();
export class AppContextProvider extends Component {
    state={
        products: [],
        admin:[],
        isLoading: false,
        error:false
    }
    getProducts = () =>{
        getFetch('get/all/products').then(data => {
            this.setState({isLoading:false})
            console.log(data)
        })
    }
    render(){
        return(
            <AppContext.Provider value={{...this.state,getProducts:this.getProducts}}>
                {this.props.children}
            </AppContext.Provider>
        )
    }

}