import React from 'react'
import { Card, CardContent } from './ui/card';
import { motion } from 'framer-motion'

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-full"
    >
      <Card>
        <CardContent className="flex flex-col items-center p-6">
          <Icon className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-center text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FeatureCard