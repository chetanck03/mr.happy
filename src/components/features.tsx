"use client";

import {
    DotLottieCommonPlayer,
    DotLottiePlayer,
} from "@dotlottie/react-player";
import ProductImage from "@/assets/product-image.png";
import {
    animate,
    motion,
    useMotionTemplate,
    useMotionValue,
    ValueAnimationTransition,
} from "framer-motion";
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";

const tabs = [
    {
        icon: "/assets/lottie/stars.lottie",
        title: "User-friendly dashboard",
        isNew: false,
        backgroundPositionX: 0,
        backgroundPositionY: 0,
        backgroundSizeX: 150,
    },
    {
        icon: "/assets/lottie/stars.lottie",
        title: "One-click optimization",
        isNew: false,
        backgroundPositionX: 98,
        backgroundPositionY: 100,
        backgroundSizeX: 135,
    },
    {
        icon: "/assets/lottie/stars.lottie",
        title: "Smart keyword generator",
        isNew: true,
        backgroundPositionX: 100,
        backgroundPositionY: 27,
        backgroundSizeX: 177,
    },
];

const FeatureTab = ({ selected, onClick, ...props }) => {
    const tabRef = useRef(null);
    const dotLottieRef = useRef(null);

    const xPercentage = useMotionValue(0);
    const yPercentage = useMotionValue(0);
    const maskImage = useMotionTemplate`radial-gradient(80px 80px at ${xPercentage}% ${yPercentage}%, black, transparent)`;

    useEffect(() => {
        if (!tabRef.current || !selected) return;

        xPercentage.set(0);
        yPercentage.set(0);
        const { height, width } = tabRef.current.getBoundingClientRect();
        const circumference = height * 2 + width * 2;
        const times = [
            0,
            width / circumference,
            (width + height) / circumference,
            (width * 2 + height) / circumference,
            1,
        ];

        const options = { times, duration: 5, repeat: Infinity, ease: "linear" };
        animate(xPercentage, [0, 100, 100, 0, 0], options);
        animate(yPercentage, [0, 0, 100, 100, 0], options);
    }, [selected]);

    const handleTabHover = () => {
        dotLottieRef.current?.seek(0);
        dotLottieRef.current?.play();
    };

    return (
        <div
            onMouseEnter={handleTabHover}
            className={`border border-muted flex items-center p-3 gap-3 rounded-xl relative cursor-pointer hover:bg-muted/30 transition-all duration-300 ${selected ? "border-[#A369FF]" : ""}`}
            ref={tabRef}
            onClick={onClick}
        >
            {selected && (
                <motion.div style={{ maskImage }} className="absolute inset-0 border border-[#A369FF] rounded-xl" />
            )}

            <div className="size-12 border border-muted rounded-lg flex items-center justify-center">
                <DotLottiePlayer src={props.icon} className="size-5" autoplay ref={dotLottieRef} />
            </div>
            <div className="font-medium">{props.title}</div>
            {props.isNew && <div className="text-xs rounded-full text-white px-2 py-0.5 bg-[#8c44ff] font-semibold">New</div>}
        </div>
    );
};

export function Features() {
    const [selectedTab, setSelectedTab] = useState(0);
    const backgroundPositionX = useMotionValue(tabs[0].backgroundPositionX);
    const backgroundPositionY = useMotionValue(tabs[0].backgroundPositionY);
    const backgroundSizeX = useMotionValue(tabs[0].backgroundSizeX);
    
    const backgroundPosition = useMotionTemplate`${backgroundPositionX}% ${backgroundPositionY}%`;
    const backgroundSize = useMotionTemplate`${backgroundSizeX}% auto`;

    const handleSelectTab = (index) => {
        setSelectedTab(index);

        const animateOptions = { duration: 2, ease: "easeInOut" };
        animate(backgroundSizeX, [backgroundSizeX.get(), 100, tabs[index].backgroundSizeX], animateOptions);
        animate(backgroundPositionX, [backgroundPositionX.get(), tabs[index].backgroundPositionX], animateOptions);
        animate(backgroundPositionY, [backgroundPositionY.get(), tabs[index].backgroundPositionY], animateOptions);
    };

    return (
        <section id="features" className="py-20 md:py-24">
            <div className="container text-center">
                <h2 className="text-5xl md:text-6xl font-semibold tracking-tighter">Mr. Happy AI Assistant</h2>
                <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mt-5">
                    From small startups to large enterprises, our AI-driven tool has revolutionized the way businesses approach SEO.
                </p>
                <div className="mt-10 grid lg:grid-cols-3 gap-4">
                    {tabs.map((tab, index) => (
                        <FeatureTab {...tab} key={tab.title} onClick={() => handleSelectTab(index)} selected={selectedTab === index} />
                    ))}
                </div>
                <motion.div className="border border-muted rounded-xl p-3 mt-4">
                    <div className="aspect-video bg-cover border border-muted rounded-lg" style={{
                        backgroundPosition: backgroundPosition.get(),
                        backgroundSize: backgroundSize.get(),
                        backgroundImage: `url(${ProductImage.src})`,
                    }}></div>
                </motion.div>
            </div>
        </section>
    );
}
