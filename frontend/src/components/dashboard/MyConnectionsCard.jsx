const MyConnectionsCard = ({ title, people }) => {

  return (
  <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">

   
    <h2 className="heading text-2xl text-blue-900 mb-4">
      {title}
    </h2>

  
    <div className="space-y-4">
      {people.map((person) => (
        <div
          key={person._id}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition"
        >

          <img
            src={ person.photo }
            alt={`${ person.firstName } ${ person.lastName }`}
            className="w-12 h-12 rounded-lg object-cover"
          />

          <p className="text-gray-700 font-medium">
            { person.firstName } { person.lastName }
          </p>

        </div>
      ))}
    </div>

  </div>
);
}

export default MyConnectionsCard;