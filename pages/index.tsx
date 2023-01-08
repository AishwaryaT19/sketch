import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { name, tag, information } from "../components/Info";
// import useCssFilter from "../components/useCssFilter.js";

export default function Home() {
  useEffect(() => {
    const elem =
      (document.querySelector(".main-banner") as HTMLElement) || null;
    var h1 = (document.querySelector(".main-banner h1") as HTMLElement) || null;
    var h2 = (document.querySelector(".main-banner h2") as HTMLElement) || null;
    var i =
      (document.querySelector(".main-banner .img-container") as HTMLElement) ||
      null;

    // const cssFilter = useCssFilter();
    elem.onmousemove = (e) => {
      var screenWidth = window.innerWidth;
      var percent = (e.x / screenWidth) * 255;

      if (h1 != null) {
        h1.style.color = `hsl(${percent},100%,50%)`;
        h1.style.textShadow = `0 0 8px hsl(${percent},100%,50%)`;
      }
      if (h2 != null) {
        h2.style.color = `hsl(${percent},100%,50%)`;
        h2.style.textShadow = `0 0 8px hsl(${percent},100%,50%)`;
      }
      if (i != null) {
        i.style.filter = `hue-rotate(${parseInt(
          String(percent)
        )}deg) grayscale(0%)`;
      }
    };
    elem.onmouseleave = (e) => {
      h1.style.color = `white`;
      h2.style.color = `white`;
      i.style.filter = `grayscale(100%)`;
      h1.style.textShadow = `0 0 0px black`;
      h2.style.textShadow = `0 0 0px black`;
    };
  }, []);
  return (
    <section id="Home">
      <Head>
        <title>Sketch | Home & About</title>
      </Head>
      <div className="main-banner">
        <h1>{name}</h1>
        <div className="img-container">
          <Image src="/assets/images/logo.png" alt="logo" fill sizes="100%" />
        </div>
        <h2>{tag}</h2>
      </div>
      <main className="introduction" id="about">
        <div className="mission">
          <h3>{information.mission.head}</h3>
          <p>{information.mission.para}</p>
        </div>
        <div className="about">
          <h3>{information.about.head}</h3>
          <p>{information.about.para}</p>
        </div>
        <div className="vision">
          <h3>{information.vision.head}</h3>
          <ul>
            {information.vision.list.map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
        </div>
        <div className="domains">
          <h3>{information.domains.head}</h3>
          <ul>
            {information.domains.list.map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
        </div>
      </main>
    </section>
  );
}
