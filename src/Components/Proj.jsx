import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import confetti from "canvas-confetti";
import '../assets/Style/style.css';

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

    // van starts hidden at the left, becomes visible, then drives across
    gsap.set(vanRef.current, { x: 0, opacity: 1 });

    gsap.to(vanRef.current, {
      x: trackWidth - vanWidth - 10,
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
              style={{ opacity: status === "idle" ? 0 : status === "done" ? 0 : 1, width: 60, height: 36 }}
            >
              <svg viewBox="0 0 46 28" width="60" height="36">
                <ellipse cx="23" cy="25" rx="19" ry="1.6" fill="rgba(0,0,0,.25)" />
                <rect x="2" y="6" width="26" height="14" rx="2" fill="#F4F0E6" />
                <path d="M28 10 h9 l5 6 v4 h-14 z" fill="#F4F0E6" />
                <path d="M29.5 11.5 h6.5 l3.3 4.2 h-9.8 z" fill="#3FDDE0" />
                <rect x="2" y="15" width="26" height="2" fill="#3FDDE0" />
                <text x="15" y="12.5" fontSize="3.4" fontWeight="700" fill="#0B0B0C" textAnchor="middle" fontFamily="Arial, sans-serif">EXPRESS</text>
                <g className="wheel-spin">
                  <circle cx="10" cy="21" r="3.3" fill="#0B0B0C" />
                  <circle cx="10" cy="21" r="1.3" fill="#F4F0E6" />
                </g>
                <g className="wheel-spin">
                  <circle cx="33" cy="21" r="3.3" fill="#0B0B0C" />
                  <circle cx="33" cy="21" r="1.3" fill="#F4F0E6" />
                </g>
              </svg>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Proj;