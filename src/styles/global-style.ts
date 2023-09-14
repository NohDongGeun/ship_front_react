import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
    ${reset}
    :focus {
        outline: none;
        border: none;
    }
    ::-webkit-scrollbar {
        display: none;
    }

    * {
        box-sizing: border-box;
    }
    html{
        font-size: 11px;
        -webkit-text-size-adjust: none;
        font-family: -apple-system,BlinkMacSystemFont,helvetica,Apple SD Gothic Neo,sans-serif;       
        font-display: fallback;
        -ms-overflow-style: none;
        scrollbar-width: none;
        width: 100%;
        height: 100%;
    }
    body {
        width: 100%;
        height: 100%;

    }

    input { 
        -webkit-appearance : none;
        -moz-appearance:none;
        appearance:none;
        border: 0;
        padding: 0;
    }

    select {
        -webkit-appearance: none;
        -moz-appearance:none;
        appearance:none;
    }

    button {
        background: none;
        padding: 0;
        border: none;
        cursor: pointer;
        &:disabled {
            cursor: default;
            fill: #f2f3f4;
        }
    }

    a {
        text-decoration: none;
    }
    
    #__next {
        width: 100%;
        height: 100%;
    }

    .table-container {
        overflow: auto;
    }
`;
