import {
  HtmlHTMLAttributes,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./index.module.scss";
import React from "react";

type Props = HtmlHTMLAttributes<HTMLElement>;

const Clone = React.forwardRef(
  (props: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
    return <div ref={ref} {...props} />;
  }
);

const Draggable = ({ children, ...props }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const [dragActivated, setDragActivated] = useState(false);

  const positionDiff = useRef({
    top: 0,
    left: 0,
  });

  const [dragging, setDragging] = useState(false);

  const mouseDownHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    setDragActivated(true);
    setDragging(true);
    const { top, left } = e.currentTarget.getBoundingClientRect();

    positionDiff.current = {
      top: e.pageY - top,
      left: e.pageX - left,
    };
  };
  const mouseUpHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    setDragging(false);
  };

  useEffect(() => {
    function mouseMoveHandler(e: MouseEvent) {
      if (!ref.current || !dragging) return;
      ref.current.style.position = "fixed";
      ref.current.style.top = e.pageY - positionDiff.current.top + "px";
      ref.current.style.left = e.pageX - positionDiff.current.left + "px";
    }
    function mouseUpHandler() {
      setDragging(false);
    }
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);

    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };
  }, [dragging]);

  return (
    <>
      <div {...props}>
        {children}
        <Clone
          onMouseDown={mouseDownHandler}
          onMouseUp={mouseUpHandler}
          {...props}
          ref={ref}
          style={{
            ...props.style,
            transform: `scale(${dragging ? "1.2" : "1"})`,
            transition: "transform 0.3s",
            position: "absolute",
            opacity: 0.5,
            zIndex: 30,
            top: 0,
            left: 0,
          }}
        >
          {children}
        </Clone>
      </div>
    </>
  );
};

export default Draggable;
