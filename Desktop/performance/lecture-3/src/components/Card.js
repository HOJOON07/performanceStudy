import React, { useEffect, useRef } from "react";

function Card(props) {
  const imgRef = useRef(null);

  // useEffect(() => {
  //   const optinos = {};

  //   const callback = (entries, observer) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         console.log(entry.target.dataset.src);
  //         entry.target.src = entry.target.dataset.src;
  //         entry.target.previosSibling =
  //           entry.target.previosSibling.dataset.srcset;
  //         observer.unobserve(entry.target);
  //       }
  //     });
  //   };
  //   let observer = new IntersectionObserver(callback, optinos);

  //   observer.observe(imgRef.current);

  //   return () => observer.disconnect();
  // }, []);

  useEffect(() => {
    const optinos = {};

    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const previousSibling = target.previousSibling;

          console.log("is Intersecting", entry.target.dataset.src);
          target.src = target.dataset.src;
          previousSibling.srcset = previousSibling.dataset.srcset;
          observer.unobserve(entry.target);
        }
      });
    };
    const observer = new IntersectionObserver(callback, optinos);

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  //카드 컴포넌트가 세개이기 때문에 entries배열이 3개가 찍힐것이다 .console.log로
  //isIntersecting 해당 요소가 뷰포트 내에 들어왔는지를 나타내는 값.
  //이미지 로딩은 img태그에 src가 할당되는 순간에 일어납니다.

  return (
    <div className="Card text-center">
      <picture>
        <source
          data-srcset={props.webp}
          type="image/webp"
          ref={imgRef}
        ></source>
        <img data-src={props.image} ref={imgRef} />
      </picture>
      {/* src값이 없어서 이미지 로드가 안됨. 하지만 data-src값을target.dataset.src로 옮겨 이미지를 로드하기 위해  */}
      <div className="p-5 font-semibold text-gray-700 text-xl md:text-lg lg:text-xl keep-all">
        {props.children}
      </div>
    </div>
  );
}

export default Card;
