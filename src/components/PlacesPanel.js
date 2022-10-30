export const PlacesPanel = function (props) {
    const selectedActivityIds = props.selectedActivities;
    const renderActivityIds = () => {
        return selectedActivityIds.map((actId) => (<li key={actId}> {actId}</li>))
    }
    return (
        <ul>
            {renderActivityIds()}
        </ul>
    );

}