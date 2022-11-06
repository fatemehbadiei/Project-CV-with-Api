
import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import "./BlogInfo.css"
import {MdTitle, MdImage, MdDescription} from "react-icons/md";
import {BsFileTextFill} from "react-icons/bs";
import {TiArrowBack} from "react-icons/ti";
import {Icon} from "../ArticlesInfo/ArticlesElements";


const apiURL = "http://localhost:3000/posts";


class BlogPageInfo extends Component {

    state = {
        posts : [] ,
        response : {
            title : "",
            image : "",
            description : "",
            text : ""
        }
    }


    async componentDidMount () {
        const {data : posts} = await axios.get(apiURL);
        console.log(posts)
        this.setState({posts});
    }

    handelSubmit = (e) =>{
       e.preventDefault();
    }

    handelAdd = async () => {
        const {title , image , description, text} = this.state.response
        const obj = {title: title, image: image , description: description , text : text};
        const {data: post} = await axios.post(apiURL, obj);
        const posts = [post, ...this.state.posts];
        this.setState({posts})
    }

    updateResponse = (event) => {
        const {name , value} = event.target;
        const response = {...this.state.response};
        response[name] = value;
        this.setState({response});
    }



    render() {
        return (
            <section className="containerBlog">
                <Icon to="/"><TiArrowBack/></Icon>
                <div className="wrapperBlog">
                    <div className="allForm-side">
                        <div className="form-side">
                            <h1 className="h1-form">Fill Form</h1>
                            <form onSubmit={this.handelSubmit}>
                                <div className="divInput-form">
                                    <i className="icon-form"><MdTitle/></i>
                                    <input type="text" placeholder="Your Title" className="input-form" name="title" value={this.state.response.title} onChange={(event) => this.updateResponse(event)}/>
                                </div>
                                <div className="divInput-form">
                                    <i className="icon-form"><MdImage/></i>
                                    <input type="text" placeholder="Your Image" className="input-form" name="image" value={this.state.response.image} onChange={(event) => this.updateResponse(event)}/>
                                </div>
                                <div className="divInput-form">
                                    <i className="icon-form"><MdDescription/></i>
                                    <input type="text" placeholder="Your Description" className="input-form" name="description" value={this.state.response.description} onChange={(event) => this.updateResponse(event)}/>
                                </div>
                                <div className="divInput-form">
                                    <i className="icon-form"><BsFileTextFill/></i>
                                    <input type="text" placeholder="Your Text" className="input-form" name="text" value={this.state.response.text} onChange={(event) => this.updateResponse(event)}/>
                                </div>
                                <button type="submit" className="button-blog" onClick={this.handelAdd}>Add New</button>
                            </form>
                        </div>
                        <div className="image-side">
                            <img src={require("../../Images/undraw_blooming_re_2kc4.svg").default} alt="" className="img-blog"/>
                        </div>
                    </div>
                    {this.state.posts.map((post) =>(
                        <div className="blog-side" key={post.id}>
                            <div className="side-left">
                                <Link to={"/blog/"+ post.title.replace(/ /g, "-") + "/" +post.id}  className="header-blog">{post.title}</Link>
                                <p className="p-blog">{post.description}</p>
                            </div>
                            <div className="side-right">
                                <img src={post.image} alt="" className="image-blog"/>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        )
    }
}

export default BlogPageInfo;