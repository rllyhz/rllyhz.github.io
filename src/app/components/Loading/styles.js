import { css } from "../../core/Style";

const styles = /* css */`
.loading-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner {
  animation: rotate 2s linear infinite;
  width: 50px;
  height: 50px;    
}

.spinner .path {
  stroke: var(--accent-color);
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
`;

export default css(styles);
