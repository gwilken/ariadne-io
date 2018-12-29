import React from 'react'
import { render } from 'react-dom'
import Main from './components/Main.js'

require('../public/sass/main.scss')

render (
    <Main />, document.getElementById('app')
)
