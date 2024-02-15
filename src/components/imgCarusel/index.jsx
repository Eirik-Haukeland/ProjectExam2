import { useEffect, useState } from "react";
import noImage from "../../assets/No_Image_Available.jpg"
import cssImgCarusel from "./imgCarusel.module.css"

export default function ImgCarusel({images, classNames, carousel}) {

    const [imageNumber, setImageNumber] = useState(0)

    let currentImg = noImage
    let currentAlt = "no image is available for this location"

    // remove one so that it can be compared with array index
    const numberOfImages = images.length - 1

    if (Array.isArray(images) && images[0]) {
        currentImg = images[imageNumber]
        currentAlt = ''
    }

    useEffect(() => {
        currentImg = images[imageNumber]
    }, [imageNumber])

    function nextImg() {
        setImageNumber(imageNumber >= numberOfImages ? 0: imageNumber + 1)
    }

    function prevImg() {
        setImageNumber(imageNumber <= 0 ? numberOfImages : imageNumber - 1)
    }

    return (carousel === true && numberOfImages > 0) 
    ?   (<div className={`${classNames} ${cssImgCarusel.carusellConteiner}`}>
            {images.map((img, index) => (<div role="img" aria-label={`${index + 1} of ${images.length} images`} style={{backgroundImage: `url(${img})`}} hidden={index !== imageNumber} className={cssImgCarusel.carusellImg} key={`${img}--${index}`}></div>))}
            <button onClick={prevImg}>prev</button>
            <button onClick={nextImg}>next</button>
        </div>)
    :   (<>
            <img src={currentImg} alt={currentAlt} className={`${classNames} ${carousel ? cssImgCarusel.carusellImg : ''}`} />
        </>)
}