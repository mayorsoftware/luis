import { createGlobalStyle } from "styled-components"

const normalize = `
  html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:0;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}button,[type="button"],[type="reset"],[type="submit"]{-webkit-appearance:button}button::-moz-focus-inner,[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type="button"]:-moz-focusring,[type="reset"]:-moz-focusring,[type="submit"]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type="checkbox"],[type="radio"]{box-sizing:border-box;padding:0}[type="number"]::-webkit-inner-spin-button,[type="number"]::-webkit-outer-spin-button{height:auto}[type="search"]{-webkit-appearance:textfield;outline-offset:-2px}[type="search"]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}
`

const transition = `
.fade-enter {
  opacity: 0;
  z-index: 1;
}

.fade-exit {
  opacity: 1;
  position: absolute;
  top: 0;
  width: 100%;
}

.fade-exit.fade-exit-active {
  opacity: 0;
  transition: all 125ms ease-in;
}

.fade-enter.fade-enter-active {
  opacity: 1;
  transition: all 125ms ease-in;
  transition-delay: 125ms;
}
`

const cssVariables = `
  :root {
    --fontSizeH1: 30px;
    --fontSizeH2: 27px;
    --fontSizeH3: 25px;
    --fontSizeH4: 23px;
    --fontSizeH5: 20px;
    --textSize: 16px;
    --legal: #66B5F8;
    --legal2: #71D180;
    --underage: #F6A4E2;
    --underage2: #FFB26B;
    --authorization: #66b5f8;
    --assignment: #71d180;
    --errorRed: hsla(0,100%,50%,0.8);
  }
`

const signaturePadCSS = `
.m-signature-pad {
  position: absolute;
  font-size: 10px;
  width: 700px;
  height: 320px;
  top: 50%;
  left: 50%;
  margin-left: -350px;
  margin-top: -200px;
  border: 2px solid #e8e8e8;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.08) inset;
  border-radius: 4px;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

.m-signature-pad--body {
  position: absolute;
  left: 20px;
  right: 20px;
  top: 20px;
  bottom: 60px;
  border: 1px solid #f4f4f4;
}

.m-signature-pad--body
  canvas {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.02) inset;
  }

.m-signature-pad--footer {
  position: absolute;
  left: 20px;
  right: 20px;
  bottom: 20px;
  height: 40px;
}

.m-signature-pad--footer
  .description {
    color: #C3C3C3;
    text-align: center;
    font-size: 1.2em;
    margin-top: 1.8em;
  }

.m-signature-pad--footer
  .button {
    position: absolute;
    bottom: 0;
  }

.m-signature-pad--footer
  .button.clear {
    left: 0;
  }

.m-signature-pad--footer
  .button.save {
    right: 0;
  }

@media screen and (max-width: 1024px) {
  .m-signature-pad {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: auto;
    height: auto;
    min-width: 250px;
    min-height: 140px;
    margin: 5%;
  }
  #github {
    display: none;
  }
}

@media screen and (min-device-width: 768px) and (max-device-width: 1024px) {
  .m-signature-pad {
    margin: 10%;
  }
}

@media screen and (max-height: 320px) {
  .m-signature-pad--body {
    left: 0;
    right: 0;
    top: 0;
    bottom: 32px;
  }
  .m-signature-pad--footer {
    left: 20px;
    right: 20px;
    bottom: 4px;
    height: 28px;
  }
  .m-signature-pad--footer
    .description {
      font-size: 1em;
      margin-top: 1em;
    }
}
`

const cameraCss = `#container-circles{position:absolute;left:50%;bottom:90px}#outer-circle{left:-37px;height:75px;width:75px;background-color:hsla(0,0%,100%,.4);z-index:1}#inner-circle,#outer-circle{position:absolute;border-radius:50%}#inner-circle{left:50%;top:38px;height:44px;width:44px;background:#fff;margin:-22px 0 0 -22px;z-index:2}#inner-circle.is-clicked{height:38px;width:38px;margin:-19px 0 0 -19px}#white-flash.normal{position:absolute;height:100%;width:100%;opacity:1;-webkit-transition:opacity .9s ease-out;-o-transition:opacity .9s ease-out;transition:opacity .9s ease-out}#white-flash.do-transition{opacity:0;background:#fff}#display-error{color:#000;background-color:#fff}.react-html5-camera-photo{position:relative;text-align:center}.react-html5-camera-photo>img,.react-html5-camera-photo>video{width:500px}.react-html5-camera-photo>.display-error{width:768px;margin:0 auto}@media(max-width:768px){.react-html5-camera-photo>.display-error,.react-html5-camera-photo>img,.react-html5-camera-photo>video{width:100%}}.react-html5-camera-photo-fullscreen>img,.react-html5-camera-photo-fullscreen>video{width:100vw;height:100vh}.react-html5-camera-photo-fullscreen>video{-o-object-fit:fill;object-fit:fill}.react-html5-camera-photo-fullscreen>.display-error{width:100vw;height:100vh}`

export default createGlobalStyle`
  ${normalize}
  ${transition}
  ${cssVariables}
  ${signaturePadCSS}
  ${cameraCss}
  @import url('https://rsms.me/inter/inter.css');
    html,
    body,
    h1,
    h2,
    h3,
    h4.ant-typography ,
    h5,
    h6,
    p,
    span, 
    div
    ,.ant-typography {
      font-family: 'Inter', sans-serif;
    }
  @supports (font-variation-settings: normal) {
    html { font-family: 'Inter var', sans-serif; }
  };
  table {
    font-size: 14px !important; 
  }
 body {
    color: black !important; 
  }
  .ant-checkbox-wrapper {
    color: black !important;
  }

  .ant-typography {
    color: black !important;
    font-size: 16px !important; 
  }
    .ant-btn {
    color: black !important;
  }/* @import url('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/fonts/slick.ttf'); */
  .sigCanvas {
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.10);
    border-radius: 5px;
    height: 240px;
    width: 500px;
    border: 2px dashed rgba(0, 0,0, 0.3);
  }
  @media only screen and (max-width: 600px) {
    .sigCanvas {
      height: 250px;
      width: 100%;
    }
  }
`
