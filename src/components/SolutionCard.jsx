
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

function SolutionCard({ metric, unit, title, description, outcome, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300 h-full flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="metric-display text-primary">{metric}</span>
            <span className="text-2xl font-semibold text-primary/70">{unit}</span>
          </div>
          <h4 className="text-lg font-semibold mt-2 text-foreground">{title}</h4>
        </div>
        <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
          <TrendingUp className="w-5 h-5 text-accent" />
        </div>
      </div>
      
      <p className="text-muted-foreground leading-relaxed mb-4 flex-1">{description}</p>
      
      {outcome && (
        <div className="pt-4 border-t border-primary/10">
          <p className="text-sm font-medium text-primary">{outcome}</p>
        </div>
      )}
    </motion.div>
  );
}

export default SolutionCard;
