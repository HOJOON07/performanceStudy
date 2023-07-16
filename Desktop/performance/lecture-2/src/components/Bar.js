import React from "react";
import styled from "styled-components";

// BarGraph에 바 속성을 props의 width를 퍼센트가 바뀌면 값이 같이 바뀌면서 transition 속성에 의해서 애니메이션이 일어날 것인데 -> 브라우저의 원리를 알고나면 불편하다.
// 브라우저의 원리란??
// 이런 끊김 현상을 쟁크(jank)라고 함.
// 애니메이션의 원리 -> 애니메이션의 원리는 여러 장의 이미지를 빠르게 전환하여 우리 눈에 잔상을 남기고, 그로 인해 연속된 이미지가 움직이는 것처럼 느껴지게 하는 것입니다.
// - 브라우저가 정상적으로 60fps로 화면을 그리지 못했기 때문!! ex) 시피유가 다른 일을 ㅏ느라 바빠서 초당 60장의 화면을 그리지 못하고 더 적은 화면을 그려서 애니메이션이
// 끊기는 느낌이 드는것이다.

// display : none은 렌더 트리에 포함되지 않지만, opacity : 0이나 ,visibility:hidden인 요소는 렌더트리에 포함된다. -> 차이점이 무엇인지 알아보자.
// 이러한 속성은 사용자 눈에는 보이지 앟지만 요소 자체가 없어진 것은 아니기 때문입니다.

//화면이 전부 그려진후 설문 결과에서의 애니메이션 처럼 일부 요소의 스타일이 변경되면 ??
// 렌더링 경로에서 거친 과정을 다시 한 번 실행하면서 새로운 화면을 그린다. -> 리플로우 , 리페인트
// 요소의 스타일이 바뀌면 CSSON을 새로 만들고 변경된 CSSON을 이용해서 새로운 렌더 트리를 만든다.
// 요소의 가로와 세로가 변경되었으니 레이아웃 단계에서 다시 요소의 크기와 위치를 다시 주입
//그 다음에야 화면 구성에 알맞게 색을 칠하고 분할된 레이어를 하나로 합성한다.

//reflow(리플로우) : position, display, width,
//repaint(리페인트) :background, background-image, border-radius

// GPU 가속 -> CPU에서 처리해야 할 일을 GPU에 위암하여 더울 효율적으로 처리하는 방법. -> 애초에 그래픽 작업을 처리하기 위해 만들어지 것이므로 화면을 그릴 때 활용하면
// 매우 편하다.
// 리플로우와 리페인트를 일으키는 transform 또는 opacity 속성을 이용한 애니메이션 성능이 더 좋을 수밖에 없습니다.

// transform:scale() - X 또는 Y축으로 확대/ 축소
// scale은 해당 요소를 지정한 크기만큼 확대 또는 축소 시킬 수 있습니다.

const Bar = (props) => {
  return (
    <BarWrapper onClick={props.handleClickBar} isSelected={props.isSelected}>
      <BarInfo>
        <Percent>{props.percent}%</Percent>
        <ItemVaue>{props.itemValue}</ItemVaue>
        <Count>{props.count}</Count>
      </BarInfo>
      <BarGraph width={props.percent} isSelected={props.isSelected}></BarGraph>
    </BarWrapper>
  );
};

const BarWrapper = styled.div`
  position: relative;
  margin-bottom: 3px;
  padding: 8px 0;
  background: ${({ isSelected }) => (isSelected ? "#dddddd" : "#f3f3f3")};
`;
const BarInfo = styled.div`
  width: 100%;
  display: flex;
  z-index: 2;
  position: relative;
`;
const Percent = styled.span`
  text-align: right;
  min-width: 70px;
  flex: 0 0 auto;
`;
const ItemVaue = styled.span`
  padding-left: 60px;
  flex: 1 1 0%;
`;
const Count = styled.span`
  padding-right: 20px;
  flex: 0 0 auto;
`;
const BarGraph = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  /* width: ${({ width }) => width}%; */
  width: 100%;
  transform: scaleX(${({ width }) => width / 100});
  transform-origin: center left; // 기본적인 scale의 기준점이 중앙에 있기 때문에 중앙을 중심으로 정렬된다. 그래서 center left로 변경해줘야 함.
  transition: width 1.5s ease;
  height: 100%;
  background: ${({ isSelected }) =>
    isSelected ? "rgba(126, 198, 81, 0.7)" : "rgb(198, 198, 198)"};
  z-index: 1;
`;

export default Bar;
