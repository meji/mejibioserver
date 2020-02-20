import React from 'react'
const Error = (error) => {
    return(
        <>
            <h1>{error.message}</h1>
            <h2>{error.status}</h2>
            <pre>{error.stack}</pre>
        </>
    )
}
export default Error