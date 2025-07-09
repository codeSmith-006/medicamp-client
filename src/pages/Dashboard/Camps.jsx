import React from 'react';
import { Clock, Users, Calendar } from 'lucide-react';

const Camps = () => {
  const camps = [
    { id: 1, name: 'Summer Adventure Camp', duration: '2 weeks', participants: 35, status: 'Active', startDate: '2024-07-15' },
    { id: 2, name: 'Sports Excellence Camp', duration: '1 week', participants: 28, status: 'Active', startDate: '2024-07-22' },
    { id: 3, name: 'Creative Arts Camp', duration: '3 weeks', participants: 22, status: 'Upcoming', startDate: '2024-08-01' },
    { id: 4, name: 'STEM Innovation Camp', duration: '2 weeks', participants: 15, status: 'Active', startDate: '2024-07-20' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">Registered Camps</h2>
        <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
          Create New Camp
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {camps.map((camp) => (
          <div key={camp.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800">{camp.name}</h3>
                <div className="mt-2 flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{camp.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{camp.participants} participants</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Starts: {camp.startDate}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  camp.status === 'Active' ? 'bg-green-100 text-green-800' : 
                  camp.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {camp.status}
                </span>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Camps;