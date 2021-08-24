import React, { RefObject, useEffect, useRef, useState } from 'react';
import styles from './TrackingHead.module.scss';

export interface ITrackingHeadState {
  offsetX: number;
  offsetY: number;
}

export interface ITrackingHead {
  app: RefObject<HTMLDivElement>;
}

const TrackingHead: React.FC<ITrackingHead> = ({ app }) => {
  const [trackingHeadState, setTrackingHeadState] = useState({} as ITrackingHeadState);

  // const handleMouseMove = (e: React.MouseEvent) => {
  //   setTrackingHeadState({
  //     offsetX: e.clientX,
  //     offsetY: e.clientY,
  //   });
  // };

  // app.current?.onmousemove = (e: MouseEvent) => {
  //   setTrackingHeadState({
  //     offsetX: e.clientX,
  //     offsetY: e.clientY,
  //   });
  // };
  console.log('r');

  useEffect(() => {
    console.log(app);
    app.current?.addEventListener('mousemove', (e: MouseEvent) => {
      setTrackingHeadState({
        offsetX: e.clientX,
        offsetY: e.clientY,
      });
    });
  }, []);

  const eyeballBlock = useRef<HTMLDivElement>(null);
  const eyeballBlockRight = useRef<HTMLDivElement>(null);

  const percentX = Number(trackingHeadState.offsetX / (app.current?.clientWidth || 1000));
  const percentY = Number(trackingHeadState.offsetY / (app.current?.clientHeight || 500));
  const offsetX = percentX * 20;
  const offsetY = percentY * 20;

  return (
    <div className={styles.wrapper}>
      <div className={styles.eyeBlock}>
        <div
          className={styles.eyeballBlock}
          ref={eyeballBlock}
          style={{ left: `${offsetX}px`, top: `${offsetY}px` }}
        />
      </div>
      <div className={styles.eyeBlockLeft}>
        <div
          className={styles.eyeballBlock}
          ref={eyeballBlockRight}
          style={{ left: `${offsetX}px`, top: `${offsetY}px` }}
        />
      </div>
    </div>
  );
};

export default TrackingHead;
