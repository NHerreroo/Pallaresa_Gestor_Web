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
            <div className="scroll-container" ref={scrollContainerRef} style={{ width: '300px', height: '400px', overflowY: 'auto', border: '2px solid #ccc', padding: '10px', backgroundColor: '#f4f4f4', borderRadius: '10px' }}>
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
                <p>Contenido de ejemplo 11</p>
                <p>Contenido de ejemplo 12</p>
                <p>Contenido de ejemplo 13</p>
                <p>Contenido de ejemplo 14</p>
                <p>Contenido de ejemplo 15</p>
                <p>Contenido de ejemplo 16</p>
                <p>Contenido de ejemplo 17</p>
                <p>Contenido de ejemplo 18</p>
                <p>Contenido de ejemplo 19</p>
                <p>Contenido de ejemplo 20</p>
            </div>
        </div>
    );
};

export default ScrollOverlay;
