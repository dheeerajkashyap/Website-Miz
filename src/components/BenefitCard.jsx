
import React from 'react';
import { motion } from 'framer-motion';

function BenefitCard({ icon: Icon, title, description, metric, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon className="w-7 h-7 text-primary" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2 text-card-foreground">{title}</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">{description}</p>
          {metric && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="metric-display text-primary">{metric}</div>
              <div className="text-sm text-muted-foreground mt-1">improvement rate</div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default BenefitCard;
