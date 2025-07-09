import React from 'react';

const Participants = () => {
  const participants = [
    { id: 1, name: 'Emma Johnson', age: 12, camp: 'Summer Adventure', status: 'Active', avatar: '👧' },
    { id: 2, name: 'Liam Smith', age: 10, camp: 'Sports Camp', status: 'Active', avatar: '👦' },
    { id: 3, name: 'Olivia Davis', age: 11, camp: 'Arts & Crafts', status: 'Completed', avatar: '👧' },
    { id: 4, name: 'Noah Wilson', age: 13, camp: 'STEM Camp', status: 'Active', avatar: '👦' },
    { id: 5, name: 'Ava Brown', age: 9, camp: 'Summer Adventure', status: 'Active', avatar: '👧' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">Participant Profiles</h2>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
          Add New Participant
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {participants.map((participant) => (
          <div key={participant.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{participant.avatar}</div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800">{participant.name}</h3>
                <p className="text-gray-600">Age: {participant.age}</p>
                <p className="text-gray-600">{participant.camp}</p>
                <div className="mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    participant.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {participant.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <button className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                View Profile
              </button>
              <button className="flex-1 px-3 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Participants;