import styled, { keyframes } from "styled-components";

interface HourglassProps {
  className?: string;
}

const Hourglass: React.FC<HourglassProps> = ({ className }) => {
  return <div className={className}>⏳</div>;
};

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Loading = styled(Hourglass)`
  display: block;
  margin: auto;
  transform-origin: center;
  animation: ${rotate} 2s linear infinite;
  font-size: 2rem;
`;

export default Loading;
