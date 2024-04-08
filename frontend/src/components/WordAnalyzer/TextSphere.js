import React, { useEffect } from "react";
// Importing TagCloud package
import TagCloud from "TagCloud";
import  "./TextSphere.css"

const TextShpere = ({data}) => {

  if (!data || typeof data !== "object") {
    return <div>Loading...</div>;
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


  useEffect(() => {
    return () => {
      const container = ".tagcloud";

      // const texts = data ? Object.keys(data) : [];
      
    const entries = Object.entries(data);

    const top50Words = entries
      .sort((a, b) => b[1] - a[1])
      .slice(0, 50)
      .map(([word]) => word);

      const texts = top50Words

      const options = {
        radius: 450,
        maxSpeed: "normal",
        initSpeed: "normal",
        keep: true,
      };

      const tagCloud = TagCloud(container, texts, options);
      const tags = document.querySelectorAll('.tagcloud span');
      tags.forEach(tag => {
        tag.style.color = getRandomColor();
      });

    };
  }, []);

  return (
    <>
      <div className="text-shpere" >
        {/* span tag className must be "tagcloud"  */}
        <span className="tagcloud"></span>
      </div>
    </>
  );
};

export default TextShpere;