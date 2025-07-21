import React from 'react';
import { Workflow, Database, Users, LineChart, Scale, Zap } from 'lucide-react';

export const ICONS: { [key: string]: React.ReactNode } = {
  workflow: <Workflow className="w-12 h-12" />,
  data: <Database className="w-12 h-12" />,
  customer: <Users className="w-12 h-12" />,
  analytics: <LineChart className="w-12 h-12" />,
  scale: <Scale className="w-12 h-12" />,
  integration: <Zap className="w-12 h-12" />,
};