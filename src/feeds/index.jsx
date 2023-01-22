import React from "react";
import { useBearStore } from "../hooks/window-scroll";
import Advert from "../advert-card";
import { useDebouncedEffect } from "../hooks/useDebouncedEffect";
import {
  heart,
  chat,
  heartSelected,
  logout,
  moreCircle,
  volumeDown,
} from "../assets/icons";
import "./style.scss";

const Feeds = (props) => {
  const [done, setDone] = React.useState(0);
  const [time, setTime] = React.useState(0);
  const ref = React.useRef();
  const videoRef = React.useRef();
  const data = useBearStore((state) => state.data);
  const [likeCount, setLikeCount] = React.useState(200);
  const [isLiked, setIsLiked] = React.useState(false);

  React.useEffect(() => {
    if (videoRef) {
      videoRef.current.addEventListener("timeupdate", () => {
        showCurrentTime(videoRef);
      });
    }
  }, [videoRef]);

  useDebouncedEffect(
    () => {
      getOffSetTop();
    },
    100,
    [data]
  );

  const getOffSetTop = () => {
    var rect = ref.current.getBoundingClientRect();
    if (isElementInViewport(rect)) {
      videoRef.current.play();
      alignScreenInCenter(rect.height);
    } else {
      videoRef.current.pause();
    }
  };

  function isElementInViewport(el) {
    return (
      el.top >= -el.height / 2 &&
      el.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) +
          el.height / 2
    );
  }

  const alignScreenInCenter = (distance) => {
    props.onScrollTo(distance);
  };

  const showCurrentTime = ({ current: videoDom }) => {
    const value = (videoDom.currentTime / videoDom.duration) * 100;
    const time = (videoDom.currentTime / 60).toFixed(2);
    setTime(time);
    setDone(value);
  };

  const onLike = () => {
    setIsLiked((value) => {
      console.log(value);
      if (!value) {
        setLikeCount(likeCount + 1);
      } else {
        setLikeCount(likeCount - 1);
      }
      return !value;
    });
  };

  return (
    <div ref={ref} className="feed-container">
      <video ref={videoRef} width="100%" height="100%" muted loop>
        <source src={props?.videoUrl} type="video/mp4" />
      </video>
      <div className="progress-bar-container">
        <div class="progress">
          <div
            class="progress-bar"
            role="progressbar"
            style={{ width: `${done}%` }}
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <span className="remaining-time">{time} min</span>
      </div>

      <div className="row feed-header">
        <div className="col-9">
          <div className="name-follow-container">
            <div>
              <img src={props.thumbnailUrl} className="image" />
              <span className="name">{props.title}</span>
            </div>
            <div>
              <button type="button" className="col btn-primary btn btn-follow">
                Follow
              </button>
            </div>
          </div>
          <p className="description">{props.description}</p>
        </div>
        <div className="col-3 justify-content-end d-flex">
          <span className="more-icon">
            <img src={moreCircle} />
          </span>
          <span>
            <img src={volumeDown} />
          </span>
        </div>
      </div>

      <div className="reel-action-container">
        <div className="icon-wrapper">
          <span className="icon" onClick={() => onLike()}>
            <img src={isLiked ? heartSelected : heart} />
          </span>
          <span>{likeCount}</span>
        </div>

        <div className="icon-wrapper">
          <span className="icon">
            <img src={chat} />
          </span>
          <span>200</span>
        </div>

        <div className="icon-wrapper">
          <span className="icon">
            <img src={logout} />
          </span>
        </div>
      </div>
      <div className="advertisement-list-container">
        <Advert />
        <Advert />
        <Advert />
      </div>
    </div>
  );
};

export default Feeds;
