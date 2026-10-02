import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import confetti from "canvas-confetti";
import '../assets/Style/style.css';
import van from '../assets/Image/delvan.png';

function Proj() {
  const [status, setStatus] = useState("idle"); // idle | moving | done
  const trackRef = useRef(null);
  const vanRef = useRef(null);
  const btnRef = useRef(null);

  const handleClick = () => {
    if (status !== "idle") return;
    setStatus("moving");

    const trackWidth = trackRef.current.offsetWidth;
    const vanWidth = vanRef.current.offsetWidth;

    gsap.set(vanRef.current, { x: 0, opacity: 1 });

    gsap.to(vanRef.current, {
      x: trackWidth - vanWidth - 14,
      duration: 1.6,
      ease: "power2.inOut",
      onComplete: () => {
        setStatus("done");
        fireConfetti();
      }
    });
  };

  const fireConfetti = () => {
    const rect = btnRef.current.getBoundingClientRect();
    confetti({
      particleCount: 90,
      spread: 70,
      startVelocity: 35,
      gravity: 1.1,
      colors: ["#ffffff", "#4ba36d", "#de0d0d", "#ebe70b", "#22adc5"],
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: rect.top / window.innerHeight
      }
    });
  };

  return (
    <>
      <div className="btn-container">
        <div className="button">
          <div className="order-track" ref={trackRef}>

            {/* label / status text */}
            <button
              type="button"
              ref={btnRef}
              className={`btn-primary ${status !== "idle" ? "btn-hidden" : ""}`}
              onClick={handleClick}
            >
              Order Now
            </button>

            {status === "done" && (
              <div className="order-done">
                <span className="check-dot">✓</span> Order Placed
              </div>
            )}

            {/* van: visible only while driving, fades out once order is placed */}
            <div
              className={`van ${status === "done" ? "van-fade" : ""}`}
              ref={vanRef}
              style={{ opacity: status === "idle" ? 0 : status === "done" ? 0 : 1 }}
            >
              <img src={van} alt="delivery van" className="van-img" draggable="false" />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Proj;