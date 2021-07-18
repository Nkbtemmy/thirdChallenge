import React, { Component } from 'react'
import axios from 'axios'
import '../assets/styles/App.css'


export default class Album extends Component {
    constructor(props){
        super(props);
        this.state = {
            album_id:'',
            arr:[]
        };
    }

    getPhotos = async()=>{
        const {album_id}=this.state;
        var url = `https://challengebackends.herokuapp.com/api/v1/albums/${album_id}/photos`
        await axios.get(url)
        .then(res =>{
            const data = res.data.data;
            //console.log(data);
            this.setState({arr:data})
        })
        .catch(err => {
           console.log(err.response.data);
        })
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }
    render() {
        return (
            <div>
                <h1 className="text-center">search photos in Album</h1>
                <div className="d-flex justify-content-center pt-5">
                    <input type="number" name="album_id" placeholder="Enter album number" onChange={this.handleChange}/>
                    <button onClick={this.getPhotos} className="bg-success ">Get Album Photos By Id</button>
                </div>
               
                <h1 className="text-center">List of Photos in Album</h1>
                <div className="text-center">
                {
                 this.state.arr.map(photo => (
                        <React.Fragment key={photo.id}>
                            <div className="photo bg-primary d-inline-block mx-2 text-white text-center mb-2 ">
                                <h5>{photo.title}</h5>
                                <div className="w-100 thumbnail">
                                    <img className="w-100 " alt="thumbnail" src={photo.thumbnailUrl} />
                                </div>
                            </div>
                        </React.Fragment>
                    ))
                }   
                </div>
            </div>
        )
    }
}
