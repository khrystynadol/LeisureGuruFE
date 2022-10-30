export const Rating = function (props) {
    const setRating = props.setRating;
    return (
        <div>
        <h3>Rating</h3>
        <form>
            <ul style={{listStyle: 'none'}}>
            <li><input type="radio" name="rating" onChange={(e) => setRating(1)}></input>*</li>
            <li><input type="radio" name="rating" onChange={(e) => setRating(2)}></input>**</li>
            <li><input type="radio" name="rating" onChange={(e) => setRating(3)}></input>***</li>
            <li><input type="radio" name="rating" onChange={(e) => setRating(4)}></input>****</li>
            <li><input type="radio" name="rating" onChange={(e) => setRating(5)}></input>*****</li>
            </ul>
        </form>
    </div>
        
    );
}