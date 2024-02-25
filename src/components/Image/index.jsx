import noImage from "../../assets/No_Image_Available.jpg"
import cssImage from "./image.module.css"

export default function Image({src, alt, className}) {
    let currentImg = noImage
    let currentAlt = "no image is available for this location"

    if (src) {
        currentImg = src
        currentAlt = ''
    }
    if (alt) {
        currentAlt = alt
    }

    return (<img src={currentImg} alt={currentAlt} className={`${cssImage.img} ${className}`}/>)
}