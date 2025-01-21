import React, { useRef, useEffect, useState } from "react";
import '../Css/Scroll.css';

const ScrollOverlay = () => {
    const scrollContainerRef = useRef(null);
    const [scrollTop, setScrollTop] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollTop(scrollContainerRef.current.scrollTop);
        };

        const container = scrollContainerRef.current;
        container.addEventListener("scroll", handleScroll);

        return () => {
            container.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        scrollContainerRef.current.scrollTop = 0;
    };

    const scrollToBottom = () => {
        scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    };

    return (
        <div className="scroll-overlay">
            <div className="scroll-container" ref={scrollContainerRef}>
                <p>Contenido de ejemplo 1</p>
                <p>Contenido de ejemplo 2</p>
                <p>Contenido de ejemplo 3</p>
                <p>Contenido de ejemplo 4</p>
                <p>Contenido de ejemplo 5</p>
                <p>Contenido de ejemplo 6</p>
                <p>Contenido de ejemplo 7</p>
                <p>Contenido de ejemplo 8</p>
                <p>Contenido de ejemplo 9</p>
                <p>Contenido de ejemplo 10</p>
            </div>
           
        </div>
    );
};

export default ScrollOverlay;
