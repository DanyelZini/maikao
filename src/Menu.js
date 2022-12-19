import React from 'react'
import {Link} from 'react-router-dom'
import './Menu.css'

export default function Menu() {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/"><span>MAIKAO</span></Link></li>
                    <div className='direita'>
                    <li><Link to="/carrinho"><i className="gg-shopping-bag"></i></Link></li>
                    <li><Link to="/perfil"><i className="gg-user"></i></Link></li>
                    </div>
                </ul>
            </nav>
        </header>
    )
}
