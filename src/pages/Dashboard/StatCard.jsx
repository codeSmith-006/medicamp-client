import React from 'react';
import { Activity } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        {trend && (
          <div className="flex items-center mt-2">
            <Activity className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500 text-sm font-medium">{trend}</span>
          </div>
        )}
      </div>
      <div className={`p-3 rounded-full ${color} bg-opacity-10`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
    </div>
  </div>
);

export default StatCard;