function Header(props) {
    return(
        <nav className="bg-dark navbar-dark navbar">
            <div className="row col-12 d-flex justify-content-center text-white">
                <h3>{props.word}</h3>
            </div>
        </nav>
    )
}
export default Header;