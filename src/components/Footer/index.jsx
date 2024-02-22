import cssFooter from "./footer.module.css"

export default () => {
    return (
        <footer className={cssFooter.footer}>
            <p>replacement for missing images is from wikipedia. no changes have been made. <a href="https://en.m.wikipedia.org/wiki/File:No_Image_Available.jpg">here is a link to the license for "No_Image_Available.jpg"</a></p>
            <span><a href="https://www.freepik.com/free-vector/404-error-with-cute-animal-concept-illustration_7938322.htm#query=404%20error%20illustration&position=2&from_view=keyword&track=ais&uuid=c711940a-9088-489e-8a92-4aefe48a4b4c">404 Image by storyset</a> on Freepik</span>
        </footer>
    )
}