import React from 'react'
import {Link} from 'react-router-dom'
import Details from './details'

export default function details(props) {
const {post} = props;
  return (
    <React.Fragment>
        <Link to={/details/+post.id}>
            <h1>{post.title}</h1>
            {/* <Details product={post} /> */}
            {/* {console.log(post.id)} */}
        </Link>
    </React.Fragment>
  )
}
