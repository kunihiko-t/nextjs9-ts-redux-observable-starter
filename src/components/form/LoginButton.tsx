import styled from 'styled-components'
import { Button } from 'semantic-ui-react'
const LoginButton = styled(Button)`
    &&&& {
        text-transform: uppercase;
        background: none;
        display: block;
        margin: 20px auto;
        text-align: center;
        border: 2px solid #2ecc71;
        padding: 14px 40px;
        width: 200px;
        outline: none;
        border-radius: 24px;
        transition: 0.25s;
        cursor: pointer;
        &:hover {
            background: #2ecc71;
            border-radius: 24px;
        }
    }
`

export default LoginButton
