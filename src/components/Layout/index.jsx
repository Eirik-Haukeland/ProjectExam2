import Header from '../Header/index.jsx'
import Footer from '../Footer/index.jsx'
import LayoutCss from './layout.module.css'

export default ({ children }) => {
    return (
        <>
            <Header />
            <main className={LayoutCss.main}>{ children }</main>
            <Footer />
        </>
    )
}