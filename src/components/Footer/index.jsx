import cssFooter from "./footer.module.css"

export default () => {
    return (
        <footer className={cssFooter.footer}>
            <p>replacement for missing images is from wikipedia. no changes have been made. <a href="https://en.m.wikipedia.org/wiki/File:No_Image_Available.jpg">here is a link to the license for "No_Image_Available.jpg"</a></p>
        </footer>
    )
}