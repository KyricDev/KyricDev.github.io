import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';

function NavBar (props){
    useEffect(() => {
        let selectors = document.querySelectorAll("[id^='"+props.section+"-selector-']");
        let lines = document.querySelectorAll("[id^='"+props.section+"-line-']");
        let currentSelector = 1;

        selectors.forEach( selector => {
            selector.addEventListener("click", () => {
                selector.classList.add('bg-white', 'click-diamond');

                let id = selector.id;
                selectors.forEach( otherSelector => {
                    if ( id == otherSelector.id ) return;
                    otherSelector.classList.remove('bg-white', 'click-diamond');
                })

                let length = selector.id.length;
                let newSelector = parseInt(id[length - 1]);
                let steps = newSelector - currentSelector;
                
                if (steps >= 0){
                    for (let i = currentSelector - 1; i < newSelector - 1; i++){
                        lines[i].classList.add('line-bg-position');
                    }
                }
                else {
                    for (let i = currentSelector - 2; i > newSelector - 2; i--){
                        lines[i].classList.remove('line-bg-position');
                    }
                }

                currentSelector = newSelector;
            })
        })

    }, []);
    /*
    function click(e){
        console.log(e.target.parentElement.id);
        e.target.classList.add('bg-white', 'click-diamond');

        let selectors = document.querySelectorAll("[id^='project-selector-']");
        console.log(selectors);

        selectors.forEach(selector => {
            if (e.target.parentElement.id != selector.id) {
                console.log(selector.childNodes[0].classList.remove('bg-white', 'click-diamond'));
            }
        });
    }
    */

    function scroll(e) {
        e.preventDefault();
        let target = document.getElementById(e.target.hash.slice(1, ));
        let section = parseInt( e.target.hash[ e.target.hash.length - 1 ] );
        let scrollTarget = e.target.parentElement.parentElement.childNodes[1];
        let style = getComputedStyle(target);
        scrollTarget.scrollLeft = (target.clientWidth + parseInt(style.marginRight)) * (section - 1);
    }
    let navbar = [];
    navbar.push( <a href={"#" + props.section + "1"} id={props.section + "-selector-1"} className="diamond bg-green bg-white click-diamond" title={props.section + " 1"} onClick={scroll} /> );
    //navbar.push( <a href={"#" + props.section + "1"} id={props.section + "-selector-1"} className="font-white" title={props.section + " 1"}>1</a> );

    for (let i = 1; i < parseInt(props.divisions); i++){
        navbar.push( <div className="line" id={props.section + "-line-" + i}></div> );
        navbar.push( <a href={"#" + props.section + (i + 1)} id={props.section + "-selector-" + (i + 1)} className="diamond bg-green" title={props.section + " " + (i + 1)} onClick={scroll} /> );
        //navbar.push( <a href={"#" + props.section + (i + 1)} id={props.section + "-selector-" + (i + 1)} className="font-white" title={props.section + " " + (i + 1)}>{i + 1}</a> );
    }

    return(
        <>
            {navbar}
        </>
    )
    /*
    return(
        <div className="flex font-green center-row center-column">
            <a href="#project1" id="project-selector-1" className="diamond bg-green" /*onClick={click} title="Project 1"></a>
            <div className="line" id="project-line-1"></div>
            <a href="#project2" id="project-selector-2" className="diamond bg-green" /*onClick={click} title="Project 2"></a>
            <div className="line" id="project-line-2"></div>
            <a href="#project3" id="project-selector-3" className="diamond bg-green" /*onClick={click} title="Project 3"></a>
        </div>
    )
    */
}
/*
ReactDOM.createRoot(
    <NavBar />,
    document.getElementById('navbar')
)
*/
createRoot(document.getElementById('navbar-projects')).render(<NavBar section="project" divisions="3" />);

createRoot(document.getElementById('navbar-techstack')).render(<NavBar section="techstack" divisions="2" />);

function MainNavBar (){
    function click(e){
        e.target.classList.add('font-white', 'click-white');

        let navs = document.querySelectorAll('a[class^=transition-navbar]');
        
        navs.forEach( nav => {
            console.log(e.target.hash);
            console.log(nav.hash);
            if (e.target.hash == nav.hash) return;
            nav.classList.remove('font-white', 'click-white');
        })
    }
    
    return(
        <>
            <li><a className="transition-navbar" href="#projects" onClick={click} >PROJECTS</a></li>
            <li><a className="transition-navbar" href="#techstack" onClick={click} >TECH STACK</a></li>
            <li><a className="transition-navbar" href="#contact" onClick={click} >CONTACT</a></li>
        </>
    )
}

createRoot(document.getElementById('main-navbar')).render(<MainNavBar />);