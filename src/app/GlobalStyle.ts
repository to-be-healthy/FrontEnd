'use client';

import { createGlobalStyle } from 'styled-components';
import defaultTheme from '@/styles/theme/defaultTheme';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset}
    * {   
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        outline: none;
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        -ms-overflow-style: none; // IE and Edge
        scrollbar-width: none; // Firefox

        &::before,
        &::after {
            box-sizing: border-box;
        }
    }

    img {
        border: 0;
    }

    a {
        text-decoration: none;
    }

    select,
    input,
    textarea {
        font-size: 16px;
    }

    input,
    button {
        -webkit-appearance: none;
    }

    input::-webkit-contacts-auto-fill-button {
        position: absolute;
        right: 0;
        display: none !important;
        pointer-events: none;
        visibility: hidden;
    }

    input {
        background-color: transparent;
        background-image: none;
        border: 0;
    }

    button {
        cursor: pointer;
        user-select: none;
        background-color: transparent;
        border: 0;

        &:disabled {
            cursor: not-allowed;
        }
    }

    input:is([type='button'], [type='submit'], [type='reset']),
    input[type='file']::file-selector-button,
    button {
        color: initial;
    } // override safari default blue

    html,
    body,
    button,
    input,
    textarea {
        font-family: Poppins, Arial, PingFangSC-Regular, 'Microsoft YaHei', sans-serif;
    }

    body{
        background-color: ${defaultTheme.color.MAIN_BG};
    }

    
`;

export default GlobalStyle;
