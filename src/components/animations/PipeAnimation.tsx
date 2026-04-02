'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Pipe {
  id: number;
  x: number;
  y: number;
  rotation: number;
  length: number;
  type: 'horizontal' | 'vertical' | 'corner' | 'cross' | 't-shape';
  color: string;
  flowDirection: number;
  scale: number;
}

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

const PIPE_COLORS = [
  'from-cyan-600/40 to-blue-700/40',
  'from-blue-600/40 to-indigo-700/40',
  'from-indigo-600/40 to-purple-700/40',
  'from-slate-600/40 to-slate-700/40',
];

const GLOW_COLORS = ['#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6'];

export default function PipeAnimation() {
  const [pipes, setPipes] = useState<Pipe[]>([]);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  const generatePipes = useCallback(() => {
    const newPipes: Pipe[] = [];
    const pipeCount = 12;

    for (let i = 0; i < pipeCount; i++) {
      const types: Pipe['type'][] = ['horizontal', 'vertical', 'corner', 't-shape'];
      const type = types[Math.floor(Math.random() * types.length)];
      
      newPipes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        rotation: Math.floor(Math.random() * 4) * 90,
        length: 150 + Math.random() * 200,
        type,
        color: PIPE_COLORS[Math.floor(Math.random() * PIPE_COLORS.length)],
        flowDirection: Math.random() > 0.5 ? 1 : -1,
        scale: 0.8 + Math.random() * 0.6,
      });
    }

    setPipes(newPipes);
  }, []);

  const generateBubbles = useCallback(() => {
    const newBubbles: Bubble[] = [];
    const bubbleCount = 20;

    for (let i = 0; i < bubbleCount; i++) {
      newBubbles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100 + 100,
        size: 4 + Math.random() * 8,
        speed: 0.5 + Math.random() * 1,
        opacity: 0.2 + Math.random() * 0.4,
      });
    }

    setBubbles(newBubbles);
  }, []);

  useEffect(() => {
    generatePipes();
    generateBubbles();
  }, [generatePipes, generateBubbles]);

  return (
    <div className="fixed inset-0 overflow-hidden z-0" suppressHydrationWarning>
      {/* Градиентный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background" />

      {/* Сетка на фоне */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Основной контейнер труб */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {pipes.map((pipe) => (
          <PipeSegment key={pipe.id} pipe={pipe} />
        ))}
      </div>

      {/* Пузырьки/частицы в трубах */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bubbles.map((bubble) => (
          <BubbleParticle key={bubble.id} bubble={bubble} />
        ))}
      </div>

      {/* Дополнительные световые эффекты */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {pipes.slice(0, 6).map((pipe) => (
          <PipeGlow key={`glow-${pipe.id}`} pipe={pipe} />
        ))}
      </div>
    </div>
  );
}

function PipeSegment({ pipe }: { pipe: Pipe }) {
  const glowColor = GLOW_COLORS[pipe.id % GLOW_COLORS.length];

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${pipe.x}%`,
        top: `${pipe.y}%`,
        transform: `rotate(${pipe.rotation}deg)`,
        transformOrigin: 'center center',
      }}
      animate={{
        x: [0, Math.sin(pipe.id) * 10, 0],
        y: [0, Math.cos(pipe.id) * 10, 0],
      }}
      transition={{
        duration: 8 + pipe.id * 0.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {/* Основная труба */}
      <div
        className={`relative bg-gradient-to-r ${pipe.color} backdrop-blur-sm rounded-full`}
        style={{
          width: pipe.type === 'vertical' ? 12 : pipe.length,
          height: pipe.type === 'vertical' ? pipe.length : 12,
          boxShadow: `
            0 0 20px ${glowColor}40,
            inset 0 0 10px ${glowColor}20,
            0 0 40px ${glowColor}20
          `,
          transform: `scale(${pipe.scale})`,
        }}
      >
        {/* Внутреннее свечение потока */}
        <motion.div
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{
            background: `linear-gradient(
              ${pipe.type === 'vertical' ? 'to bottom' : 'to right'},
              transparent 0%,
              ${glowColor}30 50%,
              transparent 100%
            )`,
          }}
          animate={{
            backgroundPosition: pipe.type === 'vertical' 
              ? ['0% 0%', '0% 200%'] 
              : ['0% 0%', '200% 0%'],
          }}
          transition={{
            duration: 3 + pipe.id,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Края трубы */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: '1px solid rgba(255,255,255,0.15)',
          }}
        />
      </div>

      {/* Соединительные элементы */}
      {pipe.type === 'corner' && (
        <div
          className="absolute rounded-full bg-gradient-to-br from-cyan-600/30 to-blue-700/30 backdrop-blur-sm"
          style={{
            width: 20,
            height: 20,
            right: -10,
            bottom: -10,
            boxShadow: `0 0 15px ${glowColor}30`,
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        />
      )}

      {pipe.type === 't-shape' && (
        <div
          className="absolute rounded-full bg-gradient-to-br from-indigo-600/30 to-purple-700/30 backdrop-blur-sm"
          style={{
            width: 16,
            height: 16,
            right: -8,
            top: '50%',
            transform: 'translateY(-50%)',
            boxShadow: `0 0 15px ${glowColor}30`,
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        />
      )}
    </motion.div>
  );
}

function PipeGlow({ pipe }: { pipe: Pipe }) {
  const glowColor = GLOW_COLORS[pipe.id % GLOW_COLORS.length];

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${pipe.x}%`,
        top: `${pipe.y}%`,
        width: pipe.length * pipe.scale,
        height: pipe.length * pipe.scale * 0.3,
        transform: `rotate(${pipe.rotation}deg)`,
        background: `radial-gradient(ellipse at center, ${glowColor}15 0%, transparent 70%)`,
        filter: 'blur(20px)',
      }}
      animate={{
        opacity: [0.3, 0.6, 0.3],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 4 + pipe.id,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

function BubbleParticle({ bubble }: { bubble: Bubble }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${bubble.x}%`,
        width: bubble.size,
        height: bubble.size,
        background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(100,200,255,0.2))',
        boxShadow: '0 0 10px rgba(100,200,255,0.3)',
      }}
      initial={{ y: 100 + bubble.size }}
      animate={{
        y: -bubble.size * 2,
        x: [0, Math.sin(bubble.id) * 30, 0],
        opacity: [0, bubble.opacity, 0],
      }}
      transition={{
        duration: bubble.speed * 10,
        repeat: Infinity,
        ease: 'linear',
        delay: bubble.id * 0.5,
      }}
    />
  );
}
