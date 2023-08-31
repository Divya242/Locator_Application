const EntityList = ({entitiesData }) => {

    const entityListElement = document.getElementById('entity-list');
    if (entityListElement) {
      entityListElement.scrollIntoView({ behavior: 'smooth' });
    }
    return (
      <>
          <div className="entity-list" id="entity-list">
            <h2 className="heading-entity">User Information</h2>      
              {entitiesData.length > 0 ? (
                entitiesData
                  .sort((a, b) => a.distance - b.distance)
                  .map((entity) => (
                    <div  key={entity.id}className="dashboard-item">
                    <div className="avatar">
                      <img src={entity.image} alt="Avatar" />
                    </div>
                    <div className="content">
                      <h3>Name: {entity.name}</h3>
                      <p>Gender: {entity.gender}</p>
                      <p>Distance: {entity.distance.toFixed(2)} meters</p>
                    </div>
                  </div>
                  ))
              ) : (
                <p>No entities data available.</p>
              )}
            
          </div>
          </>
        )
    }

    export default EntityList;