import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

type Props = {
  initial: any;
  animate: any;
  duration?: number;
  delay?: number;
  triggerOnce?: boolean;
  children: React.ReactNode;
};

const ScrollAnimationElement = ({
  initial,
  animate,
  delay = 0,
  duration = 1,
  triggerOnce = true,
  children,
}: Props) => {
  const [inViewRef, inView] = useInView({
    triggerOnce: triggerOnce,
  });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        controls.start(animate);
      }, delay * 1000);
    }
  }, [inView, animate, controls, delay]);

  return (
    <motion.div
      initial={initial}
      animate={controls}
      transition={{ duration: duration }}
    >
      <div ref={inViewRef}>{children}</div>
    </motion.div>
  );
};

export default ScrollAnimationElement;
