import React from 'react'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'
import {Link} from 'react-router-dom'

const About = () => {
  return (
    <section className='about' id='about'>
        <div className="container">
            <div className="banner">
                <div className="top">
                    <h1 className="heading">
                        About Us
                    </h1>
                    <p>We are here to make your dining experience a memory</p>
                </div>
                <p className="mid">
                At AROMA, we believe that dining is not just about eating  it's about savoring moments, creating memories, and experiencing the richness of flavors from around the world. Our restaurant offers a cozy and inviting ambiance perfect for any occasion, whether it's a family gathering, a romantic dinner, or a night out with friends.
                At Aroma we take pride in our diverse and mouth-watering menu, crafted to cater to all taste buds.
                </p>
                <Link to={"/"}>
                    Explore Menu {" "}
                    <span>
                        <HiOutlineArrowNarrowRight/>
                    </span>
                </Link>
            </div>
            <div className="banner">
                <img src="/about.png" alt="about" />
            </div>
        </div>
    </section>
  )
}

export default About