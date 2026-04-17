'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AbstractAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function AbstractAvatar({ size = 'lg', className }: AbstractAvatarProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32 md:w-48 md:h-48',
    xl: 'w-48 h-48 md:w-80 md:h-80',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm',
        sizeClasses[size],
        className
      )}
    >
      {/* Animated gradient blobs */}
      <motion.div
        animate={{
          borderRadius: [
            '60% 40% 30% 70% / 60% 30% 70% 40%',
            '30% 60% 70% 40% / 50% 60% 30% 60%',
            '60% 40% 30% 70% / 60% 30% 70% 40%',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] bg-gradient-to-r from-violet-500/30 via-fuchsia-500/30 to-rose-500/30"
      />

      <motion.div
        animate={{
          borderRadius: [
            '40% 60% 70% 30% / 40% 50% 60% 50%',
            '70% 30% 50% 60% / 30% 60% 70% 40%',
            '40% 60% 70% 30% / 40% 50% 60% 50%',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-1/4 -right-1/4 w-[150%] h-[150%] bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20"
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }} />
      </div>

      {/* Rotating geometric shapes */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-1/2 h-1/2 border border-white/20 rotate-45" />
      </motion.div>

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-1/3 h-1/3 border border-white/30 rotate-12" />
      </motion.div>

      {/* Floating dots */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            x: [0, Math.sin(i * 1.2) * 20],
            y: [0, Math.cos(i * 1.2) * 20],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
          className="absolute w-2 h-2 rounded-full bg-white/50"
          style={{
            top: `${20 + (i * 15) % 70}%`,
            left: `${15 + (i * 17) % 70}%`,
          }}
        />
      ))}

      {/* Center silhouette icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-1/3 h-1/3 text-white/60"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M20 21a8 8 0 1 0-16 0" />
        </svg>
      </div>
    </div>
  );
}
