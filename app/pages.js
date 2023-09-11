import React, { useState } from "react";
import './styles.css';
import styles from './page.module.css'
import styled from "styled-components";
import Image from 'next/image'
import profilePic from './avatar.png';
// import resume from './resume.pdf';

import {AiFillGithub, AiFillLinkedin, AiFillMediumSquare, AiOutlineDownload} from 'react-icons/ai';

export const Page1 = () => {
    return (
        <div className="pageContainerHome">
            <Image className="pageContainerHomeElement" src={profilePic} alt="My Face!" width={200} height={200} />
            <h1 className="pageContainerHomeElement">Ary Indarapu</h1>
            <div className="pageContainerHomeElement description">
                <h3>University of Illinois Urbana-Champaign</h3>
            </div>
            <p className="pageContainerHomeElement">Computer Engineering</p>
            <div className={styles.grid}>
                <a
                    href="https://github.com/aryanindarapu"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <AiFillGithub className="icons" />
                </a>

                <a
                    href="https://www.linkedin.com/in/aryanindarapu/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <AiFillLinkedin className="icons" />
                </a>

                <a
                    href="https://medium.com/@aryind"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <AiFillMediumSquare className="icons" />
                </a>
            </div>
        </div>
    )
}

const StyledTab = styled.li`
  font-weight: 10000;
  flex: 1;
  height: 100%;
  border: none;
  list-style-type: none;

  button {
    cursor: pointer;
    transition: color 0.3s;
    color: ${(props) => (props.isFocused ? "#fff" : "#656565")};
    border: solid;
    border-radius: 6px;
    width: 30%;
    height: 100%;
    transition: 0.3s;

    &:hover {
        background-color: #656565;
        color: #fff;
    }

    background-color: ${(props) => (props.isFocused ? "#333333" : "rgba(0, 0, 0, 0)")};
    border-color: ${(props) => (props.isFocused ? "#333333" : "#656565")};
  }
`;

export const Page2 = () => {
    return (
        <div className="pageContainerExp">
            <div class="row">
                <h1>Work</h1>
            </div>
            <div class="row" className="descriptionExp"><p>Junior Software Runtime Engineer -- Aechelon Technology -- 5/23 to 8/23</p></div>
            <div class="row" className="descriptionExp"><p>Software Engineering Intern -- Densec Technologies -- 7/22 to 5/23</p></div>
            <div class="row" className="descriptionExp"><p>Cloud Engineering Intern -- BAM.Money Inc -- 9/21 to 1/22</p></div>
            <div class="row" className="descriptionExp"><p>Software Engineering Intern -- Nathan Research Inc. -- 6/21 to 8/21</p></div>
            <div class="row" style={{paddingTop: 20}}>
                <h1>Research</h1>
            </div>
            {/* <div class="row" className="descriptionExp"><p>Junior Software Runtime Engineer -- Aechelon Technology -- 5/23 to 8/23</p></div> */}
            <div class="row" className="descriptionExp"><p>An Empirical Study of Artifacts and Security Risks in the Pre-trained Model Supply Chain: <a href='https://doi.org/10.1145/3560835.3564547' target="_blank" rel="noopener noreferrer">https://doi.org/10.1145/3560835.3564547</a></p></div>
            <div class="row" className="descriptionExp"><p>Performance of deep learning restoration methods for the extraction of particle dynamics in noisy microscopy image sequences:  <a href='https://doi.org/10.1091/mbc.E20-11-0689' target="_blank" rel="noopener noreferrer">https://doi.org/10.1091/mbc.E20-11-0689</a></p></div>

            {/* <div class="row" style={{paddingTop: 20}}>
                <h1>Relevant Coursework</h1>
            </div>
            <div class="row" className="descriptionExp"><p>Data Structures & Algorithms</p></div>
            <div class="row" className="descriptionExp"><p>Intro to Algorithms and Models of Computation</p></div>
            <div class="row" className="descriptionExp"><p>IoT and Cognitive Computing</p></div>
            <div class="row" className="descriptionExp"><p>Analog & Digital Signal Processing</p></div> */}

            {/* <div class="row" style={{paddingTop: 20}}>
                <a
                    href="https://medium.com/@aryind"
                    // className={styles.card}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h3>Resume</h3> <AiOutlineDownload className="iconSmall" />
                </a>
            </div> */}

            <div class="row" style={{paddingTop: 20, display: "inline-block"}}>
                <StyledTab>
                    <a
                        href="/resume.pdf"
                        alt="alt text"
                        target="_blank"
                        rel="noopener noreferrer"
                    ><button className={styles.tabHeaderRes}>Resume</button></a>
                </StyledTab>
            </div>
            
        </div>
    );
}

export const Page3 = () => {
    return <div>3</div>;
}

// export const Page4 = () => {
//     return <div>3</div>;
// }