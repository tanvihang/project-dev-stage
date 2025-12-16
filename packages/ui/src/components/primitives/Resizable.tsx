'use client';

import {
  ReactNode,
  useRef,
  useState,
  useCallback,
  useEffect,
  CSSProperties,
} from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface ResizableProps {
  children: ReactNode;
  direction: 'horizontal' | 'vertical';
  initialSize?: number;
  minSize?: number;
  maxSize?: number;
  onResize?: (size: number) => void;
  className?: string;
  handleClassName?: string;
}

export const Resizable = ({
  children,
  direction,
  initialSize = 300,
  minSize = 200,
  maxSize = 800,
  onResize,
  className,
  handleClassName,
}: ResizableProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();

      let newSize: number;
      if (direction === 'horizontal') {
        newSize = e.clientX - containerRect.left;
      } else {
        newSize = e.clientY - containerRect.top;
      }

      // Clamp size
      newSize = Math.max(minSize, Math.min(maxSize, newSize));

      setSize(newSize);
      onResize?.(newSize);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, direction, minSize, maxSize, onResize]);

  const style: CSSProperties = {
    [direction === 'horizontal' ? 'width' : 'height']: `${size}px`,
  };

  return (
    <div ref={containerRef} className={cn('relative', className)} style={style}>
      {children}

      <motion.div
        className={cn(
          'absolute bg-border-subtle hover:bg-accent-primary transition-colors',
          'z-10 group',
          direction === 'horizontal'
            ? 'right-0 top-0 bottom-0 w-1 cursor-col-resize'
            : 'bottom-0 left-0 right-0 h-1 cursor-row-resize',
          isDragging && 'bg-accent-primary',
          handleClassName
        )}
        onMouseDown={handleMouseDown}
        whileHover={{ scale: direction === 'horizontal' ? 1.5 : 1 }}
      >
        {/* Visual indicator */}
        <div
          className={cn(
            'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity',
            'bg-accent-primary/20'
          )}
        />
      </motion.div>
    </div>
  );
};
