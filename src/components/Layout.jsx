export default function Layout(props){

    const {children} = props

    const header = (
        <header>
            <h1 className="text">Atomic</h1>
            <p><strong>The 21 simple create habit</strong></p>
        </header>
    )

    const footer = (
        <footer>
            <p>Built by <a href="" target="_blank">MoNi</a><br />Styled with <a href="https://www.fantacss.smoljames.com" target="_blank">FantaCSS</a></p>
        </footer>
    )

    return(
        <>
            {header}
            {children}
            {footer}
        </>
    )
}