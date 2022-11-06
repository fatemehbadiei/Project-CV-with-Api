import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {
    InfoArticleContainer,
    Icon,
    InfoArticleWrapper,
    InfoDiv,
    ImgWrap,
    Img,
    InfoSection,
    ArticleHeading,
    ArticleUl,
    ArticleLi,
    ArticleSpan,
    ArticleP,
    Icon1,
    Icon2,
    Icon3,
    Icon4
} from "./ArticlesElements";
import {TiArrowBack} from "react-icons/ti";
import axios from "axios";

const apiURL = "http://localhost:3000/posts";

const ArticleInfo = () => {
    const {id} = useParams();

    const [post, setPost] = useState({})


    useEffect(() => {
        axios.get(apiURL + "?id=" + id)
            .then((response) => {
                setPost(response.data[0]);
            });
    });


    return (
        <InfoArticleContainer>
            <Icon to="/blog" style={{color : "#f7f8fa"}}><TiArrowBack/></Icon>
            <InfoArticleWrapper>
                <InfoDiv>
                    <ImgWrap>
                        <Img src={post.image} alt=""/>
                    </ImgWrap>
                    <InfoSection>
                        <ArticleHeading>{post.title}</ArticleHeading>
                        <ArticleUl>
                            <ArticleLi>
                                <Icon1/>
                                <ArticleSpan>August 19, 2022</ArticleSpan>
                            </ArticleLi>
                            <ArticleLi>
                                <Icon2/>
                                <ArticleSpan>Fatemeh Badiei</ArticleSpan>
                            </ArticleLi>
                            <ArticleLi>
                                <Icon3/>
                                <ArticleSpan>Educational</ArticleSpan>
                            </ArticleLi>
                            <ArticleLi>
                                <Icon4/>
                                <ArticleSpan>33 Comments</ArticleSpan>
                            </ArticleLi>
                        </ArticleUl>
                        <ArticleP>{post.description}{post.text}</ArticleP>
                    </InfoSection>
                </InfoDiv>
            </InfoArticleWrapper>
        </InfoArticleContainer>

    )
}

export default ArticleInfo;