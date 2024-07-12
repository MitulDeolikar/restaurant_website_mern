import React from 'react'

const Footer = () => {
  return (
    <>
    <hr />
    <footer >
        <div className="container">
            <div className="banner">
                <div className="left"><img  className='aroma' src="../../aroma.png" alt="Logo" /></div>
                <div className="right">
                    <p>Juhu , Mumbai - 400049</p>
                    <p><span style={{color:"black"}}>Morning</span> : 12 noon - 3:00pm</p>
                    <p><span style={{color:"black"}}>Evening</span> : 7:00pm - 11:00pm</p>
                </div>
            </div>
            <div className="banner">
                <div className="left">&copy; Developed by Mitul Deolikar - 2024</div>
                <div className="right">All Rights Reserved</div>
            </div>
        </div>
    </footer>
    </>
    
  )
}

export default Footer