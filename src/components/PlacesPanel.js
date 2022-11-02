export const PlacesPanel = function (props) {
    const selectedActivityIds = props.selectedActivities;
    const selectedSeasonsIds = props.selectedSeasons;
    const renderActivityIds = (selectedIds) => {
        return selectedIds.map((actId) => (<li key={actId}> {actId}</li>))
    }
    return (
        <>
        <span>Activities</span>
        <ul>
            {renderActivityIds(selectedActivityIds)}
        </ul>
        <span>Seasons</span>
        <ul>
            {renderActivityIds(selectedSeasonsIds)}
        </ul>
        </>
    );

}