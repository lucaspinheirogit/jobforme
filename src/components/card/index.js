import React from 'react'

import linkIcon from '../../assets/link.svg'
import linkedinIcon from '../../assets/linkedin.svg'
import houseIcon from '../../assets/house.svg'
import emailIcon from '../../assets/email.svg'

import './style.css'

function Card(props) {

    const { name, cargo, linkedin, email, cidade } = props

    return (
        <div className="card">
            <div className="card-header">
                <h3 className="card-name">
                    {name}
                </h3>
                <p className="card-position">
                    {cargo}
                </p>
            </div>
            <div className="card-body">
                <p className="contact-info lowercase">
                    <a href={linkedin} target='_blank' rel="noopener noreferrer" >
                        <img className="link icon" src={linkedin?.includes("linkedin") ? linkedinIcon : linkIcon} alt="Linkedin Icon" />
                    </a>
                </p>
                <p className="contact-info lowercase">
                    <img className="icon" src={emailIcon} alt="email Icon" /><a href={`mailto:${email}`} >{email}</a>
                </p>
                <p className="contact-info">
                    <img className="icon" src={houseIcon} alt="house Icon" />{cidade}
                </p>
            </div>
        </div>
    )
}

export default Card
