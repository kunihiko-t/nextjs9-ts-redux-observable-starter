import styled from 'styled-components'

const LoginInput = styled.input`
    &&&& {
        background: none;
        display: block;
        margin: 20px auto;
        text-align: center;
        border: 2px solid #3498db;
        padding: 14px 10px;
        width: 200px;
        border-radius: 24px;
        transition: 0.25s;
        &:focus {
            width: 280px;
            border-color: #00aecc;
            border-radius: 24px;
            background: none;
        }
    }
`

export default LoginInput
