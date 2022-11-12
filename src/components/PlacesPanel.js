export const PlacesPanel = function (props) {
    const selectedActivityIds = props.selectedActivities;
    const selectedDateId = props.selectedDate;
    const renderActivityIds = (selectedIds) => {
        return selectedIds.map((actId) => (<li key={actId}> {actId}</li>))
    }
    return (
        <>
        <span>Activities</span>
        <ul>
            {renderActivityIds(selectedActivityIds)}
        </ul>
        <span>Date</span>
        <ul>
            {selectedDateId}
        </ul>
        </>
    );

}