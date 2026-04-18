
import React from 'react';
import { motion } from 'framer-motion';

function ServiceCard({ icon: Icon, title, description, features = [], index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card rounded-2xl p-8 border border-border card-elevated h-full flex flex-col"
    >
      <div className="mb-6">
        <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
          <Icon className="w-8 h-8 text-accent" />
        </div>
        <h3 className="text-2xl font-semibold mb-3 text-card-foreground">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
      
      {features.length > 0 && (
        <div className="mt-auto pt-6 border-t border-border">
          <ul className="space-y-2">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-accent mt-1">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}

export default ServiceCard;
